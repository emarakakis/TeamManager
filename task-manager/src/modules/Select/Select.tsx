import {
    TextField,
    MenuItem,
    Box,
    Chip,
    ListItemText,
    Checkbox,
} from '@mui/material';
import {
    ChangeEvent,
    FormEvent,
    UIEventHandler,
    forwardRef,
    useEffect,
    useState,
} from 'react';

//import ErrorMessage from '../ErrorMessage';

import type { SelectProps, Option } from './types';

const Select = forwardRef(
    <T extends Option>(
        {
            options,
            onChange,
            onBlur,
            name,
            required,
            defaultValue,
            onScrollEnd,
            inputProps,
            value,
            limitTags,
            checkbox,
            errors,
            ...props
        }: SelectProps<T>,
        ref: React.Ref<HTMLInputElement>
    ) => {
        const [internalValue, setInternalValue] = useState(
            defaultValue ?? (props.SelectProps?.multiple ? [] : '')
        );
        const onScroll: UIEventHandler<HTMLUListElement> = (event) => {
            if (
                onScrollEnd &&
                event.target instanceof HTMLElement &&
                event.target.scrollTop + 50 >= event.target.scrollHeight
            ) {
                onScrollEnd();
            }
        };

        const setValue = (e: ChangeEvent<HTMLInputElement>) => {
            if (!onChange || !props.ref) setInternalValue(e.target.value);
            onChange?.(e);
        };

        const multiSelectProps = {
            value: internalValue,
            onChange: (
                e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
                setValue(e as ChangeEvent<HTMLInputElement>);
            },
            renderValue: (selected: unknown) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5,
                    }}
                >
                    {(selected as string[]).slice(0, limitTags).map((v) => (
                        <Chip
                            size='small'
                            key={v}
                            label={options.find((o) => o.value === v)?.label}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                            }}
                            onDelete={
                                props.disabled
                                    ? undefined
                                    : (e) => {
                                          e.target.name = name;
                                          e.target.value = (
                                              selected as string[]
                                          ).filter((s) => s !== v);

                                          setValue(e);
                                      }
                            }
                        />
                    ))}
                    {limitTags &&
                        (selected as string[]).length >= limitTags && (
                            <span>...</span>
                        )}
                </Box>
            ),
        };

        useEffect(() => {
            if (value) {
                setInternalValue(value);
            }
        }, [value]);

        return (
            <>
                <TextField
                    size='small'
                    select
                    fullWidth
                    inputProps={{
                        ...inputProps,
                        onChange,
                        value,
                        onBlur,
                        name,
                        required,
                        selected: value,
                        disabled: props.disabled,
                        ...(props.SelectProps?.multiple && multiSelectProps),
                    }}
                    defaultValue={
                        defaultValue ?? (props.SelectProps?.multiple ? [] : '')
                    }
                    SelectProps={{
                        ...props.SelectProps,
                        MenuProps: {
                            ...props.SelectProps?.MenuProps,
                            MenuListProps: {
                                ...props.SelectProps?.MenuProps?.MenuListProps,
                                sx: { maxHeight: 200, overflowY: 'auto' },
                                onScroll,
                            },
                        },
                    }}
                    id={`${name}-select`}
                    {...props}
                    value={value}
                    ref={ref}
                >
                    {options.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {checkbox &&
                            props.SelectProps?.multiple &&
                            Array.isArray(internalValue) ? (
                                <>
                                    <Checkbox
                                        checked={internalValue.includes(
                                            option.value
                                        )}
                                    />
                                    <ListItemText primary={option.label} />
                                </>
                            ) : (
                                option.label
                            )}
                        </MenuItem>
                    ))}
                </TextField>
                {/* <ErrorMessage errors={errors} name={name!} /> */}
            </>
        );
    }
);

Select.displayName = 'Select';

export default Select;