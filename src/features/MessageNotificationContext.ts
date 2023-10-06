import { createContext, useState } from "react";
import { MessageNotification } from "../Types/types";

export const MessageNotificationContext = createContext<MessageNotification>(
  {} as MessageNotification
);

const MessageNotificationProvider = () => {
  const [messagesNotifications, setMessagesNotifications] = useState<
    Array<string>
  >([]);
  return { messagesNotifications, setMessagesNotifications };
};
export default MessageNotificationProvider;
