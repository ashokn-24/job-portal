import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/signup/Signup";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const { authUser } = useAuthContext();
  const location = useLocation();
  return (
    <div>
      <Routes>
        <Route
          path="/signup"
          element={
            authUser ? (
              <Navigate to="/" state={{ from: location }} replace />
            ) : (
              <Signup />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
