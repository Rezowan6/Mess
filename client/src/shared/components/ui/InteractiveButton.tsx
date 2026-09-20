import React, {
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

// ১. Button-এর Variant টাইপসমূহ
export type ButtonVariant =
  | "gradient" // Multi-color Linear Gradient
  | "neon" // Glowing Cyber Neon Accent
  | "liquid" // Smooth Mesh Fluid Gradient
  | "glass" // Frosted Glassmorphism
  | "cyberpunk" // Bold High-Contrast Energetic
  | "glowing" // Ambient Emerald Glow
  | "outline"; // Subtle Glowing Border Outline

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface InteractiveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  enableMagnetic?: boolean;
  enableRipple?: boolean;
  className?: string; // বাহির থেকে Width, Height, Margin ওভাররাইড করার জন্য
  children: ReactNode;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  variant = "gradient",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  enableMagnetic = true,
  enableRipple = true,
  className = "",
  children,
  onClick,
  style,
  disabled,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Click Ripple Effect Handler
  const handleRipple = (e: MouseEvent<HTMLButtonElement>) => {
    if (!enableRipple || isLoading || disabled) return;
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  // Magnetic 3D Physics Mouse Move Handler
  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!enableMagnetic || isLoading || disabled) return;
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;

    setTransform({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    handleRipple(e);
    if (onClick) onClick(e);
  };

  // Base Styles (Tailwind CSS)
  const baseStyles = `
    relative overflow-hidden inline-flex items-center justify-center font-semibold rounded-xl
    transition-all duration-300 ease-out active:scale-95 cursor-pointer select-none
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  `;

  // Pre-defined Sizes
  const sizeStyles: Record<ButtonSize, string> = {
    sm: "text-xs px-3 py-1.5 gap-1.5 min-h-[36px]",
    md: "text-sm px-5 py-2.5 gap-2 min-h-[44px]",
    lg: "text-base px-6 py-3.5 gap-2.5 min-h-[52px]",
    xl: "text-lg px-8 py-4 gap-3 min-h-[60px]",
  };

  // All Variants Styling (Tailwind + Linear Gradients)
  const variantStyles: Record<ButtonVariant, string> = {
    gradient: `
      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white
      hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:scale-[1.02]
      border border-white/20
    `,
    neon: `
      bg-slate-950 text-cyan-400 border border-cyan-500/50
      hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]
      before:absolute before:inset-0 before:bg-cyan-500/10 before:opacity-0 hover:before:opacity-100
    `,
    liquid: `
      bg-[linear-gradient(135deg,#6366f1_0%,#a855f7_50%,#ec4899_100%)] text-white
      hover:bg-[linear-gradient(135deg,#ec4899_0%,#a855f7_50%,#6366f1_100%)]
      hover:shadow-lg hover:shadow-purple-500/40 hover:scale-[1.02]
    `,
    glass: `
      bg-white/10 backdrop-blur-md text-white border border-white/20
      hover:bg-white/20 hover:border-white/40 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]
    `,
    cyberpunk: `
      bg-amber-400 text-black font-bold uppercase tracking-wider
      border-2 border-black hover:bg-amber-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
      active:translate-x-1 active:translate-y-1 active:shadow-none
    `,
    glowing: `
      bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold
      hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-105
    `,
    outline: `
      bg-transparent text-slate-200 border-2 border-indigo-500/60
      hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-white
    `,
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Dynamic Ripple Wave */}
      <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full animate-ping pointer-events-none"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
              width: 40,
              height: 40,
            }}
          />
        ))}
      </span>

      {/* Loading Spinner State */}
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-current mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        leftIcon && <span className="inline-flex items-center">{leftIcon}</span>
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Right Icon */}
      {!isLoading && rightIcon && (
        <span className="inline-flex items-center relative z-10">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default InteractiveButton;
