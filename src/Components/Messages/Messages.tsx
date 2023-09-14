import uniqid from "uniqid";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { MsgState } from "../../features/Message/MessageSlice";
import { DataState } from "../../features/FetchData/FetchDataSlice";

type Props = {
  isGroup: Boolean;
};

const Messages = ({ isGroup }: Props) => {
  const { conversation } = useAppSelector(MsgState);
  const { users } = useAppSelector(DataState);
  console.log(conversation);

  return (
    <div className="message-container">
      {conversation.length > 0 &&
        conversation.map((messages) => {
          if (messages) {
            const { message, isSenderMe, sender } = messages;
            let img;
            if (isGroup) {
              img = users.filter((user) => user._id === sender);
              img = img.length === 1 ? img[0].img : undefined;
            }
            return (
              <div
                key={uniqid()}
                className={`display-flex items-center justify-content-${
                  isSenderMe ? "right" : "left"
                } `}
              >
                {isGroup && !isSenderMe && (
                  <img
                    src={img}
                    height={6}
                    width={6}
                    className="message-sender-img"
                  />
                )}
                <div
                  className={`message ${
                    isSenderMe ? "bg-senderMe" : "bg-SenderNotMe"
                  }`}
                >
                  {message !== null && message?.text}
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Messages;
