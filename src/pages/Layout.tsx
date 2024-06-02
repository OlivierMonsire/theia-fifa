import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="nav"></div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
