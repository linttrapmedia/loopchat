type CheckboxProps = {
  name: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  class?: string;
};

export const Checkbox = ({ name, label, checked = false, disabled = false, class: className }: CheckboxProps) => {
  return (
    <label class={className}>
      <input type="checkbox" name={name} checked={checked} disabled={disabled} />
      {label}
    </label>
  );
};

type RadioProps = {
  name: string;
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  class?: string;
};

export const Radio = ({ name, label, value, checked = false, disabled = false, class: className }: RadioProps) => {
  return (
    <label class={className}>
      <input type="radio" name={name} value={value} checked={checked} disabled={disabled} />
      {label}
    </label>
  );
};

type SwitchProps = {
  name: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  class?: string;
};

export const Switch = ({ name, label, checked = false, disabled = false, class: className }: SwitchProps) => {
  return (
    <label class={className}>
      <input type="checkbox" name={name} checked={checked} disabled={disabled} role="switch" />
      {label}
    </label>
  );
};
