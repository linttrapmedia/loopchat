type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = {
  name: string;
  label?: string;
  options: Option[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  class?: string;
};

export const Select = ({
  name,
  label,
  options,
  value,
  placeholder,
  disabled = false,
  required = false,
  invalid = false,
  class: className,
}: SelectProps) => {
  return (
    <label class={className}>
      {label}
      <select name={name} disabled={disabled} required={required} aria-invalid={invalid ? "true" : undefined}>
        {placeholder && (
          <option value="" disabled selected={!value}>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option value={option.value} disabled={option.disabled} selected={option.value === value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};
