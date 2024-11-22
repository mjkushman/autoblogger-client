import { Link } from "react-router-dom";
import { BASE_URL } from "@/utils/api";


export const GetStarted = () => {
  return (
    <div className="text-center m-4">
      <div>
        <h3 className="text-xl my-2 ">Get started with Autoblogger</h3>
      </div>

      <div className="max-w-sm mx-auto py-4">
        <div className="grid grid-cols-2 my-4">
          <div>
            <Link
              to={`${BASE_URL}docs`}
              className="py-2 px-2 m-4 rounded-lg text-violet-900 bg-none text-center"
            >
              Explore the API
            </Link>
          </div>
          <div>
            <Link
              to="auth/login"
              className="py-2 px-2 m-4 rounded-lg text-gray-100 bg-violet-900 text-center w-24"
            >
              Get API key
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
