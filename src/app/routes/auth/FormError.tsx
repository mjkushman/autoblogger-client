export const FormError = ({ children }: { children: React.ReactNode }) => (
  <div
    role="alert"
    className="mt-5 rounded-lg bg-rose-50 px-3.5 py-2.5 text-sm text-rose-800 ring-1 ring-inset ring-rose-200 animate-fade-in"
  >
    {children}
  </div>
);
