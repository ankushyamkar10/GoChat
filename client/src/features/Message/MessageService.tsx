import axios from "axios";
import { getMsgsHost, sendMsgHost } from "../../Utils/constants";

type fetchMsgProps = {
  userId: string | undefined;
  selectId: string | undefined;
};

type sendMsgProps = {
  text: string | undefined;
  sender: string | undefined;
  reciever: string | undefined;
};
const fetchMsgs = async ({ userId, selectId }: fetchMsgProps) => {
  if (!(userId == undefined || selectId === undefined)) {
    const response = await axios.post(getMsgsHost, {
      from: userId,
      to: selectId,
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

const messageService = { fetchMsgs,sendMsg };
export default messageService;
