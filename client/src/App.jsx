import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Jobs from "./pages/jobs/Jobs";
import Login from "./pages/register/Login";
import JobProvider from "./context/JobsContext";
import Signup from "./pages/register/Signup";
import EmployeeSignUpForm from "./pages/register/EmpSignup/EmployeeSignUpForm";
import JobInfo from "./pages/jobs/JobInfo";
import Dashboard from "./pages/dashboard/Dashboard";
import Applications from "./pages/user/Applications";
import UserProfile from "./pages/user/UserProfile";
import UserDetails from "./components/UserDetails";
import ForgotPassword from "./pages/register/ForgotPassword";

const App = () => {
  return (
    <>
      <JobProvider>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/reset_password" element={<ForgotPassword />} />
          <Route path="/jobs/:id" element={<JobInfo />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/profile"} element={<UserProfile />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/applications"} element={<Applications />} />
          <Route path={"/employee/signup"} element={<EmployeeSignUpForm />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/dashboard/applicants/:id"} element={<UserDetails />} />
        </Routes>
      </JobProvider>
    </>
  );
};

export default App;
