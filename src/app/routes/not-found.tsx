import { Link } from "react-router-dom";

export const NotFoundRoute = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Sorry, that page doesn't exist.</p>
      <Link to='/' replace>Take me home</Link>
    </div>
  );
};
