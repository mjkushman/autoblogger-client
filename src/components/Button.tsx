import { Button } from '@headlessui/react';

import classNames from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" ;
  className?: string;
};

export const StyledButton: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const baseStyles = "py-2 px-4 rounded-xl font-medium focus:outline-none duration-100";
  const variantStyles = {
    primary: "bg-violet-900 text-gray-100  my-2 data-[disabled]:bg-gray-200 hover:bg-violet-500 hover:shadow-xl",
    secondary: "bg-gray-100 text-violet-800 border border-violet-900 hover:bg-gray-200 data-[disabled]:bg-gray-200 hover:shadow-xl",
  };

  return (
    <Button
      className={classNames(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default StyledButton;