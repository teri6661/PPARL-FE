import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {

  return (
    <div id="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <ToastContainer style={{ right: "40px" }} />
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;