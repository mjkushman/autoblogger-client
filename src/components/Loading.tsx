import { Spinner } from "./Spinner";

export const Loading = ({ label = "Loading…" }: { label?: string }) => (
  <div
    role="status"
    className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-sm text-gray-500 animate-fade-in"
  >
    <Spinner className="size-7 text-violet-700" />
    <span>{label}</span>
  </div>
);
