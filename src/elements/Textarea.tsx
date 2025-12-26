type TextareaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  invalid?: boolean;
  helperText?: string;
  class?: string;
};

export const Textarea = ({
  name,
  label,
  placeholder,
  value,
  rows = 4,
  disabled = false,
  required = false,
  readonly = false,
  invalid = false,
  helperText,
  class: className,
}: TextareaProps) => {
  return (
    <label class={className}>
      {label}
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        readonly={readonly}
        aria-invalid={invalid ? "true" : undefined}
      >
        {value}
      </textarea>
      {helperText && <small>{helperText}</small>}
    </label>
  );
};
