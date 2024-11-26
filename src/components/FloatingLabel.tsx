// For use with form inputs
import { Label } from "@headlessui/react";

import classNames from "classnames";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  variant?: "primary";
  className?: string;
  type?: string;
  htmlFor: string
};

export const FloatingLabel: React.FC<LabelProps> = ({
  htmlFor,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto";

  return (
    <Label className={classNames(baseStyles, className)} htmlFor={htmlFor}{...props} >
      {children}
    </Label>
  );
};

export default FloatingLabel;
