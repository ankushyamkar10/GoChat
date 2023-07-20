import { Socket } from "socket.io-client";
import { User } from "../Types/types";

interface Props {
  user: User | null;
  socket: Socket;
}

export const joinRoom = (props: Props) => {
  const { user, socket } = props;
  if (user?._id !== undefined) {
    const room = user?._id;
    // socket.emit("join_room", room);
    console.log("joined", user?._id);
  }
};
