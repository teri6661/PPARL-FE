import Header from "../layout/header";
import Sidebar from "../layout/sidebar";

const Layout = ({ children }) => {

  return (
    <div id="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;