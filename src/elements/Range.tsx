type RangeProps = {
  name: string;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  disabled?: boolean;
  class?: string;
};

export const Range = ({
  name,
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  disabled = false,
  class: className,
}: RangeProps) => {
  return (
    <label class={`range ${className ?? ""}`}>
      {label && <span class="range__label">{label}</span>}
      <input type="range" name={name} min={min} max={max} step={step} value={value} disabled={disabled} />
    </label>
  );
};
