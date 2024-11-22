type Props = {
  heading?: string;
  subheading?: string;
  bgColor?: string;
  textColor?: string
  children: React.ReactNode;
};

export const SiteSection = ({
  heading,
  subheading,
  bgColor = "bg-gray-50",
  textColor = "text-gray-900",
  children,
}: Props) => {
  return (
    // Background
    <div className={`${bgColor} ${textColor}`}>
      {/* Contnet */}
      <div className="max-w-4xl mx-auto py-12 px-8 lg:px-8 border-t border-gray-200">
        <div className="mx-auto lg:mx-0">
          {heading && (
            <h2 className="text-center lg:text-4xl font-semibold tracking-tight sm:text-2xl">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-center mt-2 text-lg leading-8 text-gray-500">
              {subheading}
            </p>
          )}
        </div>

        {/* Body */}
        <div className="mx-auto pt-8 lg:px-8">{children}</div>
      </div>
    </div>
  );
};
