import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white p-4 shadow-md font-sans ">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-mildBlue text-lg font-bold">
          Job Fution!{" "}
        </a>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-mildBlue focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto text-lightGray ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="lg:flex lg:space-x-4">
            <li>
              <a href="#" className="block text-gray-500 py-2 px-4">
                Home
              </a>
            </li>
            <li>
              <Link to={"/jobs"} className="block text-gray-500 py-2 px-4">
                Jobs
              </Link>
            </li>
            <li>
              <a href="#" className="block text-gray-500 py-2 px-4">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-500 py-2 px-4">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-500 py-2 px-4">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          {user ? (
            <div className="flex gap-2">
              <img src={user.profilePic} width={50} />
              <button
                onClick={logoutUser}
                className="bg-mildBlue text-white px-5 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to={"/login"}
                className="bg-mildBlue text-white px-5 py-2 rounded-lg"
              >
                Login
              </Link>
              <Link className="bg-mildBlue text-white px-5 py-2 rounded-lg">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
