import React, { useContext } from "react";
import { Stack } from "react-bootstrap";
import moment from "moment";
import { ChatContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const ChatBox = () => {
  const { user } = useContext(UserContext);
  const { currentChat, messages, messageLoading, messageError } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet...
      </p>
    );

  if (messageLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading Chats...</p>
    );

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages?.map((message, index) => (
          <Stack
            key={index}
            className={`${
              messages.senderId === user._id
                ? "message self align-self-end flex-grow-0"
                : "message align-self-start flex-grow-0"
            }`}
          >
            <span>{message.text}</span>
            <span className="message-footer">
              {moment(message.createdAt).calendar()}
            </span>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ChatBox;
