import React from 'react'
import { Button } from '@headlessui/react';

import classNames from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" ;
  className?: string;
};

const StyledButton: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium focus:outline-none";
  const variantStyles = {
    primary: "bg-violet-900 hover:bg-blue-700 text-gray-100 py-2 px-4 rounded-lg my-4 data-[disabled]:bg-gray-200",
    secondary: "bg-gray-100 text-violet-800 rounded-lg border border-violet-900 hover:bg-gray-200 data-[disabled]:bg-gray-200",
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