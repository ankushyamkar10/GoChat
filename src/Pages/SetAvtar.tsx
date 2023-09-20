// import React, { useEffect, useState } from "react";
// import { Buffer } from "buffer";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { setUserAvtarHost } from "../Utils/constants";
// import { useAppSelector } from "../hooks/useTypedSelector";
// import { userState } from "../features/Auth/AuthSlice";
// import { setSession } from "../Utils/SessionStorage";

// function convertToBase64(file: File | undefined) {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     if (file) {
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };
//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     }
//   });
// }

// const setUserAvtar = async (
//   selected: string,
//   userId: string | undefined,
//   decider: string
// ) => {
//   if (decider === "user") {
//     const res = await axios.patch(setUserAvtarHost + "/" + userId, {
//       imageUrl: selected,
//     });

//     return await res.data;
//   }
// };

// const SetAvtar = () => {
//   const { user } = useAppSelector(userState);
//   const [selected, setSelected] = useState<string>();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user?.isAvtarSet) navigate("/");
//   }, []);

//   const handleSubmit = (e?: React.FormEvent<Element>) => {
//     e?.preventDefault();
//     if (selected)
//       setUserAvtar(selected, user?._id, "user")
//         .then((res) => {
//           setSession("user", JSON.stringify(res));
//           navigate("/");
//         })
//         .catch((e) => console.log(e));
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     const base64 = await convertToBase64(file);
//     base64?.toString();
//     if (typeof base64 === "string") setSelected(base64);
//   };

//   return (
//     <div className="avtar-div">
//       <div className="">
//         <div className="user-bar">
//           <img
//             src={
//               typeof user?.img === "string" ? user?.img : user?.img.image_url
//             }
//             alt="DP"
//           />
//           {user?.name}
//         </div>
//         <div className="text-div">Please select Avtar</div>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="file"
//             id="imageUpload"
//             name="imageUpload"
//             accept=".jpg, .png, .svg"
//             onChange={(e) => handleFileChange(e)}
//           />
//           <button>Submit</button>
//         </form>
//         <button onClick={handleSubmit}>Set Avtar</button>
//       </div>
//     </div>
//   );
// };

// export default SetAvtar;
