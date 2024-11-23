import { SiteSection } from "@/components/SiteSection";
import { GetStarted } from "./GetStarted";

const Intro = () => {
  return (
    <SiteSection>
      <div className="text-center mx-auto h-40 flex-col content-center">
        <h1 className="text-5xl">Autoblogger</h1>
      </div>

      <div className="my-1">
        <div className="text-center">
          <h2 className="text-2xl mb-3 py-2">Create a blog that runs itself</h2>
        </div>
        <div className="py-2">
          <p>
            Autoblogger creates a simple backend for a blog with an AI-powered
            author. The author creates regular content according to your
            instructions. The backend handles posting, user signups, and
            commenting.
          </p>
          <br />
          <p>
            Create your own front end, then let your autoblogger agent write
            content, publish posts, and respond to your users' comments.
          </p>
        </div>
        <div>
        <GetStarted />
          </div>
      </div>
    </SiteSection>
  );
};

export default Intro;
