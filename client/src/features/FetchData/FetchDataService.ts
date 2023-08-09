import axios from "axios";
import { allUsersHost, getGroupsHost } from "../../Utils/constants";

const fetchUsers = async (user_id: string) => {
  const response = await axios.get(allUsersHost + user_id);
  if (response.status === 200) return response.data;
  return null;
};

const fetchGroups = async (user_id: string) => {
  const response = await axios.get(getGroupsHost + user_id);
  if (response.status === 200) return response.data;
  return null;
};

const FetchDataService = { fetchUsers, fetchGroups };
export default FetchDataService;
