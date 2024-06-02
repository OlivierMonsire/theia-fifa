import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="nav"></div>
      <Outlet />
    </>
  );
};

export default Layout;
