import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./Pages/Home";
import Login from "./Pages/Login";
import Regsiter from "./Pages/Regsiter";
import SetAvtar from "./Pages/SetAvtar";
import Layout from "./Components/Layout/Layout";

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
                <Layout>
                  <Chat />
                </Layout>
              }
            ></Route>
            <Route path="/setAvtar" element={<SetAvtar />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
