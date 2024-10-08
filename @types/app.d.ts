type loginProps = {
    email: string
    password: string
    role: string
    children: boolean
    countChildren: number
    movie: string| null
    mobile: any
    number: any
}

type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    options?: Array<{value:string, label:string}>
    control: Control<loginProps>
};

type CustomSelectProps = {
    placeholder?: string;
    name: ValidFieldNames;
    error: FieldError | undefined;
    options?: Array<any>;
    control: Control<loginProps>;
}

type CustomRadioProps = {
    placeholder: string;
    name: ValidFieldNames;
    error: FieldError | undefined;
    isBoolean?: boolean;
    options?: Array<{value:boolean, label:string}>
    control: Control<loginProps>;
    setValue: any
}

type CustomTextFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    error: FieldError | undefined;
    control: Control<loginProps>;
    endAdornment ?: React.ReactElement<SvgIconProps>;
    startAdornment ?: React.ReactElement<SvgIconProps>;
    toolTipText?: string;
}

type CustomAutocompleteProps = {
    placeholder: string;
    name: ValidFieldNames;
    error?: FieldError | undefined;
    options: any;
    control: Control<loginProps>
}