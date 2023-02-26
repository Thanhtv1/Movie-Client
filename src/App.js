import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Discover from "./pages/Discover/Discover";
import Detail from "./pages/Detail/Detail";
import Watch from "./pages/Watch/Watch";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import Settings from "./pages/Setting/Settings";
import Search from "./pages/Search/Search";
import SignIn from "./component/Form/SignIn";
import SignUp from "./component/Form/SignUp";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/:type/:id" element={<Detail />}></Route>
          <Route path="/:type/:id/watch" element={<Watch />}></Route>
          <Route path="/auth">
            <Route
              path="login"
              element={
                <Login>
                  <SignIn />
                </Login>
              }
            />
            <Route
              path="register"
              element={
                <Login>
                  <SignUp />
                </Login>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
