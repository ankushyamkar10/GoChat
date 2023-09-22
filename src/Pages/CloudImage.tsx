import React, { useState } from "react";
import { useAppSelector } from "../hooks/useTypedSelector";
import { userState } from "../features/Auth/AuthSlice";
import { setUserAvtarHost } from "../Utils/constants";
import axios from "axios";
import { setCookie } from "../Utils/Cookies";

const setUserAvtar = async (
  selected: string | undefined,
  userId: string | undefined,
  decider: string
) => {
  if (decider === "user") {
    const res = await axios.patch(setUserAvtarHost + "/" + userId, {
      imageUrl: selected,
    });

    return await res.data;
  }
};

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
    return "";
  });
}

const CloudImage = () => {
  const [image, setImage] = useState<string>("");
  const { loggedInUser } = useAppSelector(userState);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      let newFile: File | undefined = e.target.files?.[0];
      var blob = newFile?.slice(0, newFile?.size, "image/png");
      if (blob) {
        newFile = new File([blob], `${loggedInUser?.name}.png`, {
          type: "image/png",
        });
        const base64 = await convertToBase64(newFile);
        base64?.toString();
        if (typeof base64 === "string") setImage(base64);
      }
    }
  };

  const handleSubmit = (e?: React.FormEvent<Element>) => {
    e?.preventDefault();
    if (image !== null) {
      setUserAvtar(image, loggedInUser?._id, "user")
        .then((res) => {
          setCookie("user", JSON.stringify(res));
          window.location.href = "/";
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <div>
      <input type="file" onChange={(e) => handleChange(e)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CloudImage;
