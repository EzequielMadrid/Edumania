'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, ImageIcon } from 'lucide-react';
import { UploadSchema } from '@/lib/zod';
import createBook, {checkBookExists, saveBookSegments} from "@/lib/actions/book.actions";
import { BookUploadFormValues } from '@/types';
import FileUploader from './FileUploader';
import VoiceSelector from './VoiceSelector';
import LoadingOverlay from './LoadingOverlay';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {parsePDFFile} from "@/lib/pdf-utils";
import {
    ACCEPTED_PDF_TYPES,
    ACCEPTED_IMAGE_TYPES,
} from '@/lib/constants';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import {upload} from "@vercel/blob/client";


const UploadForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { userId } = useAuth();
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm<BookUploadFormValues>({
        resolver: zodResolver(UploadSchema),
        defaultValues: {
            title: '',
            author: '',
            persona: '',
            pdfFile: undefined,
            coverImage: undefined,
        },
    });

    const onSubmit = async (data: BookUploadFormValues) => {
        if (!userId) {
            return toast.error('Please login to upload books');
        }

        setIsSubmitting(true);

        try {
            const existsCheck = await checkBookExists(data.title);

            if (existsCheck.exists && existsCheck.book) {
                toast.info('Book with same title already exists.');
                form.reset();
                router.push(`/books/${existsCheck.book.slug}`);
                return;
            }

            const fileTitle = data.title.replace(/\s+/g, '-').toLowerCase();
            const pdfFile = data.pdfFile;

            const parsedPDF = await parsePDFFile(pdfFile);

            if (parsedPDF.content.length === 0) {
                toast.error('Failed to parse PDF. Please try again.');
                return;
            }

            const uploadedPdfBlob = await upload(fileTitle, pdfFile, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                contentType: 'application/pdf',
            });

            let coverUrl: string;

            if (data.coverImage) {
                const uploadedCoverBlob = await upload(
                    `${fileTitle}_cover.png`,
                    data.coverImage,
                    {
                        access: 'public',
                        handleUploadUrl: '/api/upload',
                        contentType: data.coverImage.type,
                    }
                );
                coverUrl = uploadedCoverBlob.url;
            } else {
                const response = await fetch(parsedPDF.cover);
                const blob = await response.blob();

                const uploadedCoverBlob = await upload(
                    `${fileTitle}_cover.png`,
                    blob,
                    {
                        access: 'public',
                        handleUploadUrl: '/api/upload',
                        contentType: 'image/png',
                    }
                );

                coverUrl = uploadedCoverBlob.url;
            }

            const book = await createBook({
                clerkId: userId,
                title: data.title,
                author: data.author,
                persona: data.persona,
                fileURL: uploadedPdfBlob.url,
                fileBlobKey: uploadedPdfBlob.pathname,
                coverURL: coverUrl,
                fileSize: pdfFile.size,
            });

            if (!book.success) {
                toast.error(book.error || 'Failed to create book');
                if (book.isBillingError) {
                    router.push('/subscriptions');
                }
                return;
            }

            if (book.alreadyExists && book.data?.slug) {
                toast.info('Book with same title already exists.');
                form.reset();
                router.push(`/books/${book.data.slug}`);
                // another option for push Function
                // router.push(`/books/${(book.data as { slug: string }).slug}`);
                return;
            }

            if (!book.data?._id) {
                toast.error('Book ID not found');
                return;
            }

            const segments = await saveBookSegments(
                book.data._id,
                userId,
                parsedPDF.content
            );

            if (!segments.success) {
                toast.error('Failed to save book segments');
                throw new Error('Segments error');
            }

            form.reset();
            router.push('/');
        } catch (error) {
            console.error(error);
            toast.error('Failed to upload book.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isMounted) return null;

    return (
        <>
            {isSubmitting && <LoadingOverlay />}
            <div className="new-book-wrapper">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 flex flex-col"
                    >
                        {/* PDF */}
                        <FileUploader
                            control={form.control}
                            name="pdfFile"
                            label="Book PDF File"
                            acceptTypes={ACCEPTED_PDF_TYPES}
                            icon={Upload}
                            placeholder="Click to upload PDF"
                            hint="PDF file (max 50MB)"
                            disabled={isSubmitting}
                        />
                        {/* Cover */}
                        <FileUploader
                            control={form.control}
                            name="coverImage"
                            label="Cover Image (Optional)"
                            acceptTypes={ACCEPTED_IMAGE_TYPES}
                            icon={ImageIcon}
                            placeholder="Click to upload cover image"
                            hint="Leave empty to auto-generate from PDF"
                            disabled={isSubmitting}
                        />
                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">
                                        Book Title
                                    </FormLabel>
                                    <FormControl>
                                        <input
                                            className="form-input"
                                            placeholder="ex: Sherlock Holmes"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage className="form-error"/>
                                </FormItem>
                            )}
                        />
                        {/* Author */}
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">
                                        Book Author
                                    </FormLabel>
                                    <FormControl>
                                        <input
                                            className="form-input"
                                            placeholder="ex: Arthur Conan Doyle"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage className="form-error" />
                                </FormItem>
                            )}
                        />
                        {/* Voice */}
                        <VoiceSelector
                            control={form.control}
                            name="persona"
                            disabled={isSubmitting}
                        />
                        {/* Submit */}
                        <button
                            type="submit"
                            className="form-btn"
                            disabled={isSubmitting}
                        >
                            Begin Synthesis
                        </button>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default UploadForm;