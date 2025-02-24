import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Popover } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import logoImg from "/icons/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const userPopoverContent = (
    <div className="flex flex-col gap-3 w-[200px] p-2 bg-white shadow-lg rounded-md animate-fadeIn">
      <div className="font-semibold border-b pb-1 text-gray-800">
        {user?.name}
      </div>
      <Link
        to={"/profile"}
        className="font-medium border-b pb-1 hover:text-mildBlue transition-colors"
      >
        View Profile
      </Link>
      <Link
        to={"/applications"}
        className="font-medium border-b pb-1 hover:text-mildBlue transition-colors"
      >
        My Applications
      </Link>
      <Link
        to={"/update-resume"}
        className="font-medium border-b pb-1 hover:text-mildBlue transition-colors"
      >
        Update Resume
      </Link>
      <button
        onClick={logoutUser}
        className="bg-mildBlue text-white text-sm px-3 py-1 rounded-lg hover:bg-darkBlue transition-all duration-200"
      >
        Logout
      </button>
    </div>
  );

  const employerPopoverContent = (
    <div className="flex flex-col gap-2 w-[150px] p-2 bg-white shadow-lg rounded-md animate-fadeIn">
      <Link
        to={"/login"}
        className="font-medium border-b pb-1 hover:text-mildBlue transition-colors"
      >
        Login
      </Link>
      <Link
        to={"/employee/signup"}
        className="font-medium border-b pb-1 hover:text-mildBlue transition-colors"
      >
        Register
      </Link>
      <Link
        to={"/enquiry"}
        className="font-medium border-b pb-1 hover:text-mildBlue transition-colors"
      >
        Enquiry
      </Link>
    </div>
  );

  return (
    <nav className="bg-white p-4 font-sans sticky top-0 z-30 shadow-md transition-shadow duration-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-mildBlue text-lg font-bold hover:scale-105 transition-transform duration-200"
        >
          <img src={logoImg} alt="Logo" width={100} />
        </Link>

        {/* Mobile Burger Icon */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-mildBlue focus:outline-none relative w-6 h-6"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                isOpen ? "rotate-45" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>

        {/* Navbar Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:static absolute top-14 left-0 w-full lg:w-auto bg-white lg:bg-transparent z-20 lg:z-auto transition-all duration-300 ease-in-out shadow-lg lg:shadow-none`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-8 lg:py-0 py-6 text-gray-600 text-center lg:text-left">
            <li>
              <Link
                to="/"
                className="block py-2 px-4 hover:text-mildBlue hover:bg-gray-100 lg:hover:bg-transparent transition-all duration-200 rounded-md"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className="block py-2 px-4 hover:text-mildBlue hover:bg-gray-100 lg:hover:bg-transparent transition-all duration-200 rounded-md"
              >
                Jobs
              </Link>
            </li>
            {user?.role === "employee" && (
              <li>
                <Link
                  to="/dashboard"
                  className="block py-2 px-4 hover:text-mildBlue hover:bg-gray-100 lg:hover:bg-transparent transition-all duration-200 rounded-md"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* User Authentication Section */}
        <div className="hidden lg:flex items-center gap-6">
          {user ? (
            <Popover
              content={userPopoverContent}
              trigger="click"
              placement="bottomRight"
            >
              <div className="flex gap-6 justify-between items-center">
                <div className="relative">
                  <NotificationOutlined className="text-xl text-gray-600 hover:text-mildBlue transition-colors animate-pulse" />
                  {/* Optional: Add a badge for notifications */}
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </div>
                <div>
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="rounded-full w-10 h-10 cursor-pointer hover:scale-110 hover:border-2 hover:border-mildBlue transition-all duration-200"
                  />
                </div>
              </div>
            </Popover>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-mildBlue text-white px-4 py-2 rounded-lg text-sm hover:bg-darkBlue hover:scale-105 transition-all duration-200"
              >
                Login/Register
              </Link>
              <Popover
                content={employerPopoverContent}
                trigger="click"
                placement="bottomRight"
              >
                <span className="text-darkBlue cursor-pointer hover:text-mildBlue transition-colors flex items-center gap-1">
                  For Recruiter
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </Popover>
            </>
          )}
        </div>
      </div>

      {/* Custom Animation for Popover */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-in-out;
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
