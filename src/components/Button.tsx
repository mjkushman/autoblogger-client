import { Button } from "@headlessui/react";
import classNames from "classnames";
import { Spinner } from "./Spinner";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap select-none transition duration-150 ease-out active:scale-[0.98] data-[disabled]:cursor-not-allowed data-[disabled]:shadow-none data-[disabled]:active:scale-100";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-violet-900 text-white shadow-sm hover:bg-violet-800 hover:shadow-md data-[disabled]:bg-gray-200 data-[disabled]:text-gray-400 data-[disabled]:hover:bg-gray-200",
  secondary:
    "bg-white text-violet-900 shadow-sm ring-1 ring-inset ring-violet-200 hover:bg-violet-50 hover:ring-violet-300 data-[disabled]:bg-gray-50 data-[disabled]:text-gray-400 data-[disabled]:ring-gray-200",
  ghost:
    "text-gray-700 hover:bg-gray-100 hover:text-violet-900 data-[disabled]:text-gray-400 data-[disabled]:hover:bg-transparent",
  danger:
    "bg-rose-600 text-white shadow-sm hover:bg-rose-700 hover:shadow-md data-[disabled]:bg-gray-200 data-[disabled]:text-gray-400",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

/** Shared by <Button> and <LinkButton> so links and buttons look identical */
export const buttonClasses = (
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
) => classNames(baseStyles, variantStyles[variant], sizeStyles[size], className);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and disables the button */
  loading?: boolean;
};

export const StyledButton: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  children,
  ...props
}) => (
  <Button
    className={buttonClasses(variant, size, className)}
    disabled={disabled || loading}
    aria-busy={loading || undefined}
    {...props}
  >
    {loading && <Spinner />}
    {children}
  </Button>
);

export default StyledButton;
