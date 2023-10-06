import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./Pages/Home";
import Login from "./Pages/Login";
import Regsiter from "./Pages/Regsiter";
import CloudImage from "./Pages/CloudImage";
import Protect from "./Components/Config/Protect";
import FetchDataContext from "./features/FetchData/FetchDataContext";
import FDProvider from "./features/FetchData/FDProvider";
import ThemeProvider, { ThemeContext } from "./features/ThemeContext";
import MessageNotificationProvider, {
  MessageNotificationContext,
} from "./features/MessageNotificationContext";

function App() {
  return (
    <>
      <ThemeContext.Provider value={ThemeProvider()}>
        <MessageNotificationContext.Provider
          value={MessageNotificationProvider()}
        >
          <FetchDataContext.Provider value={FDProvider()}>
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
          </FetchDataContext.Provider>
        </MessageNotificationContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}
export default App;
