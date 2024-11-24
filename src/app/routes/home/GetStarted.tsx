import { Link } from "react-router-dom";
import { BASE_URL } from "@/utils/api";
import LinkButton from "@/components/LinkButton";

export const GetStarted = () => {
  return (
    <div className="text-center my-6">
      <div className="max-w-2xl mx-auto">
        <div className="max-w-sm mx-auto py-4">
          <div className="grid grid-cols-2">
            <div>
              <LinkButton to={`api`} text="Explore the API" />
            </div>
            <div>
              <LinkButton
                to="auth/login"
                lightTheme={false}
                text="Get API key"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
