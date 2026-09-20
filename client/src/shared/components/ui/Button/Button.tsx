import {
  forwardRef,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

import styles from "./Button.module.css";

export type ButtonVariant =
  "primary" | "success" | "danger" | "warning" | "dark" | "outline" | "ghost";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonRounded = "md" | "xl" | "full";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  /** number হলে px, string হলে যেমন "100%", "12rem" */
  width?: number | string;
  height?: number | string;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: styles.primary,
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
  dark: styles.dark,
  outline: styles.outline,
  ghost: styles.ghost,
};

const sizeClass: Record<ButtonSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

const roundedClass: Record<ButtonRounded, string> = {
  md: styles.roundedMd,
  xl: styles.roundedXl,
  full: styles.roundedFull,
};

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

const toCssSize = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      rounded = "xl",
      width,
      height,
      fullWidth = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      className,
      style,
      type = "button",
      onClick,
      children,
      ...rest
    },
    ref,
  ) {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const rippleCounter = useRef(0);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const rippleSize = Math.max(rect.width, rect.height) * 2;

      // Keyboard (Enter/Space) click-এ detail === 0, তাই মাঝখান থেকে ripple
      const fromKeyboard = event.detail === 0;
      const pointerX = fromKeyboard
        ? rect.width / 2
        : event.clientX - rect.left;
      const pointerY = fromKeyboard
        ? rect.height / 2
        : event.clientY - rect.top;

      rippleCounter.current += 1;
      const id = rippleCounter.current;

      setRipples((previous) => [
        ...previous,
        {
          id,
          x: pointerX - rippleSize / 2,
          y: pointerY - rippleSize / 2,
          size: rippleSize,
        },
      ]);

      onClick?.(event);
    };

    const removeRipple = (id: number) => {
      setRipples((previous) => previous.filter((ripple) => ripple.id !== id));
    };

    const cssVars = {
      ...(width !== undefined && { "--btn-width": toCssSize(width) }),
      ...(height !== undefined && { "--btn-height": toCssSize(height) }),
    } as CSSProperties;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        onClick={handleClick}
        className={cx(
          styles.button,
          variantClass[variant],
          sizeClass[size],
          roundedClass[rounded],
          fullWidth && styles.fullWidth,
          isLoading && styles.loading,
          className,
        )}
        style={{ ...cssVars, ...style }}
        {...rest}
      >
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className={styles.ripple}
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
            onAnimationEnd={() => removeRipple(ripple.id)}
          />
        ))}

        <span className={styles.content}>
          {isLoading ? (
            <span className={styles.spinner} aria-hidden="true" />
          ) : (
            leftIcon && (
              <span className={cx(styles.icon, styles.iconLeft)}>
                {leftIcon}
              </span>
            )
          )}

          {(isLoading ? (loadingText ?? children) : children) !== undefined && (
            <span className={styles.label}>
              {isLoading ? (loadingText ?? children) : children}
            </span>
          )}

          {!isLoading && rightIcon && (
            <span className={cx(styles.icon, styles.iconRight)}>
              {rightIcon}
            </span>
          )}
        </span>
      </button>
    );
  },
);

Button.displayName = "Button";
