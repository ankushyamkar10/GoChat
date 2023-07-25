type User = {
  name: string;
  password: string;
  _id: string;
  token: string;
  isAvtarSet: Boolean;
  img: string;
};

type Message = {
  message: {
    text: string;
  };
  isSenderMe: Boolean;
};
export type { User, Message };
