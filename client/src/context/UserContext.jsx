/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import api, { clearAuthHeader, setAuthHeader } from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  console.log(user);

  useEffect(() => {
    const initialLoad = async () => {
      try {
        const res = await api.post("/auth/refresh");
        setToken(res.data.accessToken);
        setUser(res.data.user);
        setAuthHeader(res.data.accessToken);
      } catch (error) {
        console.error("Error refreshing token:", error);
        navigate("/login");
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
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logoutUser = async () => {
    try {
      await api.post("/auth/logout");
      clearAuthHeader();
      setUser(null);
      setToken(null);
      navigate("/login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        loading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);