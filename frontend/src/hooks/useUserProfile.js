import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext(); // Get the authenticated user from context

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!setAuthUser) return; // Make sure setAuthUser exists before fetching the profile
  
      setLoading(true);
  
      try {
        const res = await fetch("http://localhost:8000/auth/profile", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${setAuthUser.token}`,
          },
        });
  
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
  
        const data = await res.json();
        console.log(data, setAuthUser);
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

// const useUserProfile = () => {
//   const [userProfile, setUserProfile] = useState(null);

//   useEffect(() => {
//     // Fetch user profile from local storage

//     const userProfileData = localStorage.getItem("user-info");

//     if (userProfileData) {
//       setUserProfile(JSON.parse(userProfileData));
//     }
//   }, []);

//   return userProfile;
// };
