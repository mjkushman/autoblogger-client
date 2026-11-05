// For use with form inputs. The control must come first and carry the `peer` class.
import { Label } from "@headlessui/react";
import classNames from "classnames";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string;
  htmlFor: string;
};

export const FloatingLabel: React.FC<LabelProps> = ({
  htmlFor,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "pointer-events-none absolute start-3.5 top-3.5 z-10 origin-[0] -translate-y-2.5 scale-75 text-sm text-gray-500 transition duration-200 ease-out peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-violet-700";

  return (
    <Label className={classNames(baseStyles, className)} htmlFor={htmlFor} {...props}>
      {children}
    </Label>
  );
};

export default FloatingLabel;
