import axios from "axios";
import { userRoute } from "../../Utils/constants";
import {
  LoginData,
  RegisterData,
  addUser,
  communication,
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
      "http://localhost:4000/api/users/sendChatRequest",
      { data }
      // {
      //   headers: {
      //     Authorization: getUserAuthorizationToken(),
      //   },
      // }
    );
    console.log(response);

    setCookie("user", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const authService = { register, login, logout, addContact, sendChatRequest };
export default authService;
