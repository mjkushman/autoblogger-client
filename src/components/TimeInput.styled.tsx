import { Field, Input } from "@headlessui/react";
import classNames from "classnames";
import FloatingLabel from "./FloatingLabel.styled";
import { fieldStyles } from "./fieldStyles";
import { InfoTip } from "./Tooltip";

type TimeInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
  tip?: string;
  id: string;
};

export const TimeInput: React.FC<TimeInputProps> = ({
  className,
  id,
  children,
  label,
  tip,
  ...props
}) => (
  <Field className="relative">
    <Input
      id={id}
      className={classNames(fieldStyles, "min-w-36", tip && "pe-9", className)}
      type="time"
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
  </Field>
);

export default TimeInput;
