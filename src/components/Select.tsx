import { Select } from "@headlessui/react";

import classNames from "classnames";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  variant?: "primary";
  className?: string;
};

export const StyledSelect: React.FC<SelectProps> = ({
  variant = "primary",
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
    <Select
      className={classNames(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Select>
  );
};

export default StyledSelect;
