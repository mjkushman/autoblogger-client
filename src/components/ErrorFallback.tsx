import { error } from "console";

export const MainErrorFallback = (props) => {
  return (
    <div role="alert">
      <h2 className="text-lg font-semibold">Ooops, something went wrong: {props.error.message}.</h2>
      <button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </button>
    </div>

  );
};
