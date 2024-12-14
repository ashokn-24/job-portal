/* eslint-disable react/prop-types */
import JobProvider from "./context/JobsContext";
import { UserProvider } from "./context/UserContext";

const AppProvider = ({ childern }) => {
  return (
    <>
      <UserProvider>
        <JobProvider>{childern}</JobProvider>
      </UserProvider>
    </>
  );
};

export default AppProvider;
