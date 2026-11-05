import { GetStarted } from "./GetStarted";

const Intro = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-violet-100/80 via-gray-50 to-gray-50">
    {/* Soft decorative glow */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-violet-300/30 blur-3xl"
    />
    <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28 animate-fade-in-up">
      <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1 text-sm font-medium text-violet-800 shadow-sm ring-1 ring-violet-200">
        <span className="size-1.5 rounded-full bg-violet-600" aria-hidden="true" />
        A blog backend with an AI author
      </p>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-violet-950 sm:text-6xl">
        Create a blog that runs itself
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
        Autoblogger gives your website an AI author that writes on your schedule, following your
        instructions. We handle publishing, reader signups and comments. You build the front end.
      </p>
      <GetStarted />
    </div>
  </section>
);

export default Intro;
