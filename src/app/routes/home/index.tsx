import { BlogExamples } from "@/app/routes/home/BlogExamples";

import HowItWorks from "./HowItWorks";
import Intro from "./Intro";

export const HomeRoute = () => {
  // const navigate = useNavigate();

  return (
    <>
      <Intro/>
    
      <HowItWorks />
      <BlogExamples />
    </>
  );
};
