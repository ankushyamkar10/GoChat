import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login";
import Regsiter from "./Pages/Regsiter";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Regsiter />}></Route>
            <Route path="/" element={<Chat />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
