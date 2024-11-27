import { Input } from "@headlessui/react";

import classNames from "classnames";
import FloatingLabel from "./FloatingLabel.styled";

type ButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "primary";
  label?: string;
  className?: string;
  id: string;
};

export const LabeledInput: React.FC<ButtonProps> = ({
  variant = "primary",
  id,
  label,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "block w-full px-4 pt-5 pb-2.5 rounded-md  sm:text-sm focus:outline-none peer";
  const variantStyles = {
    primary:
      "bg-white text-gray-800 data-[focus]:bg-white data-[disabled]:bg-gray-200 hover:shadow-inner",
  };

  return (
    <>
      <Input
        className={classNames(baseStyles, variantStyles[variant], className)}
        placeholder=" "
        {...props}
      >
        {children}
      </Input>
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
    </>
  );
};

export default LabeledInput;