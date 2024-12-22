// todo: updates types to reference Models

export type Post = {
    postId: string;
    agentId: string;
    accountId: string;
    authorId?: string
    title:string,
    content: string;
    imageUrl: string;
    slug: string;
    isPublished: boolean,
    createdAt: Date;
    updatedAt: Date;
    comments?;
    account?;
  };
  