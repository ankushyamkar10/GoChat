import axios from "axios";
const backendHost: string = "http://localhost:4000";
const loginHost: string = "http://localhost:4000/api/users/login";
const registerHost: string = "http://localhost:4000/api/users/register";
const allUsersHost: string = "http://localhost:4000/api/users/all/";
const sendMsgHost: string = "http://localhost:4000/api/message/addMsg";
const getMsgsHost: string = "http://localhost:4000/api/message/getMsgs";
const setUserAvtarHost: string = "http://localhost:4000/api/users";
const getGroupsHost: string = "http://localhost:4000/api/groups";

const fetchUsers = async (user_id: string | undefined) => {
  const response = await axios.get(allUsersHost + user_id);
  if (response.status === 200) return response.data;
  return null;
};

const fetchMsgs = async (from: string | undefined, to: string | undefined) => {
  const response = await axios.post(getMsgsHost, {
    from,
    to,
  });
  if (response.status === 200) return response.data;
  return null;
};

const fetchGroups = async (user_id: string | undefined) => {
  const response = await axios.get(getGroupsHost + "/" + user_id);
  if (response.status === 200) return response.data;
  return null;
};
export {
  backendHost,
  loginHost,
  registerHost,
  allUsersHost,
  sendMsgHost,
  setUserAvtarHost,
  getMsgsHost,
  fetchUsers,
  fetchMsgs,
  fetchGroups,
};
