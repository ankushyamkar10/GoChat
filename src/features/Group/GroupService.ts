import axios from "axios";
import { groupRoute } from "../../Utils/constants";

const createGroup = async (group: {
  name: string;
  desc?: string;
  members: Array<string>;
  userId: string;
}) => {
  try {
    const response = await axios.post(groupRoute + `/${group.userId}`, {
      group,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const leaveGroup = async (group: { userId: string; groupId: string }) => {
  try {
    const response = await axios.post(
      groupRoute + `/leaveGroup/${group.groupId}`,
      { userId: group.userId }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// const leaveGroup = async
const groupService = { createGroup, leaveGroup };
export default groupService;
