'use client'
import { useState } from "react";
import { LuLayoutGrid, LuPlus, LuSearch, LuTable2 } from "react-icons/lu";
import Table from "./component/table";
import Card from "./component/card";
import ClientModal from "./component/client-modal";

const Content = () => {
  const [data, setData] = useState([
    {
      id: 101,
      company_name: "Tech Solutions Inc.",
      industry: "Information Technology",
      locations: [
        { uuid: 1, city: "New York", country: "USA", address: "123 Main St, Manhattan", primary: true },
        { uuid: 1, city: "London", country: "UK", address: "45 Business Rd, Canary Wharf", primary: false },
        { uuid: 1, city: "Jakarta", country: "ID", address: "45 Business Rd, Canary Wharf", primary: false },
      ],
      contact_person: "John Doe",
      email: "contact@techsolutions.com",
      phone: "+1-212-555-0100",
    },
    {
      id: 102,
      company_name: "Global Innovate Co.",
      industry: "Software Development",
      locations: [
        { city: "San Francisco", country: "USA", address: "Tech Tower 101", primary: true }
      ],
      contact_person: "Alice Smith",
      email: "info@innovate.com",
      phone: "+1-415-555-1234",
    },
    {
      id: 103,
      company_name: "Creative Marketing Agency",
      industry: "Advertising & Marketing",
      locations: [
        { city: "Sydney", country: "Australia", address: "Level 5, Market St", primary: true }
      ],
      contact_person: "Bob Johnson",
      email: "hr@creativeagency.net",
      phone: "+61-2-9999-0000",
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

          {/* 1. Header Halaman */}
          <div className="d-flex justify-content-between align-items-center p-3 mb-4 rounded-4 shadow-sm border border-gray-400" style={{ backgroundColor: '#fbf5fd' }}>
            <div>
              <p className="fs-6 fw-bolder text-primary-gradient mb-0">Clients</p>
              <p className="text-dark mb-0">Manage your client relationships and contacts</p>
            </div>
            <button className="btn btn-primary-gradient fw-bold d-flex align-items-center shadow-sm" onClick={handleAdd}>
              <LuPlus size={20} className="me-2" /> Add Client
            </button>
          </div>

          {/* 2. Control Bar (Search & Toggle) */}
          <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded-4 shadow-sm border border-gray-400">

            {/* Search Input */}
            <div className="position-relative me-3" style={{ maxWidth: '300px', flexGrow: 1 }}>
              <LuSearch className="top-50 position-absolute ms-2 text-muted translate-middle-y" />
              <input
                type="search"
                className="form-control"
                placeholder="Search"
                style={{ paddingLeft: '2rem' }}
              />
            </div>

            {/* Toggle Button Group */}
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

        {/* Modal */}
        <ClientModal
          show={showModal}
          onHide={() => setShowModal(false)}
          mode={modalMode}
          initialData={selectedAccount}
          onSubmit={handleSubmit}
        />

      </div>
    </div >
  );
};

export default Content;