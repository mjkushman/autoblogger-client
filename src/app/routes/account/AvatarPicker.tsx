import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Description, Field, Label } from "@headlessui/react";
import { Button, Tooltip, fieldStyles } from "@/components";

const MAX_URL_LENGTH = 255; // the database column is a varchar(255)

const isValidImageUrl = (value: string) => {
  try {
    const { protocol } = new URL(value);
    return (protocol === "https:" || protocol === "http:") && value.length <= MAX_URL_LENGTH;
  } catch {
    return false;
  }
};

type Props = {
  imageUrl?: string;
  /** Shown when there's no image yet */
  initial: string;
  onChange: (imageUrl: string) => void;
};

/** The agent's avatar. Click it to set the author photo from an image link. */
export const AvatarPicker = ({ imageUrl, initial, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  const trimmed = draft.trim();
  const isValid = isValidImageUrl(trimmed);
  const hasLoadError = failedUrl === trimmed;

  const open = () => {
    setDraft(imageUrl ?? "");
    setFailedUrl(null);
    setIsOpen(true);
  };

  const apply = () => {
    onChange(trimmed);
    setIsOpen(false);
  };

  return (
    <>
      <Tooltip label="Change author photo" side="bottom">
        <button
          type="button"
          onClick={open}
          aria-label="Change author photo"
          className="group relative grid size-12 place-items-center overflow-hidden rounded-full bg-violet-100 text-base font-semibold text-violet-800 ring-1 ring-black/5 transition hover:ring-2 hover:ring-violet-400"
        >
          {imageUrl ? (
            <img src={imageUrl} alt="" className="size-full object-cover" />
          ) : (
            <span aria-hidden="true">{initial}</span>
          )}
          {/* Camera overlay on hover and keyboard focus */}
          <span className="absolute inset-0 grid place-items-center bg-violet-950/55 text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
            </svg>
          </span>
        </button>
      </Tooltip>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} transition className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition duration-200 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 grid place-items-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <DialogTitle className="text-lg font-semibold text-gray-900">Author photo</DialogTitle>
            <Description className="mt-1 text-sm text-gray-600">
              Paste a link to an image that's already online. Your site shows it next to this author's
              posts. Landscape or square images work best.
            </Description>

            <div className="mt-5 grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-gray-100 ring-1 ring-inset ring-gray-200">
              {isValid && !hasLoadError ? (
                <img
                  key={trimmed}
                  src={trimmed}
                  alt="Preview of the author photo"
                  onError={() => setFailedUrl(trimmed)}
                  className="size-full object-cover animate-fade-in"
                />
              ) : (
                <p className="px-6 text-center text-sm text-gray-500">
                  {hasLoadError
                    ? "We couldn't load an image from that link. Check that it points directly to an image file."
                    : "A preview appears here once you paste a link."}
                </p>
              )}
            </div>

            <Field className="mt-4">
              <Label className="text-sm font-medium text-gray-700">Image link</Label>
              <input
                type="url"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                autoFocus
                className={`${fieldStyles} mt-1.5 !pt-2.5 !pb-2.5`}
              />
              {trimmed && !isValid && (
                <p className="mt-1.5 text-sm text-rose-700">
                  Enter a full link starting with https:// (up to {MAX_URL_LENGTH} characters).
                </p>
              )}
            </Field>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={apply} disabled={!isValid || hasLoadError}>
                Use this photo
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
