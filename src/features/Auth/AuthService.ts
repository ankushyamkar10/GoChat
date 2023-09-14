import axios from "axios";
import { loginHost, registerHost } from "../../Utils/constants";
import { LoginData, RegisterData } from "../../Types/types";
import { destroySession, setSession } from "../../Utils/SessionStorage";

const register = async (userData: RegisterData) => {
  try {
    const response = await axios.post(registerHost, userData);

    setSession("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return error;
  }
};

const login = async (userData: LoginData) => {
  try {
    const response = await axios.post(loginHost, userData);

    setSession("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return error;
  }
};

const logout = async () => {
  destroySession("user");
};

const authService = { register, login, logout };
export default authService;
