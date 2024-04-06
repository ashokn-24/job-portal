import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext(); // Get the authenticated user from context

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authUser) return; // Make sure authUser exists before fetching the profile

      setLoading(true);

      try {
        const res = await fetch("http://localhost:8000/auth/profile", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        console.log(data);
        // Assuming the response data includes a 'role' property
        setAuthUser({ ...data, role: data.role });
        console.log(authUser);

        setUserProfile(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return { loading, userProfile };
};

export default useUserProfile;
