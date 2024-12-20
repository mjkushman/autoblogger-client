import { Post } from "@/types";
import { useLoaderData } from "react-router";

const PostView = () => {
  const post: Post = useLoaderData();

  const postJson = JSON.stringify(post, null, 2);

  return (
    <div className="max-w-5xl p-10 m-auto">
      <pre className="text-sm whitespace-pre-wrap">{postJson}</pre>
    </div>
  );
};

export default PostView;
