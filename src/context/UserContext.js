import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest, baseUrl } from "../services/userService";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setRegisterError(null);
      setRegisterLoading(true);

      let res = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      );
      setRegisterLoading(false);

      if (res && res.error) {
        return setRegisterError(res);
      }

      setUser(res);
      localStorage.setItem("user", JSON.stringify(res));
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setLoginLoading(true);
      setLoginError(null);

      let res = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );

      setLoginLoading(false);

      if (res && res.error) {
        return setLoginError(res);
      }

      setUser(res);
      localStorage.setItem("user", JSON.stringify(res));
    },
    [loginInfo]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((data) => {
    setLoginInfo(data);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        registerInfo,
        registerUser,
        updateRegisterInfo,
        updateLoginInfo,
        registerError,
        registerLoading,
        loginError,
        loginLoading,
        loginInfo,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
