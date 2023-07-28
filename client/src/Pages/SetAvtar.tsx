import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { User } from "../Types/types";
import axios from "axios";
import { setAvtarHost } from "../Utils/constants";

function convertToBase64(file: File | undefined) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    }
  });
}

const getAllAvtars = async (api: string) => {
  const data = [];
  for (let i = 0; i < 4; i++) {
    const image = await axios.get(`${api}/${Math.round(Math.random() * 100)}`);
    const buffer = new Buffer(image.data);
    data.push(buffer.toString("base64"));
  }
  return data;
};
const setUserAvtar = async (selected: string, user: User) => {
  const res = await axios.patch(setAvtarHost + "/" + user._id, {
    imageUrl: selected,
  });

  return await res.data;
};

const SetAvtar = () => {
  const currUser: string | null = localStorage.getItem("user");
  const user: User = currUser && JSON.parse(currUser);

  const api: string = `https://api.multiavatar.com/4645646`;
  const [avtar, setAvtar] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");

    getAllAvtars(api)
      .then((res) => setAvtar(res))
      .catch((error) => console.log(error));
  }, []);

  const handleSetAvtar = (index: number) => {
    setSelected("data:image/svg+xml;base64," + avtar[index]);
  };

  const handleSubmit = (e?: React.FormEvent<Element>) => {
    e?.preventDefault();
    if (selected !== "")
      setUserAvtar(selected, user)
        .then((res) => {
          console.log(res);
          localStorage.setItem("user", JSON.stringify(res));
          navigate("/");
        })
        .catch((e) => console.log(e));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const base64 = await convertToBase64(file);
    base64?.toString()
    if(typeof base64 === "string")
      setSelected(base64)
    
  };

  return (
    <div className="avtar-div">
      {avtar.length > 0 ? (
        <div className="">
          <div className="user-bar">
            <img
              src={selected ? selected : user.img}
              alt=""
            />
            {user.name}
          </div>
          <div className="text-div">Please select Avtar</div>

          <div className="avtar-images-div">
            {avtar.map((av, index) => {
              return (
                <img
                  key={index}
                  src={`data:image/svg+xml;base64,${av}`}
                  alt="avtar"
                  className="images"
                  onClick={() => handleSetAvtar(index)}
                />
              );
            })}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              accept=".jpg, .png, .svg"
              onChange={(e) => handleFileChange(e)}
            />
            <button>Submit</button>
          </form>
          <button onClick={() => setAvtar([])}>Load another avtars</button>
          <button onClick={handleSubmit}>Set Avtar</button>
        </div>
      ) : (
        <div>Loading Avtars</div>
      )}
    </div>
  );
};

export default SetAvtar;
