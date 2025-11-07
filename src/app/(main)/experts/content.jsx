import { LuPlus } from "react-icons/lu";


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="row">
          {/* 1. Header Halaman */}
          <div className="d-flex justify-content-between align-items-center p-3 mb-4 rounded-4 shadow-sm border border-gray-400" style={{ backgroundColor: '#fbf5fd' }}>
            <div>
              <p className="fs-6 fw-bolder text-primary-gradient mb-0">Experts</p>
              <p className="text-dark mb-0">Manage your expert network and profiles</p>
            </div>
            <button className="btn btn-primary-gradient fw-bold d-flex align-items-center shadow-sm">
              <LuPlus size={20} className="me-2" /> Add Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;