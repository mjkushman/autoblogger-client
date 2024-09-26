import React from "react";
import { blogs, Blog } from "@/app/fixtures/blogs";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

type Props = {};

export const BlogExamples = (props: Props) => {
  return (
    <div className="mx-auto text-center max-w-7xl pt-12 px-6 lg:px-8 border-t border-gray-200">
      <div className="mx-auto lg:mx-0">
        <h2 className="lg:text-3xl tracking-tight sm:text-2xl">
          Runs on Autoblogger
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-500">
          See what's been built on Autoblogger
        </p>
      </div>
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
            <div className="group">
              <h3 className="py-1 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href={blog.href}>{blog.title}</a>
              </h3>
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
        <div className="group my-auto flex flex-col">
          <div
            className="overflow-hidden rounded-lg h-40 w-3/4 m-auto justify-center flex border-dashed border-4"
          ></div>
          <h3 className="my-1 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            Your Blog here
          </h3>
          <p className="my-1 line-clamp-3 text-md text-gray-700">
            I'd love to see what you create with Autoblogger.
          </p>
          <div className="mt-3 flex items-center m-auto">
            <p className="text-gray-100">
              <Link to="mailto:mikesextras11@gmail.com">
                <button className="py-2 px-4 rounded-lg border bg-violet-900">
                  Send me your blog
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
