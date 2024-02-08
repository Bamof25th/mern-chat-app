import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthcontext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthcontext();
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </>
  );
}

export default App;
