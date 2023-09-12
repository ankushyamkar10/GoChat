import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { userState } from "../../features/Auth/AuthSlice";
import { sendMessage } from "../../features/Message/MessageSlice";
import { User } from "../../Types/types";
import { Socket } from "socket.io-client";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
  selected: User;
};

function MsgForm({ socket, selected }: Props) {
  const msgRef = useRef<HTMLInputElement>(null);
  const { user } = useAppSelector(userState);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      user &&
      selected &&
      msgRef.current?.value &&
      msgRef.current?.value.length > 0
    ) {
      socket.current?.emit("sendMsg", {
        text: msgRef.current.value,
        sender: user._id,
        recieverId: selected._id,
      });

      const msgArg = {
        text: msgRef.current.value,
        sender: user._id,
        reciever: selected._id,
      };

      dispatch(sendMessage(msgArg));

      msgRef.current.value = "";
    }
  };
  return (
    <form className="message-form" onSubmit={(e) => handleSubmit(e)}>
      <input type="text" ref={msgRef} placeholder="Send Message..." />
      <button>Send</button>
    </form>
  );
}

export default MsgForm;
