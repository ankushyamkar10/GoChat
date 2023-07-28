import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registerHost } from "../Utils/constants";


type registerData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};



const Regsiter: React.FC = () => {
  const navigate = useNavigate();
  const [registerDetails, setRegisterDetails] = useState<registerData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    const { data, status } = await axios.post(registerHost, registerDetails);
    
    if (status === 201) {
      localStorage.setItem("user", JSON.stringify(data));
      if(!data.isAvtarSet) navigate('/setAvtar')
      navigate("/");
    }
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
