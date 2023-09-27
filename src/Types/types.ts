export interface userProfile {
  image_url: string;
  public_id: string;
}

export interface User {
  _id: string;
  name: string;
  token: string;
  isAvtarSet: boolean;
  img: string | userProfile;
  email: string;
  contacts: string[];
  sentRequests: Array<string>;
  recievedRequests: Array<string>;
}

export interface Users {
  name: string;
  token: string;
  isAvtarSet: boolean;
  img: string | userProfile;
  email: string;
  contacts: User[];
}

export interface Group {
  name: string;
  _id: string;
  desc?: string;
  isAvtarSet: boolean;
  img: string;
  admin: Array<string>;
  members: Array<string>;
  createdAt: Date;
}

export interface Entity {
  _id: string;
  name: string;
  isAvtarSet: boolean;
  img: string | userProfile;
  token?: string;
  email?: string;
  contacts?: Array<Entity>;
  desc?: string;
  admin?: Array<string>;
  members?: Array<string>;
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
    time_stamp: string;
  };
  sender: string;
  isSenderMe: boolean;
}

export interface addUser {
  user_id: string;
  addedUser: User[] | Group[];
}

export interface fetchMessagesgProps {
  userId: string;
  selectedId: string;
}

export interface sendMessageProps {
  message: { text: string; time_stamp: string };
  senderId: string | undefined;
  recieverId: string | undefined;
}

export type Data = {
  users: User[];
  groups: Group[];
  mappedUsers: Map<string, User>;
  errMsg: string;
  fetchUsersMore: (userId: string) => Promise<void>;
  fetchGroupsMore: (userId: string) => Promise<void>;
};

export interface communication {
  senderId: string;
  recieverId: string;
  action?: string;
}

export interface requestAction {
  actionId: string;
  action: string;
}

export interface createGroupInterface {
  name: string;
  desc?: string;
  members: Array<string>;
  userId: string;
}
export interface leaveGroupInterface {
  groupId: string;
  userId: string;
}
