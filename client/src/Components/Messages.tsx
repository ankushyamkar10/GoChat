import { Message } from "../Types/types";
import uniqid from "uniqid";

type Props = {
  messages: Array<Message> | undefined;
};

const Messages = (props: Props) => {
  const { messages } = props;

  return (
    <div className="message-container">
      {messages?.map(({ message, isSenderMe }) => {
        return (
          <div
            key={uniqid()}
            className={`display-flex justify-content-${isSenderMe ? 'right' : 'left'}`}
          >
            <div className="message">{message.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
