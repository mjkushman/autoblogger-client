import { Field, Input } from "@headlessui/react";

import classNames from "classnames";
import FloatingLabel from "./FloatingLabel.styled";

type ButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "primary";
  className?: string;
  label: string;
  id: string;
};

export const TimeInput: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  id,
  children,
  label,
  ...props
}) => {
  const baseStyles =
    "block w-full p-2 pt-5 rounded-none font-medium focus:outline-none peer";
  const variantStyles = {
    primary:
      "bg-white text-gray-800 data-[focus]:bg-white data-[disabled]:bg-gray-200 hover:shadow-inner",
  };

  return (
    <Field className={"relative"}>
      <Input
        className={classNames(baseStyles, variantStyles[variant], className)}
        type="time"
        // placeholder=" "
        {...props}
      >
        {children}
      </Input>
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
    </Field>
  );
};

export default TimeInput;
