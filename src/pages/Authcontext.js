import { createContext, useContext, useState } from "react";



const UserContext = createContext();

export const AuthContextProvider = ({ children }) =>{
    const [count, setcount] = useState();
    const [favlist,setfavlist] = useState();

   



    return (
        <UserContext.Provider
          value={{
           count,setcount,
           favlist,setfavlist,
          }}
        >
          {children}
        </UserContext.Provider>
      );
    };
    
export const UserAuth = () => {
    return useContext(UserContext);
  };