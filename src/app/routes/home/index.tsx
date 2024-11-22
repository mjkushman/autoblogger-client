import { BlogExamples } from "@/app/routes/home/BlogExamples";
import { GetStarted } from "@/app/routes/home/GetStarted";
import HowItWorks from "./HowItWorks";
import Intro from "./Intro";

export const HomeRoute = () => {
  // const navigate = useNavigate();

  return (
    <>
      <Intro/>
      <GetStarted />
      <HowItWorks />

      <BlogExamples />
    </>
  );
};
