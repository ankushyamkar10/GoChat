import axios from "axios";
import { allUsersHost, getGroupsHost } from "../../Utils/constants";
import { getUserAuthorizationToken } from "../../Utils/Cookies";

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

const fecthUser = async (user_id: string) => {
  try {
    const response = await axios.get(getGroupsHost + "/" + user_id, {
      headers: {
        Authorization: getUserAuthorizationToken(),
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

const FetchDataService = { fetchUsers, fetchGroups, fecthUser };
export default FetchDataService;
