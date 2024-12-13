import { UserProvider } from "./context/UserContext";

const AppProvider = ({ childern }) => {
  return (
    <>
      <UserProvider></UserProvider>
      {childern}
    </>
  );
};

export default AppProvider;
