'use client';

import { useRef } from 'react';
import { FieldValues } from 'react-hook-form';
import { X } from 'lucide-react';
import { FileUploadFieldProps } from '@/types';
import { cn } from '@/lib/utils';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';

const FileUploader = <T extends FieldValues>({
                                                 control,
                                                 name,
                                                 label,
                                                 acceptTypes,
                                                 disabled,
                                                 icon: Icon,
                                                 placeholder,
                                                 hint,
                                             }: FileUploadFieldProps<T>) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const isUploaded = !!field.value;

                return (
                    <FormItem className="w-full">
                        <FormLabel className="form-label text-[#F0D8A1] tracking-wide">
                            {label}
                        </FormLabel>

                        <FormControl>
                            <div
                                className={cn(
                                    'upload-future',
                                    isUploaded && 'upload-future-uploaded'
                                )}
                                onClick={() => !disabled && inputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    accept={acceptTypes.join(',')}
                                    className="hidden"
                                    ref={inputRef}
                                    disabled={disabled}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) field.onChange(file);
                                    }}
                                />

                                {isUploaded ? (
                                    <div className="flex flex-col items-center relative w-full px-4">
                                        <p className="upload-future-text line-clamp-1">
                                            {(field.value as File).name}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                field.onChange(null);
                                                if (inputRef.current) inputRef.current.value = '';
                                            }}
                                            className="upload-future-remove mt-3"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <Icon className="upload-future-icon" />
                                        <p className="upload-future-text">{placeholder}</p>
                                        <p className="upload-future-hint">{hint}</p>
                                    </>
                                )}
                            </div>
                        </FormControl>
                        <FormMessage className="form-error"/>
                    </FormItem>
                );
            }}
        />
    );
};

export default FileUploader;