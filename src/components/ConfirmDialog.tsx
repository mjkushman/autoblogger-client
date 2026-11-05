import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import Button from "./Button";

type Props = {
  open: boolean;
  title: string;
  description: React.ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

/** A modal for confirming destructive actions */
export const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = "Keep it",
  loading,
  onConfirm,
  onClose,
}: Props) => (
  <Dialog open={open} onClose={onClose} transition className="relative z-50">
    <DialogBackdrop
      transition
      className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition duration-200 ease-out data-[closed]:opacity-0"
    />
    <div className="fixed inset-0 grid place-items-center p-4">
      <DialogPanel
        transition
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <DialogTitle className="text-lg font-semibold text-gray-900">{title}</DialogTitle>
        <Description as="div" className="mt-2 text-sm leading-relaxed text-gray-600">
          {description}
        </Description>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
);
