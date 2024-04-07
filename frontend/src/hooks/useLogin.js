import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      // console.log(res.json);

      const data = await res.json();
      console.log(data.email);
      localStorage.setItem("user-info", JSON.stringify({ data }));
      if (data.message) {
        throw new Error(data.message);
      }

      setAuthUser(data);
      // console.log(authUser);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";

// const useLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const { setAuthUser } = useAuthContext();

//   const login = async (email, password, role) => {
//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:8000/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password, role }),
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       if (data.message) {
//         throw new Error(data.message);
//       }

//       // Include role in the data stored in local storage
//       localStorage.setItem("user-info", JSON.stringify({ ...data, role }));

//       setAuthUser(data);
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, login };
// };

// export default useLogin;
