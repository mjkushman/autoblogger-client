

export const MainErrorFallback = ({error}: {error: Error}) => {
  return (
    <div role="alert">
      <h2 className="text-lg font-semibold">Ooops, something went wrong: {error.message}.</h2>
      <button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </button>
    </div>

  );
};
