import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Signup = () => {
  const { signupUser } = useUser();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
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
    console.log(data);
    signupUser(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-dark-blue w-full max-w-md p-8 rounded-lg shadow-xl">
        <h2 className="text-center text-gray-500 text-2xl font-semibold mb-6">
          Register
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-500 text-sm mb-1" htmlFor="email">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-gray-500 border border-gray-200 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-sm mb-1" htmlFor="email">
              Email
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
              htmlFor="password"
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
          <div>
            <label
              className="block text-gray-500 text-sm mb-1"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              id="gender"
              value={data.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-500 border border-gray-200 rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-darkBlue text-white py-2 rounded-md hover:bg-mildBlue transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

<div className="text-center text-gray-500 mt-4">
  <p>
    Already have Account?{" "}
    <Link to={"/login"} className="text-darkBlue">
      Login
    </Link>
  </p>
</div>;
