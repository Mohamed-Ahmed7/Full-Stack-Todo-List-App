import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

interface IProps {}

const RootLayout = ({}: IProps) => {
  return (
    <div>
      <Navbar />
      <Outlet/>
    </div>
  );
};

export default RootLayout;
