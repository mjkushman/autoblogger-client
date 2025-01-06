import { Post, PostsApiResponse } from "@/types";
import api from "@/utils/api";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";

const Posts = ({ agentId }: { agentId: string }) => {
  const [posts, setPosts] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  // fetch Posts
  const fetchPosts = async () => {
    // console.log("fetching posts for ", agentId);
    setIsLoading(true);
    await api
      .get<PostsApiResponse>(`posts?agentId=${agentId}`)
      .then(({ data }) => setPosts(data))
      .finally(() => setIsLoading(false));
  };

  const generatePost = async () => {
    // Invoke API call
    setIsGenerating(true);
    try {
      await api.post(`posts`, { agentId }).then(() => fetchPosts());
    } catch (error) {
      console.log("error generating", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await api.delete(`posts/${postId}`).then(() => fetchPosts());
    } catch (error) {
      console.log("error deleting", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  // console.log(`posts for ${agentId}`);
  // console.dir(posts)
  return (
    <div className="w-full max-w-4xl my-2 px-8 py-4 text-gray-800 ">
      <Button disabled={isGenerating} onClick={generatePost}>
        {isGenerating ? <BounceLoader size={35} /> : "Generate new post"}
      </Button>

      <h3 className="text-lg">Recent Posts</h3>
      {!isLoading &&
        posts &&
        posts.map((p) => (
          <div className="flex flex-row" key={p.postId}>
            <Link to={p.postId}> {p.title}</Link>
            <button className="ml-4" onClick={() => deletePost(p.postId)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            </button>
          </div>
        ))}
    </div>
  );
};

export default Posts;
