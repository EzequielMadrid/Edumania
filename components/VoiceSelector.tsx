'use client';

import { voiceCategories, voiceOptions } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FieldValues, Control, Path } from 'react-hook-form';

type Props<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    disabled?: boolean;
    className?: string;
};

const VoiceSelector = <T extends FieldValues>({control, name, disabled, className}: Props<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('flex flex-col gap-2', className)}>

                    <FormLabel className="form-label form-label--voice">
                        Select Your Favourite Assistant Voice
                    </FormLabel>
                    <FormControl>
                        <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={disabled}
                            className="flex flex-col gap-8"
                        >
                            <div className="flex flex-col gap-4">
                                <h4 className="voice-selector-title">Male Voices</h4>
                                <div className="voice-selector-options">
                                    {voiceCategories.male.map((voiceId) => {
                                        const voice =
                                            voiceOptions[voiceId as keyof typeof voiceOptions];
                                        const isSelected = field.value === voiceId;
                                        return (
                                            <label
                                                key={voiceId}
                                                className={cn(
                                                    'voice-selector-option',
                                                    isSelected
                                                        ? 'voice-selector-option-selected'
                                                        : 'voice-selector-option-default',
                                                    disabled && 'voice-selector-option-disabled'
                                                )}
                                            >
                                                <RadioGroupItem
                                                    value={voiceId}
                                                    id={voiceId}
                                                    className="sr-only"
                                                />
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className={cn(
                                                                'voice-selector-radio',
                                                                isSelected &&
                                                                'voice-selector-radio-active'
                                                            )}
                                                        >
                                                            {isSelected && (
                                                                <div className="voice-selector-radio-dot" />
                                                            )}
                                                        </div>
                                                        <span className="voice-selector-name">{voice.name}</span>
                                                    </div>
                                                    <p className="voice-selector-description">
                                                        {voice.description}
                                                    </p>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="voice-selector-title">Female Voices</h4>
                                <div className="voice-selector-options">
                                    {voiceCategories.female.map((voiceId) => {
                                        const voice =
                                            voiceOptions[voiceId as keyof typeof voiceOptions];
                                        const isSelected = field.value === voiceId;
                                        return (
                                            <label
                                                key={voiceId}
                                                className={cn(
                                                    'voice-selector-option',
                                                    isSelected
                                                        ? 'voice-selector-option-selected'
                                                        : 'voice-selector-option-default',
                                                    disabled && 'voice-selector-option-disabled'
                                                )}
                                            >
                                                <RadioGroupItem
                                                    value={voiceId}
                                                    id={voiceId}
                                                    className="sr-only"
                                                />
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className={cn(
                                                                'voice-selector-radio',
                                                                isSelected &&
                                                                'voice-selector-radio-active'
                                                            )}
                                                        >
                                                            {isSelected && (
                                                                <div className="voice-selector-radio-dot" />
                                                            )}
                                                        </div>
                                                        <span className="voice-selector-name">{voice.name}</span>
                                                    </div>
                                                    <p className="voice-selector-description">
                                                        {voice.description}
                                                    </p>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                        </RadioGroup>
                    </FormControl>

                    <FormMessage className="form-error"/>
                </FormItem>
            )}
        />
    );
};

export default VoiceSelector;