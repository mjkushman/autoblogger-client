import { Post, PostsApiResponse } from "@/types";
import api, { ApiError } from "@/utils/api";
import { Button, ConfirmDialog, Tooltip } from "@/components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

const newestFirst = (posts: Post[]) =>
  [...posts].sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());

const Posts = ({ agentId }: { agentId: string }) => {
  const [posts, setPosts] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);

  const fetchPosts = async () => {
    await api
      .get<PostsApiResponse>(`posts?agentId=${agentId}`)
      .then(({ data }) => setPosts(newestFirst(data)))
      .catch(() => setPosts([]))
      .finally(() => setIsLoading(false));
  };

  const generatePost = async () => {
    setIsGenerating(true);
    setGenerateError(null);
    try {
      await api.post(`posts`, { agentId });
      await fetchPosts();
      setPage(1);
    } catch (error) {
      // The server's 400 messages say what to fix (bad key, unknown model, quota…)
      setGenerateError(
        error instanceof ApiError && error.status === 400
          ? error.message
          : "We couldn't write a post just now. Please try again in a moment."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const deletePost = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    try {
      await api.delete(`posts/${postToDelete.postId}`);
      await fetchPosts();
      setPostToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil((posts?.length ?? 0) / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages); // deleting the last row of a page falls back to the previous one
  const visiblePosts = posts?.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE) ?? [];

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border-t border-gray-100 px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Recent posts</h4>
          <p className="text-sm text-gray-500">
            {isGenerating
              ? "Writing a new post. This can take up to a minute."
              : "Posts appear here as this author writes them."}
          </p>
        </div>
        <Tooltip label="Write a post right now using this agent's settings, without waiting for its schedule.">
          <Button variant="secondary" loading={isGenerating} onClick={generatePost}>
            {isGenerating ? "Writing…" : "Write a post now"}
          </Button>
        </Tooltip>
      </div>

      {generateError && (
        <p role="alert" className="mt-3 text-sm text-rose-700 animate-fade-in">
          {generateError}
        </p>
      )}

      <div className="mt-4">
        {isLoading ? (
          <div className="space-y-2" aria-hidden="true">
            <div className="h-11 animate-pulse rounded-lg bg-gray-100" />
            <div className="h-11 animate-pulse rounded-lg bg-gray-100" />
          </div>
        ) : posts && posts.length > 0 ? (
          <>
          <ul className="divide-y divide-gray-100 overflow-hidden rounded-xl ring-1 ring-gray-200">
            {visiblePosts.map((p) => (
              <li
                key={p.postId}
                className="group flex items-center justify-between gap-4 bg-white px-4 py-3 transition-colors hover:bg-violet-50/60"
              >
                <Link to={p.postId} className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-gray-900 transition-colors group-hover:text-violet-800">
                    {p.title}
                  </span>
                  {p.createdAt && (
                    <span className="text-xs text-gray-500">{formatDate(p.createdAt)}</span>
                  )}
                </Link>
                <Tooltip label="Delete post">
                  <button
                    onClick={() => setPostToDelete(p)}
                    aria-label={`Delete post: ${p.title}`}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </Tooltip>
              </li>
            ))}
          </ul>
          {totalPages > 1 && (
            <nav aria-label="Posts pagination" className="mt-3 flex items-center justify-between text-sm text-gray-600">
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
                  Previous
                </Button>
                <Button variant="secondary" size="sm" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>
                  Next
                </Button>
              </div>
            </nav>
          )}
          </>
        ) : (
          <p className="rounded-xl border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500">
            No posts yet. Use “Write a post now” to see what this author can do.
          </p>
        )}
      </div>

      <ConfirmDialog
        open={!!postToDelete}
        title="Delete this post?"
        description={
          <>
            “{postToDelete?.title}” and its comments will be permanently deleted. This can't be undone.
          </>
        }
        confirmLabel="Delete post"
        loading={isDeleting}
        onConfirm={deletePost}
        onClose={() => !isDeleting && setPostToDelete(null)}
      />
    </div>
  );
};

export default Posts;
