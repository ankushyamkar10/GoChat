import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { userState } from "../../features/Auth/AuthSlice";
import { sendMessage } from "../../features/Message/MessageSlice";
import { Group, User } from "../../Types/types";
import { Socket } from "socket.io-client";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
  selected: User | Group | null;
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
      const time = new Date();
      const hours = time.getHours() <= 9 ? "0" : "" + time.getHours();
      const minutes = time.getMinutes() <= 9 ? "0" : "" + time.getMinutes();
      const time_stamp = hours + ":" + minutes;

      socket.current?.emit("sendMsg", {
        data: {
          text: msgRef.current.value.trim(),
          time_stamp: time_stamp,
        },
        sender: user._id,
        recieverId: selected._id,
      });

      const msgArg = {
        message: {
          text: msgRef.current.value,
          time_stamp: time_stamp,
        },
        sender: user._id,
        reciever: selected._id,
      };

      dispatch(sendMessage(msgArg));
      msgRef.current.value = "";
    }
  };
  return (
    <form className="message-form" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        ref={msgRef}
        placeholder="Send Message..."
        // onKeyDown={(e) => {
        //   if (e.key === "Enter" && e.shiftKey) {
        //     e.preventDefault();
        //     if (msgRef.current) {
        //       e.preventDefault();
        //       const cursorPosition = e.currentTarget.selectionStart || 0;
        //       const newValue =
        //         msgRef.current.value.substring(0, cursorPosition) +
        //         "\n" +
        //         msgRef.current.value.substring(cursorPosition);
        //       // Update the input value
        //       console.log(newValue);

        //       msgRef.current.value = newValue;
        //     }
        //   }
        // }}
      />
      <button>Send</button>
    </form>
  );
}

export default MsgForm;
