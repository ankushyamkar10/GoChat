import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginHost } from "../Utils/constants";

type loginData = {
  name: string;
  password: string;
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState<loginData>({
    name: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();

    const { data, status } = await axios.post(loginHost, loginDetails);

    if (status === 201) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    }
      
    
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
          value={loginDetails?.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={loginDetails?.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="id">Password: </label>
        <button>Enter</button>
      </form>
    </div>
  );
};

export default Home;
