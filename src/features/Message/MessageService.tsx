import axios from "axios";
import { getMsgsHost, sendMsgHost } from "../../Utils/constants";
import { fetchMessagesgProps, sendMessageProps } from "../../Types/types";

const fetchMsgs = async ({ userId, selectedId }: fetchMessagesgProps) => {
  try {
    const response = await axios.post(getMsgsHost, {
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
    const response = await axios.post(sendMsgHost, {
      message,
      senderId,
      recieverId,
    });
    // console.log(response.data);

    return response.data;
  } catch (error) {
    return null;
  }
};

const messageService = { fetchMsgs, sendMsg };
export default messageService;
