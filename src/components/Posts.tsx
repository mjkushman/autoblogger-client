import { Post, PostsApiResponse } from "@/types";
import api from "@/utils/api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

const Posts = ({ agentId }: { agentId: string }) => {
  const [posts, setPosts] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(false);
  // fetch Posts
  const fetchPosts = async () => {
    console.log("fetching posts for ", agentId);
    setIsLoading(true);
    await api
      .get<PostsApiResponse>(`posts?agentId=${agentId}`)
      .then(({ data }) => setPosts(data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {

    fetchPosts();

  }, []);

  return (
    <div className="w-full max-w-4xl my-2 px-8 py-4 text-gray-800 ">
      <h3 className="text-lg">Recent Posts</h3>
      {!isLoading &&
        posts &&
        posts.map((p) => (
          <div className="flex flex-row" key={p.postId}>
            <Link to={p.postId}> {p.title}</Link>
          </div>
        ))}
    </div>
  );
};

export default Posts;
