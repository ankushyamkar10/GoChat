import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../Types/types";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { login, reset, userState } from "../features/Auth/AuthSlice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loggedInUser, isSuccess } = useAppSelector(userState);

  const [loginDetails, setLoginDetails] = useState<LoginData>({
    name: "Ankush",
    password: "123",
  });

  const { name, password } = loginDetails;

  useEffect(() => {
    if (loggedInUser || isSuccess) navigate("/");
    dispatch(reset());
  }, [loggedInUser, isSuccess, dispatch, navigate]);

  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();

    if (name !== "" && password !== "") {
      dispatch(login(loginDetails));

      if (isSuccess) {
        if (!loggedInUser?.isAvtarSet) {
          navigate("/setAvtar");
        } else {
          navigate("/chat");
        }
      }
    } else alert("Fill all the details");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({ ...loginDetails, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="home-form">
        <label htmlFor="name">Username: </label>
        <input
          type="text"
          id="name"
          value={loginDetails.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={loginDetails.password}
          onChange={handleChange}
          required
        />
        <button>Enter</button>
      </form>
    </div>
  );
};

export default Login;
