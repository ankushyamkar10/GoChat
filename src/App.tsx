import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./Pages/Home";
import Login from "./Pages/Login";
import Regsiter from "./Pages/Regsiter";
import CloudImage from "./Components/Config/CloudImage";
import Protect from "./Components/Config/Protect";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Regsiter />}></Route>
            <Route
              index
              element={
                <Protect>
                  <Chat />
                </Protect>
              }
            ></Route>
            <Route path="/setAvtar" element={<CloudImage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
