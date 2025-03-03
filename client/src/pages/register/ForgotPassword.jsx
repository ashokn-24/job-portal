import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { resetPassword } = useUser();
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetPassword(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-dark-blue w-full max-w-sm p-8 rounded-lg shadow-xl">
        <h2 className="text-center text-gray-500 text-2xl font-semibold mb-6">
          Reset Password
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-500 text-sm mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-gray-500 border border-gray-200 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label
              className="block text-gray-500 text-sm mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 text-gray-500 border border-gray-200 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label
              className="block text-gray-500 text-sm mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 text-gray-500 border border-gray-200 rounded-md focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-darkBlue text-white py-2 rounded-md hover:bg-mildBlue transition duration-200"
          >
            Change Password
          </button>
        </form>

        <div className="text-center text-gray-500 mt-4">
          <p>
            Already have an account{" "}
            <Link to={"/login"} className="text-darkBlue">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
