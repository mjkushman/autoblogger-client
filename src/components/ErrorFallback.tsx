import { Message } from "./Message";
import Button from "./Button";

export const MainErrorFallback = ({ error }: { error: Error }) => {
  console.error(error);
  return (
    <div role="alert">
      <Message
        title="Something went wrong"
        action={
          <Button onClick={() => window.location.assign(window.location.origin)}>
            Reload Autoblogger
          </Button>
        }
      >
        <p>An unexpected error stopped the app. Reloading usually fixes it.</p>
      </Message>
    </div>
  );
};
