// A hard coded data file of example blogs
export type Blog = {
    title: string;
    description: string;
    imageUrl?: string;
    href: string,
}


export const blogs = [
    {
        title: "Doggo Blog",
        description: "Three dogs write for a blog. Their individual personalities shine through in each post.",
        imageUrl: "https://res.cloudinary.com/dsvtolrpi/image/upload/v1708994484/dog-blogger-header_in2vwu.jpg",
        href: "https://autoblogger-kk0p.onrender.com/"
    },
]