import { LinkButton } from "@/components";
import { siteLinks } from "@/utils/siteLinks";

export const GetStarted = () => (
  <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
    <LinkButton to={`${siteLinks.auth.path}?mode=signup`} size="lg" className="w-full sm:w-auto">
      Get your API key
    </LinkButton>
    <LinkButton to={siteLinks.api.path} variant="secondary" size="lg" className="w-full sm:w-auto">
      Explore the API
    </LinkButton>
  </div>
);
