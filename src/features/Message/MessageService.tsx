import axios from "axios";
import { getMsgsHost, sendMsgHost } from "../../Utils/constants";

type fetchMsgProps = {
  userId: string;
  selectedId: string;
};

type sendMsgProps = {
  message: { text: string; time_stamp: string };
  sender: string | undefined;
  reciever: string | undefined;
};
const fetchMsgs = async ({ userId, selectedId }: fetchMsgProps) => {
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

const sendMsg = async ({ message, sender, reciever }: sendMsgProps) => {
  try {
    const response = await axios.post(sendMsgHost, {
      message,
      sender,
      reciever,
    });
    // console.log(response.data);

    return response.data;
  } catch (error) {
    return null;
  }
};

const messageService = { fetchMsgs, sendMsg };
export default messageService;
