type TextFieldProps = {
  name: string;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  class?: string;
};

export const TextField = ({
  name,
  label,
  type = "text",
  placeholder,
  value,
  disabled = false,
  required = false,
  error = false,
  helperText,
  class: className,
}: TextFieldProps) => {
  return (
    <label class={className}>
      {label}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        required={required}
        aria-invalid={error ? "true" : undefined}
      />
      {helperText && <small>{helperText}</small>}
    </label>
  );
};
