import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Popover } from "antd";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const userPopoverContent = (
    <div className="flex flex-col gap-2">
      <div className="font-semibold border-b">{user?.name}</div>
      <Link to={"/profile"} className="font-medium border-b">
        View Profile
      </Link>
      <Link to={"/applications"} className="font-medium border-b">
        My Applications
      </Link>
      <Link to={"/update-resume"} className="font-medium border-b">
        Update Resume
      </Link>
      <button
        onClick={logoutUser}
        className="bg-mildBlue text-white text-xs px-2 py-1 rounded-lg"
      >
        Logout
      </button>
    </div>
  );

  const employerPopoverContent = (
    <div className="flex flex-col gap-2">
      <Link to={"/login"} className="font-medium">
        Login
      </Link>
      <Link to={"/register"} className="font-medium">
        Register
      </Link>
      <Link to={"/enquiry"} className="font-medium">
        Enquiry
      </Link>
    </div>
  );

  return (
    <nav className="bg-white px-4 py-2 font-sans">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-mildBlue text-lg font-bold">
          Job Function!
        </Link>

        {/* Mobile Burger Icon */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-mildBlue focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

        {/* Navbar Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:static absolute top-14 left-0 w-full lg:w-auto bg-white lg:bg-transparent z-20 lg:z-auto transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-6 lg:py-0 py-6 text-gray-600 text-center lg:text-left">
            <li>
              <Link to="/" className="block py-2 px-4 hover:text-mildBlue">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="block py-2 px-4 hover:text-mildBlue">
                Jobs
              </Link>
            </li>
            {user?.role === "employee" && (
              <li>
                <Link
                  to="/dashboard"
                  className="block py-2 px-4 hover:text-mildBlue"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link to="/about" className="block py-2 px-4 hover:text-mildBlue">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block py-2 px-4 hover:text-mildBlue"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-4 hover:text-mildBlue"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* User Authentication Section */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <Popover
              content={userPopoverContent}
              trigger="click"
              placement="bottomRight"
            >
              <img
                src={user.profilePic}
                alt="Profile"
                className="rounded-full w-10 h-10 cursor-pointer"
              />
            </Popover>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-mildBlue text-white px-4 py-2 rounded-lg text-sm"
              >
                Login/Register
              </Link>
              <Popover
                content={employerPopoverContent}
                trigger="click"
                placement="bottomRight"
              >
                <span className="text-darkBlue cursor-pointer">
                  For Recruiter ▾
                </span>
              </Popover>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
