import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest, getRequest, baseUrl } from "../services/userService";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [userChatError, setUserChatError] = useState(null);
  const [userChatLoading, setUserChatLoading] = useState(false);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [messageLoading, setMessageLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  //connect to socket.io
  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  //add online users using socket.io
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  //send message
  useEffect(() => {
    if (socket === null) return;
    const recipientId = currentChat?.members?.find((id) => id !== user?._id);
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  //receive message
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      if (currentChat?.id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    getUsers();
  }, [userChats]);

  useEffect(() => {
    if (user?._id) {
      getUserChat();
    }
  }, [user]);

  useEffect(() => {
    getMessages();
  }, [currentChat]);

  const getUsers = async () => {
    const res = await getRequest(`${baseUrl}/users`);
    if (res?.error) {
      return console.log("Error fetching users", res);
    }

    const pChats = res.filter((u) => {
      let isChatCreated = false;
      if (user?._id === u?._id) return false;
      if (userChats) {
        isChatCreated = userChats?.some((chat) => {
          return chat.members[0] === u._id || chat.members[1] === u._id;
        });
      }
      return !isChatCreated;
    });

    setPotentialChats(pChats);
  };

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

  const getMessages = async () => {
    setMessageLoading(true);
    setMessageError(null);

    const res = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);
    setMessageLoading(false);
    if (res?.error) {
      return setMessageError(res);
    }
    setMessages(res);
  };

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You must type something...");

      const response = await postRequest(
        `${baseUrl}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          text: textMessage,
        })
      );
      if (response?.error) {
        return setSendTextMessageError(response);
      }
      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({ firstId, secondId })
    );
    if (response.error) {
      return console.log("Error creating chat", response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        userChatLoading,
        userChatError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        messageLoading,
        messageError,
        sendTextMessage,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
