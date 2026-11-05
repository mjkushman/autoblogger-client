import { blogs } from "@/app/fixtures/blogs";
import { SiteSection } from "@/components/SiteSection";
import { buttonClasses } from "@/components/Button";

export const BlogExamples = () => (
  <SiteSection heading="Runs on Autoblogger" subheading="See what's been built with it.">
    <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
      {blogs.map((blog) => (
        <a
          key={blog.title}
          href={blog.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:ring-violet-200"
        >
          <div className="aspect-[16/9] overflow-hidden bg-violet-100">
            <img
              alt={`${blog.title} homepage`}
              src={blog.imageUrl}
              className="size-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-lg font-semibold text-gray-900">{blog.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{blog.description}</p>
            <span className="mt-4 text-sm font-medium text-violet-800 transition group-hover:text-violet-950">
              Visit site <span aria-hidden="true" className="inline-block transition group-hover:translate-x-1">→</span>
            </span>
          </div>
        </a>
      ))}

      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-violet-300 hover:bg-violet-50/50">
        <h3 className="text-lg font-semibold text-gray-900">Your blog here</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Built something with Autoblogger? I'd love to see it.
        </p>
        <a
          href="mailto:mikesextras11+autoblogger@gmail.com?subject=Check%20out%20my%20blog"
          className={buttonClasses("secondary", "md", "mt-5")}
        >
          Send me your blog
        </a>
      </div>
    </div>
  </SiteSection>
);
