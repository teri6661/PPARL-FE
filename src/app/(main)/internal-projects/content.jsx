'use client';
import { useState } from "react";
import { LuLayoutGrid, LuPlus, LuSearch, LuTable2 } from "react-icons/lu";
import ProjectModal from "./component/project-modal";
import Table from "./component/table";
import Card from "./component/card";

const Content = () => {
  const [data, setData] = useState([
    {
      "project_code": "INTP-2024-001",
      "project_title": "Digital Learning Platform Research",
      "category": "Research & Development",
      "project_leader": "Michael Chen",
      "status": "Planning",
      "start_date": "2/1/2024",
      "end_date": "5/15/2024"
    },
    {
      "project_code": "INTP-2024-002",
      "project_title": "Expert Onboarding Process Enhancement",
      "category": "Process Improvement",
      "project_leader": "Sarah Johnson",
      "status": "Active",
      "start_date": "1/15/2024",
      "end_date": "3/30/2024"
    },
    {
      "project_code": "INTP-2024-003",
      "project_title": "Q3 Marketing Campaign Strategy",
      "category": "Marketing",
      "project_leader": "David Lee",
      "status": "Completed",
      "start_date": "6/1/2024",
      "end_date": "8/31/2024"
    },
    {
      "project_code": "INTP-2024-004",
      "project_title": "Internal Tool Migration",
      "category": "IT & Infrastructure",
      "project_leader": "Emily Wang",
      "status": "On Hold",
      "start_date": "4/10/2024",
      "end_date": "10/10/2024"
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
              <p className="fs-6 fw-bolder text-primary-gradient mb-0">Internal Projects</p>
              <p className="text-dark mb-0">Manage internal projects and track progress</p>
            </div>
            <button className="btn btn-primary-gradient fw-bold d-flex align-items-center shadow-sm" onClick={handleAdd}>
              <LuPlus size={20} className="me-2" /> Add Project
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

        <ProjectModal
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