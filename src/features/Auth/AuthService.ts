import axios from "axios";
import { addUserHost, loginHost, registerHost } from "../../Utils/constants";
import { LoginData, RegisterData, addUser } from "../../Types/types";
import {
  destroyCookie,
  getUserAuthorizationToken,
  setCookie,
} from "../../Utils/Cookies";

const register = async (userData: RegisterData) => {
  try {
    const response = await axios.post(registerHost, userData);

    setCookie("user", response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const login = async (userData: LoginData) => {
  try {
    const response = await axios.post(loginHost, userData);
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
      addUserHost,
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

const authService = { register, login, logout, addContact };
export default authService;
