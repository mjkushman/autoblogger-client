import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { Message } from "./Message";
import { buttonClasses } from "./Button";

export default function ErrorPage(): React.ReactNode {
  const error = useRouteError();
  console.error(error);

  return (
    <Message
      title="Something went wrong"
      action={
        <Link to="/" replace className={buttonClasses("primary")}>
          Back to home
        </Link>
      }
    >
      <p>We hit an unexpected problem loading this page. Please try again in a moment.</p>
    </Message>
  );
}
