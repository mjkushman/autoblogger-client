import classNames from "classnames";
import { Link, LinkProps } from "react-router-dom";

type Props = LinkProps & {
  variant?: "primary" | "secondary";
};

export const LinkButton: React.FC<Props> = ({
  variant = "primary",
  className,
  children,
  ...props
}: Props) => {
  const baseStyles = "p-4 m-4 border rounded-xl text-center shadow-xl";
  const variantStyles = {
    primary: "text-gray-100 bg-violet-900",
    secondary: "text-violet-900 bg-white",
  };

  return (
    <Link
      {...props}
      className={classNames(baseStyles, variantStyles[variant], className)}
    >
      {children}
    </Link>
  );
};
