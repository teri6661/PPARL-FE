'use client';
import { useState } from "react";
import { LuLayoutGrid, LuPlus, LuSearch, LuTable2 } from "react-icons/lu";
import PartnerModal from "./component/partner-modal";
import Table from "./component/table";
import Card from "./component/card";

const Content = () => {
  const [data, setData] = useState([
    {
      company_name: 'Tech Global Ltd.',
      partner_type: 'vendor',
      industry: 'Information Technology',
      location: 'New York, USA',
      website: 'https://techglobal.com',
      partnership_status: 'active',
      contactPerson: 'John Doe',
      email: 'john.doe@techglobal.com',
      phone: '+1-212-555-1234',
      partnership_date: '2023-06-15',
      contract_endate: '2025-06-15',
      notes: 'Top-tier technology partner providing cloud infrastructure.',
    },
    {
      company_name: 'Bright Marketing Co.',
      partner_type: 'distributor',
      industry: 'Advertising & Marketing',
      location: 'Sydney, Australia',
      website: 'https://brightmarketing.au',
      partnership_status: 'active',
      contactPerson: 'Alice Smith',
      email: 'alice.smith@brightmarketing.au',
      phone: '+61-2-8888-9090',
      partnership_date: '2022-09-10',
      contract_endate: '2024-09-10',
      notes: 'Handles regional digital marketing campaigns.',
    },
    {
      company_name: 'Global Retail Partners',
      partner_type: 'reseller',
      industry: 'Retail & Distribution',
      location: 'London, UK',
      website: 'https://globalretailpartners.co.uk',
      partnership_status: 'inactive',
      contactPerson: 'Michael Brown',
      email: 'michael.brown@grp.co.uk',
      phone: '+44-20-5555-7777',
      partnership_date: '2021-01-01',
      contract_enddate: '2023-01-01',
      notes: 'Partnership expired; pending renewal discussion.',
    },
  ]);

  const [viewMode, setViewMode] = useState("table");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedPartner, setSelectedPartner] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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
        <div className="row mb-4">

          {/* 1. Header Halaman */}
          <div className="d-flex justify-content-between align-items-center p-3 mb-4 rounded-4 shadow-sm border border-gray-400" style={{ backgroundColor: '#fbf5fd' }}>
            <div>
              <p className="fs-6 fw-bolder text-primary-gradient mb-0">Partners</p>
              <p className="text-dark mb-0">Manage business partnerships and collaborations</p>
            </div>
            <button className="btn btn-primary-gradient fw-bold d-flex align-items-center shadow-sm" onClick={handleAdd}>
              <LuPlus size={20} className="me-2" /> Add Partner
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
                className={`btn ${viewMode === 'cards' ? activeClass : inactiveClass}`}
                onClick={() => setViewMode('cards')}
              >
                <LuLayoutGrid size={16} /> <span className="d-none d-md-inline ms-1">Cards</span>
              </button>
              <button
                type="button"
                className={`btn ${viewMode === 'table' ? activeClass : inactiveClass}`}
                onClick={() => setViewMode('table')}
              >
                <LuTable2 size={16} /> <span className="d-none d-md-inline ms-1">Table</span>
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

        <PartnerModal
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
