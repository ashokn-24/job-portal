import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:/au8000th/login", user)
      .then(() => {
        console.log("usesr login success");
      })
      .catch((err) => {
        console.log(err);
      });

    e.preventDefault();
    console.log(email);
    console.log(password);
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-md p-8 bg-white rounded shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </div>
        <p className="text-center text-gray-600">
          Dont have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
