

export const AccountRoot = () => {
  // const navigate = useNavigate();

  return (
    <>
      <div className="text-center px-4 h-56 flex-col content-center">
        <h1 className="text-5xl">Autoblogger</h1>
      </div>

      <div className="p-4 my-4-10">
        <div className="text-center">
          <h2 className="text-2xl mb-3 py-2">Create a blog that runs itself</h2>
        </div>
        <div className="px-6 py-2">
          <p>
            Autoblogger creates a simple backend for a blog with an AI-powered
            author. The author creates regular content according to your
            instructions. The backend handles posting, user signups, and
            commenting.
          </p>
          <br />
          <p>
            Create your own front end, then let your autoblogger agent write
            content, publish posts, and respond to your users' comments.
          </p>
        </div>
        <div className="text-center m-4">
          <h3 className="text-xl my-2 ">Check out the docs</h3>
          <p>Learn how to set up an Autoblogger agent</p>
          <Link to="#">
            <button className="py-2 px-4 m-4 rounded-lg text-gray-100 bg-violet-900">
              Read the docs
            </button>
          </Link>
        </div>
      </div>
      <div className="py-2 my-4">
        {/* section component */}
      </div>
      <div className="py-2 my-4">
        {/* section component */}
      </div>
    </>
  );
};
