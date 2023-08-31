import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest, getRequest, baseUrl } from "../services/userService";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [userChatError, setUserChatError] = useState(null);
  const [userChatLoading, setUserChatLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      getUserChat();
    }
  }, [user]);

  const getUserChat = async () => {
    setUserChatLoading(true);
    setUserChatError(null);

    const res = await getRequest(`${baseUrl}/chats/${user?._id}`);
    setUserChatLoading(false);
    if (res?.error) {
      return setUserChatError(res);
    }
    setUserChats(res);
  };

  return (
    <ChatContext.Provider value={{ userChats, userChatLoading, userChatError }}>
      {children}
    </ChatContext.Provider>
  );
};
