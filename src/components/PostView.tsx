import { Post } from "@/types";
import { useState } from "react";
import { useLoaderData } from "react-router";
import Markdown from "react-markdown";

const PostView = () => {
  const post: Post = useLoaderData() as Post;

  const postJson = JSON.stringify(post, null, 2);
  const [format, setFormat] = useState(false);
  const handleFormat = () => {
    setFormat(!format);
  };

  return (
    <div className="max-w-5xl p-10 m-auto">
      <button
        onClick={handleFormat}
        className="border-solid border-b-4 p-2 my-2 border-violet-900 hover:shadow-md"
      >
        {format ? "View JSON" : "View formatted content"}
      </button>
      <div className="overflow-x-hidden">
        {format ? (
          <article className="prose mx-auto mt-10 max-w-4xl">
            {" "}
            <Markdown>{post.content}</Markdown>
          </article>
        ) : (
          <pre className="text-sm whitespace-pre-wrap">{postJson}</pre>
        )}
      </div>
    </div>
  );
};

export default PostView;
