type InputProps = {
  name: string;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  invalid?: boolean;
  helperText?: string;
  class?: string;
};

export const Input = ({
  name,
  label,
  type = "text",
  placeholder,
  value,
  disabled = false,
  required = false,
  readonly = false,
  invalid = false,
  helperText,
  class: className,
}: InputProps) => {
  return (
    <label class={className}>
      {label}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        required={required}
        readonly={readonly}
        aria-invalid={invalid ? "true" : undefined}
      />
      {helperText && <small>{helperText}</small>}
    </label>
  );
};
