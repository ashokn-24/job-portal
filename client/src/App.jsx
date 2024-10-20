import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Jobs from "./pages/jobs/Jobs";
import Login from "./pages/register/Login";
import JobProvider from "./context/JobsContext";

const App = () => {
  return (
    <>
      <JobProvider>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/jobs"} element={<Jobs />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </JobProvider>
    </>
  );
};

export default App;
