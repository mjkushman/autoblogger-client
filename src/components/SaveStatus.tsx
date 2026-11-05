import { Spinner } from "./Spinner";

type Props = { isSaving: boolean; isSaved: boolean; error: string | null };

/** Live feedback next to a Save button */
export const SaveStatus = ({ isSaving, isSaved, error }: Props) => (
  <span role="status" aria-live="polite" className="text-sm">
    {isSaving && (
      <span className="inline-flex items-center gap-1.5 text-gray-500 animate-fade-in">
        <Spinner /> Saving…
      </span>
    )}
    {isSaved && (
      <span className="inline-flex items-center gap-1.5 text-emerald-700 animate-fade-in">
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
          <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
        </svg>
        Saved
      </span>
    )}
    {error && <span className="text-rose-700 animate-fade-in">{error}</span>}
  </span>
);
