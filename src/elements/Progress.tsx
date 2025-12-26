type ProgressProps = {
  value?: number;
  max?: number;
  class?: string;
};

export const Progress = ({ value, max = 100, class: className }: ProgressProps) => {
  return <progress value={value} max={max} class={className} />;
};

type LoadingProps = {
  class?: string;
};

export const Loading = ({ class: className }: LoadingProps) => {
  return <span aria-busy="true" class={className} />;
};
