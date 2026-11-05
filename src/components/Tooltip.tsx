import classNames from "classnames";

type TooltipProps = {
  label: string;
  /** Where the bubble appears relative to what it wraps */
  side?: "top" | "bottom";
  /** "end" lines the bubble up with the right edge, for triggers at the edge of a field */
  align?: "center" | "end";
  children: React.ReactNode;
};

/** Shows `label` on hover or keyboard focus of whatever it wraps */
export const Tooltip = ({ label, side = "top", align = "center", children }: TooltipProps) => (
  <span className="group/tip relative inline-flex">
    {children}
    <span
      role="tooltip"
      className={classNames(
        "pointer-events-none absolute z-30 w-max max-w-[16rem] rounded-md bg-gray-900 px-2.5 py-1.5 text-center text-xs font-normal leading-snug text-white opacity-0 shadow-lg transition duration-150",
        "group-hover/tip:opacity-100 group-hover/tip:delay-300 group-focus-within/tip:opacity-100",
        align === "end" ? "right-0 text-left" : "left-1/2 -translate-x-1/2",
        side === "top"
          ? "bottom-full mb-2 translate-y-1 group-hover/tip:translate-y-0 group-focus-within/tip:translate-y-0"
          : "top-full mt-2 -translate-y-1 group-hover/tip:translate-y-0 group-focus-within/tip:translate-y-0"
      )}
    >
      {label}
    </span>
  </span>
);

/** A small (i) icon that explains a form field. Place it inside a `relative` field. */
export const InfoTip = ({ label }: { label: string }) => (
  <Tooltip label={label} align="end">
    <button
      type="button"
      aria-label={label}
      className="rounded-full text-gray-400 transition hover:text-violet-700 focus-visible:text-violet-700"
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </Tooltip>
);
