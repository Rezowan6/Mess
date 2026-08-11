import { UserRound } from "lucide-react";
import {
  forwardRef,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  src?: string | null;
  alt?: string;
  fallback?: ReactNode;
  size?: AvatarSize;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  (
    {
      src,
      alt = "User avatar",
      fallback,
      size = "md",
      className,
      ...props
    },
    ref,
  ) => {
    return src ? (
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        className={[
          "shrink-0 rounded-full object-cover",
          sizeClasses[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    ) : (
      <div
        role="img"
        aria-label={alt}
        className={[
          "flex shrink-0 items-center justify-center cursor-pointer",
          "rounded-full bg-gradient-success text-text",
          sizeClasses[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {fallback ?? <UserRound size={size === "xs" ? 14 : size === "sm" ? 16 : 20} />}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";