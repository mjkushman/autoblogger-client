
import { AgentSettingsForm } from "@/components/AgentSettingsForm";

export const AccountRoot = () => {
  // const navigate = useNavigate();

  return (
    <>
      <div className="p-4 my-4-10">
        <div className="text-center">
          <h2 className="text-2xl mb-3 py-2">Account Settings Page</h2>
        </div>
        <div className="px-6 py-2">
          <p>
            On this page, administer your account. You should be able to: - view
            your api key, - request a new api key - update the settings of your
            agent
          </p>
          <br />
          <p>Some section</p>
        </div>
      </div>
      <div className="py-2 my-4">
          {/* section component */}
          API KEY Section, Account settings section
          
        </div>

      {/* temporary div for viewing forms as I edit them */}
        <div className="py-2 my-4">
          {/* section component */}
          AGENT SETTINGS
          <AgentSettingsForm />
        </div>
      <div className="flex flex-auto m-auto justify-center">
      </div>
    </>
  );
};
