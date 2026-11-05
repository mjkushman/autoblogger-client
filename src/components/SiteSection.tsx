import classNames from "classnames";

type Props = {
  heading?: string;
  subheading?: string;
  /** Tailwind classes for the section background and default text colour */
  bgColor?: string;
  textColor?: string;
  children: React.ReactNode;
};

export const SiteSection = ({
  heading,
  subheading,
  bgColor = "bg-gray-50",
  textColor = "text-gray-900",
  children,
}: Props) => (
  <section className={classNames(bgColor, textColor)}>
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      {(heading || subheading) && (
        <header className="mx-auto mb-12 max-w-2xl text-center">
          {heading && (
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
          )}
          {subheading && <p className="mt-3 text-lg opacity-70">{subheading}</p>}
        </header>
      )}
      {children}
    </div>
  </section>
);
