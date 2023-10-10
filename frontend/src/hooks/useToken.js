import { useState } from "react";

function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString);
    return token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    if (!token) {
      sessionStorage.clear();
      setToken();
      return;
    }
    sessionStorage.setItem("token", JSON.stringify(token));
    setToken(token);
  };

  return {
    setToken: saveToken,
    token,
  };
}

export default useToken;
