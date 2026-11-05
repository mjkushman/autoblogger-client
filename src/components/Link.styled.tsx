import { Link, LinkProps } from "react-router-dom";
import classNames from "classnames";

export const StyledLink: React.FC<LinkProps> = ({
  className,
  children,
  ...props
}: LinkProps) => (
  <Link
    className={classNames(
      "font-medium text-violet-800 underline decoration-violet-300 decoration-2 underline-offset-4 transition hover:text-violet-950 hover:decoration-violet-700",
      className
    )}
    {...props}
  >
    {children}
  </Link>
);
