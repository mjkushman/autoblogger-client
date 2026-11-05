import { Input } from "@headlessui/react";
import classNames from "classnames";
import FloatingLabel from "./FloatingLabel.styled";
import { fieldStyles } from "./fieldStyles";
import { InfoTip } from "./Tooltip";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  /** Help text shown in a tooltip next to the field */
  tip?: string;
  className?: string;
  id: string;
};

export const LabeledInput: React.FC<InputProps> = ({
  id,
  label,
  tip,
  className,
  children,
  ...props
}) => (
  <>
    <Input
      id={id}
      className={classNames(fieldStyles, tip && "pe-9", className)}
      placeholder=" "
      {...props}
    >
      {children}
    </Input>
    <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
    {tip && (
      <span className="absolute end-2.5 top-3.5 z-20">
        <InfoTip label={tip} />
      </span>
    )}
  </>
);

export default LabeledInput;
