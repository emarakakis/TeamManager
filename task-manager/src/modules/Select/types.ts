export type Option = {
    label: React.ReactNode;
    value: string | number;
    disabled?: boolean;
};

import type { TextFieldProps } from '@mui/material';

export type InputProps = TextFieldProps & {
    // @ts-expect-error could be any input
    errors?: FieldErrors<unknown>;
} & (
        | { id: NonNullable<TextFieldProps['id']> }
        | { name: NonNullable<TextFieldProps['name']> }
    );

export type SelectProps<T extends Option> = InputProps & {
    options: T[];
    onScrollEnd?: () => void;
    limitTags?: number;
    checkbox?: boolean;
    // @ts-expect-error could be any input
    errors?: FieldErrors<unknown>;
};