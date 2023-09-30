import axios from "axios";
import { getMsgsRoute, sendMsgRoute } from "../../Utils/constants";
import { fetchMessagesgProps, sendMessageProps } from "../../Types/types";

const fetchMsgs = async ({ userId, selectedId }: fetchMessagesgProps) => {
  try {
    const response = await axios.post(getMsgsRoute, {
      from: userId,
      to: selectedId,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

const sendMsg = async ({ message, senderId, recieverId }: sendMessageProps) => {
  try {
    const response = await axios.post(sendMsgRoute, {
      message,
      senderId,
      recieverId,
    });

    return response.data;
  } catch (error) {
    return null;
  }
};

const messageService = { fetchMsgs, sendMsg };
export default messageService;
