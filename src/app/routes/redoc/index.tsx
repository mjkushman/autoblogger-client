import { RedocStandalone } from "redoc";
import { BASE_URL } from "@/utils/api";


export const Redoc = () => {
  const specUrl:string = `${BASE_URL}api.json`;
  return (
    <RedocStandalone
      specUrl={specUrl}
      options={{
        theme: { colors: { primary: { main: "#4c1d95" } } },
      }}
    />
  );
};
