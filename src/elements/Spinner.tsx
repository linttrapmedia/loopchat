type SpinnerProps = {
  size?: "small" | "medium" | "large";
  class?: string;
};

export const Spinner = ({ size = "medium", class: className }: SpinnerProps) => {
  return <span aria-busy="true" data-size={size} aria-label="Loading" class={className} />;
};
