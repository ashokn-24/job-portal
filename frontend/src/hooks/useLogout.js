import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    console.log("before logout");
    try {
      console.log("in try block");
      const res = await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      console.log(res);

      const data = await res.json();

      console.log(data);

      localStorage.removeItem("user-info");
      setAuthUser(null);

      if (data.message) {
        throw new Error(data.message);
      }
      console.log("logout");

      // Remove user info from local storage

      // Set authenticated user to null
    } catch (error) {
      toast.success(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
