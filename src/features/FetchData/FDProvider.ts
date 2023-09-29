import { useState } from "react";
import { Data, Group, User } from "../../Types/types";
import FetchDataService from "./FetchDataService";
import axios from "axios";
import { getGroupsRoute } from "../../Utils/constants";

const FDProvider = (): Data => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [groups, setGroups] = useState<Array<Group>>([]);
  const [errMsg, setErrMsg] = useState<string>("");

  let mappedUsers = new Map<string, User>();
  let mappedGroups = new Map<string, Group>();

  const fetchUsers = async (userId: string) => {
    try {
      const data: User[] = await FetchDataService.fetchUsers(userId);
      setUsers(data);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        setErrMsg(msg);
      }
    }
  };
  const fetchGroups = async (userId: string) => {
    try {
      const data: Group[] = await FetchDataService.fetchGroups(userId);
      setGroups(data);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        setErrMsg(msg);
      }
    }
  };

  users &&
    users.forEach((user: User) => {
      mappedUsers.set(user._id, user);
    });
  groups &&
    groups.forEach((group: Group) => {
      mappedGroups.set(group._id, group);
    });

  return {
    fetchUsersMore: fetchUsers,
    fetchGroupsMore: fetchGroups,
    groups,
    users,
    mappedUsers,
    errMsg,
  };
};
export default FDProvider;
