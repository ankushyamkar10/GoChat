import axios from "axios";
import { allUsersHost, getGroupsHost } from "../../Utils/constants";

const fetchUsers = async (user_id: string) => {
  try {
    const response = await axios.get(allUsersHost + "/" + user_id);
    return response.data;
  } catch (error) {
    return null;
  }
};

const fetchGroups = async (user_id: string) => {
  try {
    const response = await axios.get(getGroupsHost + "/" + user_id);
    return response.data;
  } catch (error) {
    return null;
  }
};

const FetchDataService = { fetchUsers, fetchGroups };
export default FetchDataService;
