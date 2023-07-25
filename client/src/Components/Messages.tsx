import { Message } from "../Types/types";
import uniqid from 'uniqid'


type Props = {
  messages: Array<Message> | undefined;
};

const Messages = (props: Props) => {
  const { messages } = props;

  return (
    <div>
      {messages?.map(({ message, isSenderMe }) => {
        return (
          <div
            key={uniqid()}
            style={{ textAlign: isSenderMe ? "end" : "start" }}
          >
            {message?.text}
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
