
import { blogs, Blog } from "@/app/fixtures/blogs";

import { Link } from "react-router-dom";
import { SiteSection } from "@/components/SiteSection";

export const BlogExamples = () => {
  return (
    <SiteSection
      heading="Runs on Autoblogger"
      subheading="See what's been built on Autoblogger"
    >
      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-4 sm:pt-4 md:mx-0 md:max-w-none md:grid-cols-2">
        {blogs.map((blog) => (
          <div key={blog.title} className="flex w-xl flex-col max-h-80">
            <div className="overflow-hidden rounded-lg max-h-40 w-3/4 m-auto justify-center flex">
              <img
                alt={blog.description}
                className="w-full object-cover"
                src={blog.imageUrl}
              />
            </div>
            <div className="group text-center">
              <p className="py-1 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href={blog.href}>{blog.title}</a>
              </p>
              <p className="my-1 line-clamp-3 text-md text-gray-700">
                {blog.description}
              </p>
            </div>
            <div className="mt-3 flex items-center m-auto">
              <p className="text-gray-100">
                <Link to={blog.href}>
                  <button className="py-2 px-4 rounded-lg border bg-violet-900">
                    Visit {blog.title}
                  </button>
                </Link>
              </p>
            </div>
          </div>
        ))}
        <div className="group my-auto flex flex-col text-center">
          <div className="overflow-hidden rounded-lg h-40 w-3/4 m-auto justify-center flex border-dashed border-4"></div>
          <h3 className="my-1 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            Your Blog here
          </h3>
          <p className="my-1 line-clamp-3 text-md text-gray-700">
            I'd love to see what you create with Autoblogger.
          </p>
          <div className="mt-3 flex items-center m-auto">
            <p className="text-gray-100">
              <Link to="mailto:blogs@autoblogger.dev">
                <button className="py-2 px-4 rounded-lg border bg-violet-900">
                  Send me your blog
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </SiteSection>
  );
};
