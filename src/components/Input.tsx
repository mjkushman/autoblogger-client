import { Input } from "@headlessui/react";

import classNames from "classnames";

type ButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "primary";
  className?: string;
};

export const StyledInput: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const baseStyles = "block w-full px-4 pt-5 pb-2.5 rounded-xl font-medium focus:outline-none peer";
  const variantStyles = {
    primary:
      "bg-white text-gray-800 rounded-xl data-[focus]:bg-white data-[disabled]:bg-gray-200 hover:shadow-inner",
  };

  return (
    <Input
      className={classNames(baseStyles, variantStyles[variant], className)}
      placeholder=" "
      {...props}
    >
      {children}
    </Input>
  );
};

export default StyledInput;
