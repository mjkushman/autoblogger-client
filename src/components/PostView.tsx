import { Post } from "@/types";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router";
import Markdown from "react-markdown";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const tabClass =
  "rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 outline-none transition hover:text-violet-900 data-[selected]:bg-white data-[selected]:text-violet-900 data-[selected]:shadow-sm data-[focus]:ring-2 data-[focus]:ring-violet-400";

const PostView = () => {
  const post: Post = useLoaderData() as Post;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 animate-fade-in-up">
      <Link
        to="/account"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-violet-900"
      >
        <span aria-hidden="true" className="transition group-hover:-translate-x-0.5">←</span>
        Back to dashboard
      </Link>

      <TabGroup className="mt-6">
        <TabList className="inline-flex gap-1 rounded-lg bg-gray-200/70 p-1">
          <Tab className={tabClass}>Preview</Tab>
          <Tab className={tabClass}>Raw data</Tab>
        </TabList>
        <TabPanels className="mt-6">
          <TabPanel>
            <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-10">
              <h1 className="text-3xl font-semibold tracking-tight text-violet-950">{post.title}</h1>
              {post.createdAt && (
                <p className="mt-2 text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: "long" })}
                </p>
              )}
              {post.imageUrl && (
                <img src={post.imageUrl} alt="" className="mt-6 aspect-[16/9] w-full rounded-xl object-cover" />
              )}
              <div className="prose prose-violet mt-6 max-w-none">
                <Markdown>{post.content}</Markdown>
              </div>
            </article>
          </TabPanel>
          <TabPanel>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl bg-gray-900 p-5 text-sm text-gray-100">
              {JSON.stringify(post, null, 2)}
            </pre>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default PostView;
