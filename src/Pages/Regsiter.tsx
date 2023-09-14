import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "../Types/types";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { register, reset, userState } from "../features/Auth/AuthSlice";

const Regsiter: React.FC = () => {
  const navigate = useNavigate();
  const authState = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [registerDetails, setRegisterDetails] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = registerDetails;

  useEffect(() => {
    if (authState.user || authState.isSuccess) navigate("/");
    dispatch(reset());
  }, [authState.user, authState.isSuccess, dispatch, navigate]);

  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();

    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      dispatch(register(registerDetails));

      if (authState.isSuccess) {
        if (!authState.user?.isAvtarSet) {
          navigate("/setAvtar");
        } else {
          navigate("/chat");
        }
      }
    } else if (password !== confirmPassword) {
      alert("Passwords does not matches!");
    } else alert("Fill All the details");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterDetails({ ...registerDetails, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="home-form">
        <label htmlFor="name">Username: </label>
        <input
          type="text"
          id="name"
          value={registerDetails?.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          value={registerDetails?.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={registerDetails?.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPassword">confirmPassword: </label>
        <input
          type="password"
          id="confirmPassword"
          value={registerDetails?.confirmPassword}
          onChange={handleChange}
          required
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Regsiter;
