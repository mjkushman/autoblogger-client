import { useState } from "react";

/** Tracks the saving / saved / failed state of an async save */
export const useSaveStatus = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (save: () => Promise<void>, errorMessage: string) => {
    setIsSaving(true);
    setIsSaved(false);
    setError(null);
    try {
      await save();
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch {
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return { isSaving, isSaved, error, run };
};
