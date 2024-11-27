import { Field, Input,} from "@headlessui/react";

import classNames from "classnames";
import FloatingLabel from "./FloatingLabel.styled";

type ButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "primary";
  label?: string;
  className?: string;
  id: string
};

export const InputField: React.FC<ButtonProps> = ({
  variant = "primary",
  id,
  label,
  className,
  children,
  ...props
}) => {
  const baseStyles = "block w-full px-4 pt-5 pb-2.5 rounded-md font-medium focus:outline-none peer";
  const variantStyles = {
    primary:
      "bg-white text-gray-800 data-[focus]:bg-white data-[disabled]:bg-gray-200 hover:shadow-inner",
  };

  return (
    <Field className={"relative"}>
    <Input
      className={classNames(baseStyles, variantStyles[variant], className)}
      placeholder=" "
      {...props}
      >
      {children}
    </Input>
        <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
    </Field>
  );
};

export default InputField;
