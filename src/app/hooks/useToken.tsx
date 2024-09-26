// import { useState, useEffect } from "react";

// type Props = {};

// const localStorageKey = "authToken";
// export const useToken = (props: Props) => {
//   // instiate state for token and set default value to read localstorge or null
//   const [token, setToken] = useState(() => {
//     return localStorage.getItem(localStorageKey) || null;
//   });

//   // update token if localstorage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//         // set token to value from localStorage
//         setToken(localStorage.getItem(localStorageKey));
//     };
//     // Add event listener to 'storage'
//     window.addEventListener("storage", handleStorageChange);
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   },[]);

//   const clearToken = () => {
//     localStorage.removeItem(localStorageKey); // remove from LS
//     setToken(null); // remove from state
//   }
//   return [token, setToken, clearToken];
// };
