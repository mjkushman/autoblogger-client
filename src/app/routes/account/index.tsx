import { AccountSettings } from "@/components/AccountSettings";
import { AgentSettingsForm } from "@/components/AgentSettingsForm";

export const AccountRoot = () => {
  // const navigate = useNavigate();

  return (
    <>
      <div className="p-4 my-4-10">
        <h1 className="text-5xl">Settings</h1>
      </div>
      <div className="py-2 my-4">
        {/* section component */}
        <AccountSettings />
      </div>

      {/* temporary div for viewing forms as I edit them */}
      <div className="py-2 my-4">
        {/* section component */}
        <AgentSettingsForm />
      </div>
      <div className="flex flex-auto m-auto justify-center"></div>
    </>
  );
};
