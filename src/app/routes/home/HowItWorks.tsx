import { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import shell from "react-syntax-highlighter/dist/esm/languages/hljs/shell";
import ocean from "react-syntax-highlighter/dist/esm/styles/hljs/ocean";

import { SiteSection } from "@/components/SiteSection";
import { LinkButton, Tooltip } from "@/components";
import { BASE_URL } from "@/utils/api";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("shell", shell);

const snippets = [
  {
    label: "JavaScript",
    language: "javascript",
    code: `const response = await fetch('${BASE_URL}api/v1/posts', {
  headers: { 'x-api-key': 'YOUR_API_KEY' },
});
const { data } = await response.json();`,
  },
  {
    label: "cURL",
    language: "shell",
    code: `curl -H "x-api-key: YOUR_API_KEY" "${BASE_URL}api/v1/posts"`,
  },
];

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Tooltip label={copied ? "Copied!" : "Copy to clipboard"}>
      <button
        onClick={copy}
        aria-label="Copy code"
        className="rounded-md px-2.5 py-1 text-xs font-medium text-violet-200 transition hover:bg-white/10 hover:text-white"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </Tooltip>
  );
};

const Step = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm transition hover:border-white/20 sm:p-8">
    <div className="flex items-center gap-3">
      <span className="grid size-8 place-items-center rounded-full bg-violet-500 text-sm font-semibold text-white">
        {number}
      </span>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <div className="mt-4 leading-7 text-violet-100">{children}</div>
  </div>
);

const HowItWorks = () => (
  <SiteSection
    heading="How it works"
    subheading="Set up an author once. Fetch its posts whenever you like."
    bgColor="bg-violet-950"
    textColor="text-gray-100"
  >
    <div className="mx-auto max-w-3xl space-y-6">
      <Step number={1} title="Set up your Author Agents">
        <p>Create an account and configure one or more agents to author your blog.</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 marker:text-violet-400">
          <li>Describe voice, writing style and the topics your agents should cover.</li>
          <li>Choose how often new posts are written.</li>
          <li>Decide whether your agents should reply to reader comments.</li>
        </ul>
      </Step>

      <Step number={2} title="Show its posts on your site">
        <p>
          Request your posts from the Autoblogger API and display them however you like. If your
          site has comments, use the Comments endpoint too.
        </p>
        <TabGroup className="mt-5 overflow-hidden rounded-xl bg-[#1b2631] ring-1 ring-white/10">
          <div className="flex items-center justify-between border-b border-white/10 px-2 py-1.5">
            <TabList className="flex gap-1">
              {snippets.map(({ label }) => (
                <Tab
                  key={label}
                  className="rounded-md px-3 py-1 text-sm font-medium text-violet-200 outline-none transition hover:text-white data-[selected]:bg-white/10 data-[selected]:text-white data-[focus]:ring-2 data-[focus]:ring-violet-400"
                >
                  {label}
                </Tab>
              ))}
            </TabList>
          </div>
          <TabPanels>
            {snippets.map(({ label, language, code }) => (
              <TabPanel key={label} className="relative p-4 text-sm">
                <div className="absolute right-2 top-2">
                  <CopyButton text={code} />
                </div>
                <SyntaxHighlighter
                  language={language}
                  style={ocean}
                  customStyle={{ background: "transparent", margin: 0, padding: 0 }}
                >
                  {code}
                </SyntaxHighlighter>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </Step>

      <div className="flex justify-center pt-2">
        <LinkButton to="/api" variant="secondary" size="lg">
          Explore the API
        </LinkButton>
      </div>
    </div>
  </SiteSection>
);

export default HowItWorks;
