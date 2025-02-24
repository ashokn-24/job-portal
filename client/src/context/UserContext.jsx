/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import api, { clearAuthHeader, setAuthHeader } from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { message, Spin } from "antd";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const initialLoad = async () => {
      try {
        const res = await api.post("/auth/refresh");
        setToken(res.data.accessToken);
        setUser(res.data.user);
        setAuthHeader(res.data.accessToken);
      } catch (error) {
        console.error("Error refreshing token:", error);
      } finally {
        setLoading(false);
      }
    };

    initialLoad();
  }, [navigate]);

  const loginUser = async (payload) => {
    try {
      const res = await api.post("/auth/login", payload);

      setUser(res.data.user);
      setToken(res.data.accessToken);
      setAuthHeader(res.data.accessToken);
      if (res.status === 201) {
        message.success("Login successfully");
        navigate("/");
      }
    } catch (error) {
      message.error(error.message);
      console.error("Error logging in:", error);
    }
  };
  const resetPassword = async (payload) => {
    try {
      const res = await api.post("/auth/reset_password", payload);

      // setUser(res.data.user);
      // setToken(res.data.accessToken);
      // setAuthHeader(res.data.accessToken);
      if (res.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const signupUser = async (payload) => {
    try {
      const res = await api.post("/auth/signup", payload);
      setUser(res.data.user);
      setToken(res.data.accessToken);
      setAuthHeader(res.data.accessToken);

      if (res.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    try {
      await api.post("/auth/logout");
      clearAuthHeader();
      setUser(null);
      setToken(null);
      message.success("User logged out successfully");
      navigate("/");
    } catch (error) {
      message.error(error.message);
      console.log("Error logging out:", error);
    }
  };

  const employeeSignup = async (payload) => {
    try {
      const res = await api.post("/employee/register", payload);
      setUser(res.data.user);
      setToken(res.data.accessToken);
      setAuthHeader(res.data.accessToken);
      message.success("Employee registered successfully");

      if (res.status === 201) {
        navigate("/");
      }
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };

  const updateUser = async (payload) => {
    try {
      await api.put("/auth/profile", payload);
      message.success("Profile updated successfully");
      // setUser(response.data);
    } catch (error) {
      message.error("Error updating profile");
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        loading,
        updateUser,
        signupUser,
        employeeSignup,
        loginUser,
        logoutUser,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
