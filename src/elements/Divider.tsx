type DividerProps = {
  orientation?: "horizontal" | "vertical";
  class?: string;
};

export const Divider = ({ orientation = "horizontal", class: className }: DividerProps) => {
  return <hr aria-orientation={orientation} class={className} />;
};
