import { Link, LinkProps } from "react-router-dom";
import { buttonClasses, ButtonSize, ButtonVariant } from "./Button";

type Props = LinkProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const LinkButton: React.FC<Props> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Props) => (
  <Link {...props} className={buttonClasses(variant, size, className)}>
    {children}
  </Link>
);
