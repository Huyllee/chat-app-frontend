import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { UserContext } from "../context/UserContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(UserContext);
  const { userChats, updateCurrentChat, userChatLoading } =
    useContext(ChatContext);

  return (
    <Container>
      <PotentialChats />
      {userChats?.length > 0 ? (
        <Stack direction="horizontal" className="align-items-start" gap={4}>
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {userChatLoading && <p>Loading chats...</p>}
            {userChats?.map((chat, index) => (
              <div key={chat._id} onClick={() => updateCurrentChat(chat)}>
                <UserChat chat={chat} user={user} />
              </div>
            ))}
          </Stack>
          <ChatBox />
        </Stack>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Chat;
