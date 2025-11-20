'use client';
import { useState } from "react";
import { LuLayoutGrid, LuPlus, LuSearch, LuTable2 } from "react-icons/lu";
import ExpertModal from "./component/expert-modal";
import Table from "./component/table";
import Card from "./component/card";

const Content = () => {
  const [data, setData] = useState([
    {
      "name": "Sarah Martinez",
      "rating": 4.8,
      "status": "Active",
      "nda_status": "Expired",
      "location": "Manila, Philippines",
      "role": "Freelancer",
      "expertise": ["Coach", "Trainer", "Speaker"],
      "topics": ["Leadership", "Team Building", "Communication", "Motivation"],
      "nda": "Submitted",
      "industries": 3
    },
    {
      "name": "James Lee",
      "rating": 4.6,
      "status": "Active",
      "": "Valid",
      "location": "Singapore",
      "role": "Consultant",
      "expertise": ["Analyst", "Strategist", "Advisor"],
      "topics": ["Market Research", "Business Strategy", "Data Analysis", "Growth Planning"],
      "nda": "Submitted",
      "industries": 2,
      image: "https://randomuser.me/api/portraits/men/20.jpg",
    },
    {
      "name": "Maria Gomez",
      "rating": 4.9,
      "status": "Inactive",
      "nda_status": "Pending",
      "location": "Jakarta, Indonesia",
      "role": "Freelancer",
      "expertise": ["Designer", "Illustrator", "Creative Director"],
      "topics": ["Branding", "UI/UX Design", "Storytelling", "Visual Communication"],
      "nda": "Not Submitted",
      "industries": 4,
      image: "https://randomuser.me/api/portraits/women/30.jpg",
    }
  ]);

  const [viewMode, setViewMode] = useState("table");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedPartner, setSelectedPartner] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const showingFrom = indexOfFirstItem + 1;
  const showingTo = Math.min(indexOfLastItem, data.length);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const activeClass = "btn-dark-red";
  const inactiveClass = "btn-outline-dark-red";

  const handleAdd = () => {
    setModalMode("add");
    setSelectedPartner(null);
    setShowModal(true);
  };

  const handleEdit = (partner) => {
    setModalMode("edit");
    setSelectedPartner(partner);
    setShowModal(true);
  };

  const handleSubmit = (formData) => {
    if (modalMode === "add") {
      console.log("Tambah partner:", formData);
    } else {
      console.log("Update partner:", formData);
    }
    setShowModal(false);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
            <button className="btn btn-primary-gradient fw-bold d-flex align-items-center shadow-sm" onClick={handleAdd}>
              <LuPlus size={20} className="me-2" /> Add Expert
            </button>
          </div>

          {/* Controls */}
          <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded-4 shadow-sm border bg-white">

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

        <ExpertModal
          show={showModal}
          onHide={() => setShowModal(false)}
          mode={modalMode}
          initialData={selectedPartner}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Content;