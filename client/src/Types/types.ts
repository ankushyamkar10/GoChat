type User = {
  name: string;
  _id: string;
  token: string;
  isAvtarSet: Boolean;
  img: string;
  email: string;
};

type Message = {
  message: {
    text: string;
  };
  isSenderMe: Boolean;
};
export type { User, Message };
