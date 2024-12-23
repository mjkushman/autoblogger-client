import { useEffect, useState } from "react";
import * as jose from "jose";
import { User } from "@/types";
import { Loading } from "../components/Loading";
import UserContext from "@/app/contexts/UserContext"

type Props = {
  children: React.ReactNode;
};




const UserProvider = ({ children }: Props) => {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);


  useEffect(() => {
    const updateUser = async () => {
      console.log('updating user based on token', token)
      
      if (token) {
        setIsLoading(true);
        console.log('updating user based on token', token)
        // verify and set user if good
        await jose
          .jwtVerify<User>(token, secret)
          .then(
            ({ payload }) => {
              setUser(payload);
              console.log("SETTING USER TO PAYLOAD:", payload);
            },
            (error: jose.errors.JOSEError) => {
              console.log("error setting user: ", error);
              if (error instanceof jose.errors.JWTExpired) {
                // TODO: add logic to refresh token
                // console.log("token expired. Do logic to refresh token.");
              } else setUser(null);
            }
          )
          .finally(() => setIsLoading(false));
      } else {
        setUser(null); // if no token, erase the user from context
      }
    };
    updateUser();
  }, [token]);

  if(isLoading) return <Loading />
  return (
    <UserContext.Provider value={{ user, setToken }}>
      {" "}
      {children} 
    </UserContext.Provider>
  );
};

export default UserProvider;
