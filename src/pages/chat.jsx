import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { UserContext } from "../context/UserContext";

const Chat = () => {
  const { user } = useContext(UserContext);
  const { userChats, userChatError, userChatLoading } = useContext(ChatContext);

  return (
    <Container>
      {userChats?.length > 0 ? (
        <Stack direction="horizontal" className="align-items-start" gap={4}>
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {userChatLoading && <p>Loading chats...</p>}
            {userChats?.map((chat, index) => (
              <div key={index}>
                <UserChat chat={chat} user={user} />
              </div>
            ))}
          </Stack>
          <p>ChatBox</p>
        </Stack>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Chat;
