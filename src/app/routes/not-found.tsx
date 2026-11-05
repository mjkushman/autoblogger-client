import { Link } from "react-router-dom";
import { Message } from "@/components/Message";
import { buttonClasses } from "@/components/Button";

export const NotFoundRoute = () => (
  <Message
    title="We can't find that page"
    action={
      <Link to="/" replace className={buttonClasses("primary")}>
        Take me home
      </Link>
    }
  >
    <p>The page may have moved, or the link might be mistyped.</p>
  </Message>
);
