import axios from "axios";
import { userRoute } from "../../Utils/constants";
import {
  LoginData,
  RegisterData,
  addUser,
  communication,
  requestAction,
} from "../../Types/types";
import {
  destroyCookie,
  getUserAuthorizationToken,
  setCookie,
} from "../../Utils/Cookies";

const register = async (userData: RegisterData) => {
  try {
    const response = await axios.post(userRoute + "/register", userData);

    setCookie("user", response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const login = async (userData: LoginData) => {
  try {
    const response = await axios.post(userRoute + "/login", userData);
    setCookie("user", response.data);
    return response.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

const logout = async () => {
  destroyCookie("user");
};

const addContact = async ({ user_id, addedUser }: addUser) => {
  try {
    const response = await axios.patch(
      userRoute,
      { user_id, addUser: addedUser },
      {
        headers: {
          Authorization: getUserAuthorizationToken(),
        },
      }
    );
    setCookie("user", response.data);
    return response.data.contacts;
  } catch (error) {
    console.log(error);

    return error;
  }
};

const sendChatRequest = async (data: communication) => {
  try {
    const response = await axios.post(
      userRoute + "/sendChatRequest",
      { data },
      {
        headers: {
          Authorization: getUserAuthorizationToken(),
        },
      }
    );

    setCookie("user", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const recieveChatRequest = async (data: communication) => {
  try {
    const response = await axios.post(
      userRoute + "/recieveChatRequest",
      { data },
      {
        headers: {
          Authorization: getUserAuthorizationToken(),
        },
      }
    );

    setCookie("user", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const cancelChatRequest = async (data: communication) => {
  try {
    const response = await axios.post(
      userRoute + "/cancelChatRequest",
      { data },
      {
        headers: {
          Authorization: getUserAuthorizationToken(),
        },
      }
    );

    setCookie("user", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateRequestAndContacts = async ({
  actionId,
  action,
}: requestAction) => {
  try {
    const response = await axios.post(
      userRoute + "/requestAction",
      { actionId, action },
      {
        headers: {
          Authorization: getUserAuthorizationToken(),
        },
      }
    );
    console.log(response);

    setCookie("user", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const authService = {
  register,
  login,
  logout,
  addContact,
  sendChatRequest,
  recieveChatRequest,
  updateRequestAndContacts,
  cancelChatRequest,
};
export default authService;
