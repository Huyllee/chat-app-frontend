import { useEffect, useState } from "react";
import { getRequest, baseUrl } from "../services/userService";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members.find((id) => id !== user?._id);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    if (!recipientId) return;
    const res = await getRequest(`${baseUrl}/users/find/${recipientId}`);
    if (res.error) {
      return setError(error);
    }
    setRecipientUser(res);
  };

  return { recipientUser };
};
