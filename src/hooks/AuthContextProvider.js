import React, { useState, createContext } from "react";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [token, setToken] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <AuthContext.Provider value={{ token, setToken, apicall, setapicall, searchText, setSearchText}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
