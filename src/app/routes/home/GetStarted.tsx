import {LinkButton} from "@/components";
import { siteLinks } from "@/utils/siteLinks";

export const GetStarted = () => {
  return (
    <div className="text-center my-6">
      <div className="max-w-2xl mx-auto">
        <div className="max-w-sm mx-auto py-4">
          <div className="grid grid-cols-2">
            <div>
              <LinkButton to={siteLinks.api.path} variant="secondary">Explore the API</LinkButton>
            </div>
            <div>
              <LinkButton
                to={siteLinks.auth.path}
              >Get API key</LinkButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
