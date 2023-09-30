import axios from "axios";
import { getGroupsRoute, groupRoute } from "../../Utils/constants";

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

const getGroupById = async (groupId: string) => {
  try {
    const response = await axios.get(getGroupsRoute + "/" + groupId);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const addParticipant = async (
  groupId: string,
  userId: string,
  code: string
) => {
  try {
    const response = await axios.post(getGroupsRoute + "/" + groupId + "/add", {
      userId,
      code,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const groupService = { createGroup, leaveGroup, getGroupById, addParticipant };
export default groupService;
