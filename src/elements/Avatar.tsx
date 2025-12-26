type AvatarProps = {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "small" | "medium" | "large";
  class?: string;
};

export const Avatar = ({ src, alt = "", initials, size = "medium", class: className }: AvatarProps) => {
  return (
    <figure data-avatar data-size={size} class={className}>
      {src ? <img src={src} alt={alt} /> : <abbr>{initials}</abbr>}
    </figure>
  );
};
