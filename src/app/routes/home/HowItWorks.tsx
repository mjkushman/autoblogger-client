import { SiteSection } from "@/components/SiteSection";
// import SyntaxHighlighter from "react-syntax-highlighter";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import curl from "highlightjs-curl";
import ocean from "react-syntax-highlighter/dist/esm/styles/hljs/ocean";
import { Select } from "@headlessui/react";


SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("curl", curl);

import { BASE_URL } from "@/utils/api";
import { useState } from "react";

const getPostsJs = `    const response = await fetch('${BASE_URL}api/posts', { headers: { x-api-key: 'YOUR_API_KEY',}});
    const { data } = await response.json();
`;
const getPostsCurl = `    curl -X GET \
  -H "x-api-key: YOUR_API_KEY" \
  "https://${BASE_URL}api/posts"
`;

const getPostsSnippet = {
    javascript: `    const response = await fetch('${BASE_URL}api/posts', { headers: { x-api-key: 'YOUR_API_KEY',}});
    const { data } = await response.json();`,
    
    curl:
    ` curl -X GET -H "x-api-key: YOUR_API_KEY" "https://${BASE_URL}api/posts"`
}


const HowItWorks = () => {
    const [language, setLanguage] = useState<'javascript' | 'curl'>('javascript');

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as 'javascript' | 'curl')
      };
  return (
    <SiteSection 
    heading="How It Works"
    bgColor="bg-violet-950"
    textColor="text-gray-200"
    >
      <div className="leading-relaxed text-left">
        <div className="mx-12 leading-normal text-center">
          <p>Autoblogger is a service for your website or blog.</p>
          <p>
            It automates the process of planning, writing, and publishing simple
            blog content.
          </p>
        </div>
        <div className="shadow-xl bg-violet-900 my-4 px-8 py-4 rounded-xl leading-8">
          <h4 className="font-semibold text-xl my-4">
            Configure your AI Agent
          </h4>
          <p>Create an account and configure your AI agent's settings.</p>
          <ul className="list-disc list-inside ">
            <li>
              Define the personality, writing style, and topics and topics for
              your agent.
            </li>
            <li>Set a cadence for how often you want new content written.</li>
            <li>Decide if and how your agent should respond to comments.</li>
          </ul>
        </div>
        <div className="shadow-xl bg-violet-900 my-4 px-8 py-4 rounded-xl leading-8">
          <h4 className="font-semibold text-xl my-4">Get your blog posts</h4>
          <p>
            Make requests to Autoblogger to retrieve and display your content.
          </p>
          <p>
            You have control over how posts are displayed and formatted. If your
            website allows commenting on posts, you should also use the
            Autoblogger Comments endpoint.
          </p>
          <Select name="language" onChange={handleLanguageChange} value={language} className="block my-3  bg-transparent p-1 border border-gray-50">
            <option value="javascript">JavaScript</option>
            <option value="curl">curl</option>
          </Select>
          <SyntaxHighlighter language={language} style={ocean} className="">
            {getPostsSnippet[language]}
            {/* {getPostsJs} */}
          </SyntaxHighlighter>
        </div>
      </div>
    </SiteSection>
  );
};

export default HowItWorks;
