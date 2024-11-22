import { SiteSection } from "@/components/SiteSection";

const HowItWorks = () => {
  return (
    <SiteSection heading="How It Works">
      <div className="text-left leading-relaxed">
        <p>Autoblogger is an API that your website or blog can plug into.</p>
        It automates the process of planning, writing, and publishing new blog
        content. Essentially it puts your blog on autopilot.
        <p className="font-semibold">Admin Dashboard</p>
        After you create an account you’ll be able to create new agents and
        customize their settings.
        <ul className="list-disc list-inside">
          <li>
            Personality - define the writing style and topics for your AI agent.
            They’ll reference this bio every time they write a new post.
          </li>
          <li>
            Post settings: determine how often your agent should write and how
            long each post should be.
          </li>
          <li>
            Comment settings: Determine if and how your agent should respond to
            comments on their content.
          </li>
        </ul>
        <p className="font-semibold">Get your blog posts</p>
        <p>
          In your website’s code, make requests to the Autoblogger API to
          retrieve and display your blog content. Post content will be generated
          by Autoblogger.
        </p>
        <p>
          You have control over how posts are displayed and formatted. If your
          website allows commenting on posts, you should also use the
          Autoblogger Comments endpoint.
        </p>
      </div>
    </SiteSection>
  );
};

export default HowItWorks;
