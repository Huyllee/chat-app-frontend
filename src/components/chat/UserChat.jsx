import React from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import Avatar from "../../assets/images/avatar.svg";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);

  return (
    <Stack
      className="user-card align-items-center p-2 justify-content-between"
      direction="horizontal"
      gap={3}
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={Avatar} height="35px" alt="avatar" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">31/08/2023</div>
        <div className="this-user-notifications">2</div>
        <span className="user-online"></span>
      </div>
    </Stack>
  );
};

export default UserChat;
