import uniqid from "uniqid";
import { useAppSelector } from "../hooks/useTypedSelector";
import { MsgState } from "../features/Message/MessageSlice";

const Messages = () => {
  const { coversation } = useAppSelector(MsgState);

  return (
    <div className="message-container">
      {coversation?.map((messages) => {
        if (messages) {
          const { message, isSenderMe } = messages;
          return (
            <div
              key={uniqid()}
              className={`display-flex justify-content-${
                isSenderMe ? "right" : "left"
              }`}
            >
              <div className="message">
                {message === null ? "loading" : message?.text}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Messages;
