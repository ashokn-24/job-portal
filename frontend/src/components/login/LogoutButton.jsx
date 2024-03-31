import useLogout from "../../hooks/useLogout";
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <div className="mt-auto">
      <BiLogOut
        className="text-white w-6 h-6 cursor-pointer"
        onClick={logout}
      />
    </div>
  );
};

export default LogoutButton;
