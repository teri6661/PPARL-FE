'use client';
import { useState } from "react";
import { LuLayoutGrid, LuPlus, LuSearch, LuTable2 } from "react-icons/lu";
import Table from "./component/table";
import Card from "./component/card";
import AccountModal from "./component/account-modal";

const Content = () => {
  const [data, setData] = useState([
    {
      uuid: 1,
      fullname: "John Doe",
      email: "admin@a.com",
      profile_pic: null,
      role: "Admin",
      status: "Active",
      created_at: "2025-01-01",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      uuid: 2,
      fullname: "Alice Smith",
      email: "admin@b.com",
      profile_pic: null,
      role: "Manager",
      status: "Active",
      created_at: "2025-01-05",
    },
    {
      uuid: 3,
      fullname: "Bob Johnson",
      email: "admin@c.com",
      profile_pic: null,
      role: "Viewer",
      status: "Inactive",
      created_at: "2025-01-10",
      image: "https://randomuser.me/api/portraits/men/30.jpg",
    },
    {
      uuid: 4,
      fullname: "Eva Brown",
      profile_pic: null,
      role: "Admin",
      status: "Active",
      created_at: "2025-01-15",
    },
    {
      uuid: 5,
      fullname: "Michael Lee",
      profile_pic: null,
      role: "Editor",
      status: "Inactive",
      created_at: "2025-01-20",
    },
  ]);
  const [viewMode, setViewMode] = useState("table");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedAccount, setSelectedAccount] = useState(null);

  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Menampilkan 3 item per halaman

  const activeClass = "btn-dark-red";
  const inactiveClass = "btn-outline-dark-red";

  const handleAdd = () => {
    setModalMode("add");
    setSelectedAccount(null);
    setShowModal(true);
  };

  const handleEdit = (account) => {
    setModalMode("edit");
    setSelectedAccount(account);
    setShowModal(true);
  };

  const handleSubmit = (data) => {
    if (modalMode === "add") {
      console.log("Tambah akun:", data);
      // TODO: panggil API add di sini
    } else {
      console.log("Update akun:", data);
      // TODO: panggil API update di sini
    }
  };

  // Logika Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const showingFrom = indexOfFirstItem + 1;
  const showingTo = Math.min(indexOfLastItem, data.length);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="row mb-4">

          {/* Header Halaman */}
          <div className="d-flex justify-content-between align-items-center p-3 mb-4 rounded-4 shadow-sm border border-gray-400" style={{ backgroundColor: '#fbf5fd' }}>
            <div>
              <p className="fs-6 fw-bolder text-primary-gradient mb-0">Accounts Management</p>
              <p className="text-dark mb-0">Manage user accounts and permissions</p>
            </div>
            <button
              className="btn btn-primary-gradient fw-bold d-flex align-items-center shadow-sm"
              onClick={handleAdd}
            >
              <LuPlus size={20} className="me-2" /> Add Account
            </button>
          </div>

          {/* Control Bar */}
          <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded-4 shadow-sm border border-gray-400">
            <div className="position-relative me-3" style={{ maxWidth: '300px', flexGrow: 1 }}>
              <LuSearch className="top-50 position-absolute ms-2 text-muted translate-middle-y" />
              <input
                type="search"
                className="form-control"
                placeholder="Search"
                style={{ paddingLeft: '2rem' }}
              />
            </div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${viewMode === 'table' ? activeClass : inactiveClass}`}
                onClick={() => setViewMode('table')}
              >
                <LuTable2 size={16} /> <span className="d-none d-md-inline ms-1">Table</span>
              </button>
              <button
                type="button"
                className={`btn ${viewMode === 'cards' ? activeClass : inactiveClass}`}
                onClick={() => setViewMode('cards')}
              >
                <LuLayoutGrid size={16} /> <span className="d-none d-md-inline ms-1">Cards</span>
              </button>
            </div>
          </div>

          {/* Konten */}
          <div className="card p-3 rounded-4 shadow-sm border border-gray-400">
            {viewMode === 'table' ? (
              <Table data={currentItems} onEdit={handleEdit} totalData={data.length} />
            ) : (
              <Card data={currentItems} onEdit={handleEdit} totalData={data.length} />
            )}
            {/* Pagination Footer */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              {/* Info jumlah hasil */}
              <div>
                <small className="text-muted fw-bold fs-3">
                  Showing {showingFrom}–{showingTo} of {data.length} results
                </small>
              </div>

              {/* Pagination */}
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link link fw-bold" onClick={() => paginate(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                {pageNumbers.map(number => (
                  <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <button onClick={() => paginate(number)} className="page-link link fw-bold">
                      {number}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link link fw-bold" onClick={() => paginate(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AccountModal
        show={showModal}
        onHide={() => setShowModal(false)}
        mode={modalMode}
        initialData={selectedAccount}
        onSubmit={handleSubmit}
      />
    </div >
  );
};

export default Content;