import axios from "axios";
import { getMsgsHost, sendMsgHost } from "../../Utils/constants";

type fetchMsgProps = {
  userId: string;
  selectedId: string;
};

type sendMsgProps = {
  text: string | undefined;
  sender: string | undefined;
  reciever: string | undefined;
};
const fetchMsgs = async ({ userId, selectedId }: fetchMsgProps) => {
  if (!(userId == undefined || selectedId === undefined)) {
    const response = await axios.post(getMsgsHost, {
      from: userId,
      to: selectedId,
    });
    if (response.status === 200) return response.data;
    return null;
  }
};

const sendMsg = async ({ text, sender, reciever }: sendMsgProps) => {
  const response = await axios.post(sendMsgHost, {
    text,
    sender,
    reciever,
  });

  if (response.status === 200) return response.data;

  return null;
};

const messageService = { fetchMsgs, sendMsg };
export default messageService;
