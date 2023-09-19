import uniqid from "uniqid";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { MsgState } from "../../features/Message/MessageSlice";
import { DataState } from "../../features/FetchData/FetchDataSlice";
import { userProfile } from "../../Types/types";

type Props = {
  isGroup: Boolean;
};

const Messages = ({ isGroup }: Props) => {
  const { conversation } = useAppSelector(MsgState);
  const { users } = useAppSelector(DataState);

  return (
    <div className="message-container">
      {conversation.length > 0 &&
        conversation.map((messages) => {
          if (messages) {
            const { message, isSenderMe, sender } = messages;
            let img: string | userProfile = "";
            let filteredUser;
            if (isGroup) {
              filteredUser = users.filter((user) => user._id === sender);
              img = filteredUser.length === 1 ? filteredUser[0].img : "";
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
                    src={typeof img === "string" ? img : img.image_url}
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
                  {!isSenderMe && (
                    <div className="sender">
                      {filteredUser && "~" + filteredUser[0]?.name}
                    </div>
                  )}
                  <div className="message-text">{message.text}</div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Messages;
