import { Link } from "react-router-dom";

type Props = {
  to: string;
  text: string;
  lightTheme?: boolean;
};

const LinkButton = ({to, text, lightTheme=true}: Props) => {
  
    const style = lightTheme
    ? "p-4 border m-4 rounded-xl text-violet-900 bg-white text-center shadow-xl"
    : "p-4 border m-4 rounded-xl text-gray-100 bg-violet-900 text-center shadow-xl"


    return (
    <Link
      to={to}
      className={style}
    >
      {text}
    </Link>
  );
};

export default LinkButton;
