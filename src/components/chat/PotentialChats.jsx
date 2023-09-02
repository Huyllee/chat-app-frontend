import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";

const PotentialChats = () => {
  const { user } = useContext(UserContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  return (
    <>
      <div className="all-users">
        {potentialChats?.map((u, index) => (
          <div
            className="single-user"
            key={u._id}
            onClick={() => createChat(user._id, u._id)}
          >
            {u.name}
            <span
              className={
                onlineUsers?.some((user) => user?.userId === u._id)
                  ? "user-online"
                  : ""
              }
            ></span>
          </div>
        ))}
      </div>
    </>
  );
};

export default PotentialChats;
