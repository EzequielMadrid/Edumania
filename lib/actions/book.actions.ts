'use server';

import mongoose from "mongoose";
import { connectToDatabase } from "@/database/mongoose";
import { CreateBook, TextSegment, CreateBookResult } from "@/types";
import { escapeRegex, generateSlug, serializeData } from "@/lib/utils";
import Book from "@/database/models/book.model";
import BookSegment from "@/database/models/book-segment.model";
// import { getUserPlan } from "@/lib/subscription.server";
// import { PLAN_LIMITS } from "@/lib/constants";

export const getAllBooks = async (search?: string) => {
    try {
        await connectToDatabase();

        let query = {};

        if (search) {
            const escapedSearch = escapeRegex(search);
            const regex = new RegExp(escapedSearch, 'i');

            query = {
                $or: [
                    { title: { $regex: regex } },
                    { author: { $regex: regex } },
                ],
            };
        }

        const books = await Book.find(query).sort({ createdAt: -1 }).lean();

        return {
            success: true,
            data: serializeData(books),
        };
    } catch (e) {
        return {
            success: false,
            error: e instanceof Error ? e.message : 'Failed to fetch books',
        };
    }
};

export const checkBookExists = async (title: string) => {
    try {
        await connectToDatabase();

        const slug = generateSlug(title);
        const existingBook = await Book.findOne({ slug }).lean();

        if (existingBook) {
            return {
                exists: true,
                book: serializeData(existingBook),
            };
        }

        return {
            exists: false,
        };
    } catch (e) {
        return {
            exists: false,
            error: e instanceof Error ? e.message : 'Failed to check book',
        };
    }
};

const createBook = async (
    data: CreateBook
): Promise<CreateBookResult> => {
    try {
        await connectToDatabase();

        const slug = generateSlug(data.title);
        const existingBook = await Book.findOne({ slug }).lean();

        if (existingBook) {
            return {
                success: true,
                data: serializeData(existingBook),
                alreadyExists: true,
            };
        }

        const { auth } = await import("@clerk/nextjs/server");
        const { userId } = await auth();

        if (!userId || userId !== data.clerkId) {
            return {
                success: false,
                error: "Unauthorized",
            };
        }

        // Subscription / Plan system (disabled for now)
        /*
        const plan = await getUserPlan();
        const limits = PLAN_LIMITS[plan];
        const bookCount = await Book.countDocuments({ clerkId: userId });

        if (bookCount >= limits.maxBooks) {
            const { revalidatePath } = await import("next/cache");

            revalidatePath("/");

            return {
                success: false,
                error: `You're at the limit of ${limits.maxBooks} books for your ${plan} plan. Want more space? Upgrade anytime.`,
                isBillingError: true,
            };
        }
        */

        const book = await Book.create({
            ...data,
            clerkId: userId,
            slug,
            totalSegments: 0,
        });

        return {
            success: true,
            data: serializeData(book),
        };
    } catch (e) {
        return {
            success: false,
            error: e instanceof Error ? e.message : 'Failed to create book',
        };
    }
};
export default createBook

export const getBookBySlug = async (slug: string) => {
    try {
        await connectToDatabase();

        const book = await Book.findOne({ slug }).lean();

        if (!book) {
            return {
                success: false,
                error: 'Book not found',
            };
        }

        return {
            success: true,
            data: serializeData(book),
        };
    } catch (e) {
        return {
            success: false,
            error: e instanceof Error ? e.message : 'Failed to fetch book',
        };
    }
};

export const saveBookSegments = async (
    bookId: string,
    clerkId: string,
    segments: TextSegment[]
) => {
    try {
        await connectToDatabase();

        const segmentsToInsert = segments.map(
            ({ text, segmentIndex, pageNumber, wordCount }) => ({
                clerkId,
                bookId,
                content: text,
                segmentIndex,
                pageNumber,
                wordCount,
            })
        );

        await BookSegment.insertMany(segmentsToInsert);

        await Book.findByIdAndUpdate(bookId, {
            totalSegments: segments.length,
        });

        return {
            success: true,
            data: {
                segmentsCreated: segments.length,
            },
        };
    } catch (e) {
        return {
            success: false,
            error: e instanceof Error ? e.message : 'Failed to save segments',
        };
    }
};

export const searchBookSegments = async (
    bookId: string,
    query: string,
    limit: number = 5
) => {
    try {
        await connectToDatabase();

        const bookObjectId = new mongoose.Types.ObjectId(bookId);

        let segments: Record<string, unknown>[] = [];

        try {
            segments = await BookSegment.find({
                bookId: bookObjectId,
                $text: { $search: query },
            })
                .select('_id bookId content segmentIndex pageNumber wordCount')
                .sort({ score: { $meta: 'textScore' } })
                .limit(limit)
                .lean();
        } catch {
            segments = [];
        }

        if (segments.length === 0) {
            const keywords = query.split(/\s+/).filter((k) => k.length > 2);
            const pattern = keywords.map(escapeRegex).join('|');

            segments = await BookSegment.find({
                bookId: bookObjectId,
                content: { $regex: pattern, $options: 'i' },
            })
                .select('_id bookId content segmentIndex pageNumber wordCount')
                .sort({ segmentIndex: 1 })
                .limit(limit)
                .lean();
        }

        return {
            success: true,
            data: serializeData(segments),
        };
    } catch (e) {
        return {
            success: false,
            error: e instanceof Error ? e.message : 'Failed to search segments',
            data: [],
        };
    }
};