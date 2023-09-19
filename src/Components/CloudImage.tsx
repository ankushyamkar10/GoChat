import React, { useState } from "react";
import { useAppSelector } from "../hooks/useTypedSelector";
import { userState } from "../features/Auth/AuthSlice";
import { setUserAvtarHost } from "../Utils/constants";
import axios from "axios";
import { setSession } from "../Utils/SessionStorage";

const setUserAvtar = async (
  selected: File | undefined,
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

const CloudImage = () => {
  const [image, setImage] = useState<File | null>();
  const { user } = useAppSelector(userState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      let newFile: File | undefined = e.target.files?.[0];
      var blob = newFile?.slice(0, newFile?.size, "image/png");
      if (blob) {
        newFile = new File([blob], `${user?.name}.png`, { type: "image/png" });
        setImage(newFile);
      }
    }
  };

  const handleSubmit = (e?: React.FormEvent<Element>) => {
    e?.preventDefault();
    if (image !== null)
      setUserAvtar(image, user?._id, "user")
        .then((res) => {
          setSession("user", JSON.stringify(res));
          window.location.href = "/";
        })
        .catch((e) => console.log(e));
  };
  return (
    <div>
      <input type="file" onChange={(e) => handleChange(e)} />
      <button onClick={handleSubmit}></button>
    </div>
  );
};

export default CloudImage;
