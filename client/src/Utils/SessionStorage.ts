const setSession = (key: string, value: string) => {  
  sessionStorage.setItem(key, value);
};

const getSession = (key: string) => {
  return sessionStorage.getItem(key);
};

const destroySession = (key: string) => {
  sessionStorage.removeItem(key);
};

const getUserAuthorizationToken = () => {
  return `Bearer ${getSession("user")}`;
};

export { setSession, getSession, destroySession, getUserAuthorizationToken };
