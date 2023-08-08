import axios from "axios";
import { loginHost, registerHost } from "../../Utils/constants";
import { LoginData, RegisterData } from "../../Types/types";

const register = async (userData: RegisterData) => {
  const response = await axios.post(registerHost, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return await response.data;
};

const login = async (userData: LoginData) => {
  const response = await axios.post(loginHost, userData);
  console.log(response);
  
  if (await response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return await response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = { register, login, logout };
export default authService;
