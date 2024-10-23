import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Jobs from "./pages/jobs/Jobs";
import Login from "./pages/register/Login";
import JobProvider from "./context/JobsContext";
import Signup from "./pages/register/Signup";
import EmployeeSignUpForm from "./pages/register/EmpSignup/EmployeeSignUpForm";
import JobInfo from "./pages/jobs/JobInfo";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  return (
    <>
      <JobProvider>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobInfo />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/employee/signup"} element={<EmployeeSignUpForm />} />
          <Route path={"/employee/dashboard"} element={<Dashboard />} />
        </Routes>
      </JobProvider>
    </>
  );
};

export default App;
