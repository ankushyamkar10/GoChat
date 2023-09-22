import Cookies from "universal-cookie";
import { User } from "../Types/types";
const cookie = new Cookies();

const COOKIE_MAX_AGE = 60 * 60 * 24;

const COOKIE_EXTENDED_MAX_AGE = 60 * 60 * 24 * 5;

const setCookie = (key: string, value: any, extended = false) => {
  cookie.set(key, value, {
    maxAge: extended ? COOKIE_EXTENDED_MAX_AGE : COOKIE_MAX_AGE,
  });
};

const getCookie = (key: string): User => {
  return cookie.get(key);
};

const destroyCookie = (key: string) => {
  cookie.remove(key);
};

/**
 * Function to return user authorization token from cookie
 */
const getUserAuthorizationToken = () => {
  return `Bearer ${getCookie("user").token}`;
};

export { setCookie, getCookie, destroyCookie, getUserAuthorizationToken };
