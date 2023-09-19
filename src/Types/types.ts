export interface userProfile {
  image_url: string;
  public_id: string;
}

export interface User {
  _id: string;
  name: string;
  token: string;
  isAvtarSet: Boolean;
  img: string | userProfile;
  email: string;
}

export interface Group {
  name: string;
  _id: string;
  desc?: string;
  isAvtarSet: Boolean;
  img: string;
  admin: Array<string>;
  members: Array<string>;
  createdAt: Date;
}

export interface LoginData {
  name: string;
  password: string;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface Message {
  message: {
    text: string;
  };
  sender: string;
  isSenderMe: Boolean;
}
