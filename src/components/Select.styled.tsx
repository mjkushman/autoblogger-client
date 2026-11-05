import { Select } from "@headlessui/react";
import classNames from "classnames";
import { fieldStyles } from "./fieldStyles";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};

export const StyledSelect: React.FC<SelectProps> = ({
  className,
  children,
  ...props
}) => (
  <Select
    className={classNames(fieldStyles, "select-chevron appearance-none pe-9", className)}
    {...props}
  >
    {children}
  </Select>
);

export default StyledSelect;
