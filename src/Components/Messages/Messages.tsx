import uniqid from "uniqid";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { MsgState } from "../../features/Message/MessageSlice";
import { userProfile } from "../../Types/types";
import { useContext } from "react";
import FetchDataContext from "../../features/FetchData/FetchDataContext";

type Props = {
  isGroup: boolean;
};

const Messages = ({ isGroup }: Props) => {
  const { conversation } = useAppSelector(MsgState);
  const { users } = useContext(FetchDataContext);

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
                  <div className="message-time-stamp">
                    {message?.time_stamp}
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Messages;
