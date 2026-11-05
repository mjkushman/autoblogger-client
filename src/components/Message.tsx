type Props = {
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  /** Use the dashed, inline style for empty states inside a page */
  inline?: boolean;
};

/** Centered title + text + action. Used for errors, 404s and empty states. */
export const Message = ({ title, children, action, inline }: Props) => (
  <div
    className={
      inline
        ? "rounded-xl border border-dashed border-gray-300 bg-white/60 px-6 py-10 text-center"
        : "mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 py-16 text-center animate-fade-in-up"
    }
  >
    <h1 className={inline ? "text-base font-semibold text-gray-900" : "text-3xl font-semibold tracking-tight text-violet-950"}>
      {title}
    </h1>
    {children && <div className="mt-2 text-sm leading-relaxed text-gray-600">{children}</div>}
    {action && <div className="mt-6">{action}</div>}
  </div>
);
