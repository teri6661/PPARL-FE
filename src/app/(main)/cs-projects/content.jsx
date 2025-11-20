'use client';
import { useState } from "react";
import { LuLayoutGrid, LuPlus, LuSearch, LuTable2 } from "react-icons/lu";
// Pastikan komponen ini ada dan berfungsi sesuai harapan
import ProjectModal from "./component/project-modal";
import Table from "./component/table";
import Card from "./component/card";

// Array data yang disesuaikan agar sesuai dengan gambar
const projectDataFromImage = [
  {
    "project_code": "P001",
    "project_title": "Leadership Excellence Program",
    "client": { value: "Client A", label: "Client A" }, // Diubah menjadi format objek React-Select
    "category": "Training", // Harus sesuai dengan nilai string dari categoryOptions
    "status": "Completed", // Harus sesuai dengan nilai string dari statusOptions
    "project_leader": "AB",
    "project_support": "AB",

    // --- Data Fee (Baru) ---
    "total_amount": 15000,
    "currency": "USD",
    "fee_structure": "Fixed Fee",

    // --- Experts (Updated to match modal structure) ---
    "experts_forwarded": [1], // Hanya ID expert yang diforward
    "assignedExperts": [ // Detail lengkap expert yang ditugaskan (seperti state `assignedExperts`)
      {
        id: 1,
        name: "Sarah Martinez",
        initial: "SM",
        image: null,
        fee_amount: 5000,
        currency: "USD",
        rate_type: "daily",
        estimated_days: 3,
      },
    ],

    // --- Dates & Docs (Baru) ---
    "start_date": new Date("2024-01-10"),
    "end_date": new Date("2024-01-20"),
    "project_execution_date": new Date("2024-01-15"),
    "sa_date": new Date("2024-01-05"),
    "client_billed_date": new Date("2024-01-22"),
    "client_paid_date": new Date("2024-02-01"),
    "expert_invoice_date": new Date("2024-01-25"),
    "expert_paid_date": new Date("2024-02-05"),
    "case_study_link": "https://case.study/p001",
    "thank_you_link": "https://thank.you/p001",
    "remarks": "Project P001 completed successfully with high client satisfaction.",
    "location": "Singapore",
    "country_code": "SG",
    // File fields (sa_file, billing_file, dll.) biasanya diisi `null` atau metadata file
    // Untuk dummy data mode edit, kita biarkan `null` atau `undefined` jika tidak perlu diisi.
  },
  {
    "project_code": "P002",
    "project_title": "Digital Innovation Summit",
    "client": { value: "Client B", label: "Client B" },
    "category": "Marketing Campaign",
    "status": "Active",
    "project_leader": "AB",
    "project_support": "AB",

    "total_amount": 35000,
    "currency": "EUR",
    "fee_structure": "Hourly Rate",

    "experts_forwarded": [1, 2, 3], // ID expert yang diforward (1, 2, 3)
    "assignedExperts": [
      {
        id: 2,
        name: "Amanda Lee",
        initial: "AL",
        image: "https://randomuser.me/api/portraits/women/32.jpg",
        fee_amount: 150,
        currency: "EUR",
        rate_type: "hourly",
        estimated_days: 10,
      },
    ], // Hanya Amanda Lee yang ditugaskan

    "start_date": new Date("2024-01-20"),
    "end_date": new Date("2024-03-30"),
    "project_execution_date": null,
    "sa_date": new Date("2024-01-18"),
    "client_billed_date": null,
    "client_paid_date": null,
    "expert_invoice_date": null,
    "expert_paid_date": null,
    "case_study_link": "",
    "thank_you_link": "",
    "remarks": "Project P002 is currently active and requires ongoing support.",
    "location": "Hong Kong",
    "country_code": "HK",
  },
  {
    "project_code": "P003",
    "project_title": "Change Management Workshop",
    "client": { value: "Client C", label: "Client C" },
    "category": "Research & Development",
    "status": "Planning",
    "project_leader": "AB",
    "project_support": "AB",

    "total_amount": 8000,
    "currency": "IDR",
    "fee_structure": "Fixed Fee",

    "experts_forwarded": [4],
    "assignedExperts": [], // Belum ada expert yang ditugaskan

    "start_date": new Date("2024-02-01"),
    "end_date": new Date("2024-02-15"),
    "project_execution_date": null,
    "sa_date": null,
    "client_billed_date": null,
    "client_paid_date": null,
    "expert_invoice_date": null,
    "expert_paid_date": null,
    "case_study_link": null,
    "thank_you_link": null,
    "remarks": "Planning phase. Awaiting expert confirmation.",
    "location": "Jakarta",
    "country_code": "ID",
  }
];

// Catatan: Karena saya tidak memiliki kode untuk komponen ProjectModal, Table, dan Card, 
// saya menggunakan komponen yang ada (Table, Card) dalam render, tetapi fungsionalitasnya
// sangat bergantung pada kode eksternal Anda.

const Content = () => {
  // Menggunakan data baru dari gambar
  const [data, setData] = useState(projectDataFromImage);

  const [viewMode, setViewMode] = useState("table");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedPartner, setSelectedPartner] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Dibuat 10 untuk memungkinkan pagination diuji jika data bertambah
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const showingFrom = indexOfFirstItem + 1;
  const showingTo = Math.min(indexOfLastItem, data.length);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Warna kustom untuk tombol view mode agar sesuai dengan tema di gambar
  // Perhatikan bahwa kelas CSS 'btn-dark-red' dan 'btn-outline-dark-red'
  // harus didefinisikan dalam styling Anda agar berfungsi dengan benar.
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
      // Tambahkan logika untuk menambahkan data ke state 'data'
    } else {
      console.log("Update partner:", formData);
      // Tambahkan logika untuk mengupdate data di state 'data'
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
              <p className="fs-6 fw-bolder text-primary-gradient mb-0">CS Projects</p>
              <p className="text-dark mb-0">Manage and track all your projects</p>
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
              // Anda perlu memastikan komponen Table Anda dapat menerima dan merender data baru
              // dengan properti seperti 'client' dan 'assignment_expert' (untuk Assigned Experts).
              // Asumsi: Table component ada di "./component/table"
              <Table data={currentItems} onEdit={handleEdit} totalData={data.length} />
            ) : (
              // Asumsi: Card component ada di "./component/card"
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

        {/* Modal untuk Add/Edit */}
        {/* Asumsi: ProjectModal component ada di "./component/project-modal" */}
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