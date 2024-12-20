import { Link, LinkProps } from "react-router-dom";


export const StyledLink:React.FC<LinkProps> = ({ children, ...props }: LinkProps) => {
  return <Link 
  className="hover:underline decoration-2 decoration-violet-900" 
  {...props}>
    {children}</Link>;
};