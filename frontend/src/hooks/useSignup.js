import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const signup = async ({ email, password, confirmPassword }) => {
    const success = handleInputErrors({ email, password, confirmPassword });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      
      const data = await res.json();
      if (data.message) {
        throw new Error(data.message);
      }

      localStorage.setItem("user-info", JSON.stringify(data));

      setAuthUser(data);

      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ email, password, confirmPassword }) {
  if (!email || !password || !confirmPassword) {
    toast.error("Please fill all required fields");
    return false;
  }

  if (!password) {
    toast.error("Please enter the password");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  if (!password === confirmPassword) {
    toast.error("Password do not match");
    return false;
  }
  if (!email) {
    toast.error("Please enter the email");
    return false;
  }

  return true;
}
