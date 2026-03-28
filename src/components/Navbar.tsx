import { NavLink, useLocation } from "react-router";
import Button from "./ui/Button";

const Navbar = () => {
  const { pathname } = useLocation();
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  // ** Handlers
  const onLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("loggedInUser");
      location.replace(pathname);
    }, 1500);
  };
  return (
    <nav className="max-w-lg mx-auto  mt-7 mb-20 px-3 py-5 rounded-md ">
      <ul className="flex items-center justify-between">
        <li className=" duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
        {userData ? (
          <div className="flex items-center text-indigo-600 gap-x-2">
            <li className=" duration-200 ">
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <Button onClick={onLogout} size={"sm"} className="cursor-pointer">
              Logout
            </Button>
          </div>
        ) : (
          <p className="flex items-center space-x-3">
            <li className=" duration-200 font-semibold text-lg">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className=" duration-200 font-semibold text-lg">
              <NavLink to="/login">Login</NavLink>
            </li>
          </p>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
