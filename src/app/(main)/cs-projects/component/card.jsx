import moment from "moment";
import React, { useState } from "react";
import { Badge, Dropdown } from "react-bootstrap";
import { LuCalendar, LuPencil, LuUsers, LuHash, LuUser, LuFolderOpen, LuBuilding2 } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";

const Card = ({ data, onEdit }) => {

  // Fungsi untuk mendapatkan warna Status Badge
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-success"; // Ungu (sesuai gambar)
      case "confirm":
        return "bg-primary"; // Teal/Biru-hijau
      case "post-event":
        return "bg-secondary";
      case "active":
        return "bg-success";
      case "planning":
        return "bg-warning";
      case "completed":
        return "bg-info";
      default:
        return "bg-dark";
    }
  };

  const customBadgeStyles = {
    '--bs-bg-purple': '#9333ea', // Ungu
    '--bs-bg-teal': '#20c997', // Teal/Biru-hijau
  };



  return (
    <div className="row g-3" style={customBadgeStyles}>
      {data.map((project, index) => {
        const [isHovered, setIsHovered] = useState(false);
        const selectedExpert = project.assignedExperts && project.assignedExperts.length > 0
          ? project.assignedExperts[0]
          : null;
        return (
          <div key={index} className="col-md-6 col-lg-4 col-xl-3">
            <div className="card border shadow-sm p-3 h-100"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              {/* Bagian Header dan Dropdown */}
              <div className="d-flex justify-content-between align-items-start">
                <h6 className="fw-semibold fs-3 mb-2">{project.project_title}</h6>

                {/* Dropdown (3 titik vertikal) */}
                {isHovered && (
                  <Dropdown align="end" className="ms-2">
                    <Dropdown.Toggle
                      className="d-flex align-items-center justify-content-center border-0 shadow-none rounded-circle no-caret"
                      id={`dropdown-more-${index}`}
                      as="button"
                      style={{
                        width: "20px",
                        height: "20px",
                        background: "#bababa",
                        padding: 0,
                        color: 'white'
                      }}
                    >
                      <MdMoreVert size={14} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="p-1">
                      <Dropdown.Item className="list-edit px-3 py-1" onClick={() => onEdit(project)}>
                        <LuPencil size={14} className="me-2" />
                        <span className="fs-3 fw-bold">Edit</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>

              {/* Project Code */}
              <div className="d-flex justify-content-start align-items-center mb-1">
                <p className="fw-bolder fs-2 mb-0 me-2">
                  {project.project_code || 'No Project'}
                </p>

                {/* BADGE STATUS: Diposisikan di pinggir kanan atas, sejajar dengan judul */}
                <Badge className={`${getStatusColor(project.status)} fw-bold fs-2`}>
                  {project.status}
                </Badge>
              </div>

              {/* Bagian Detail Proyek */}
              <div className="small text-muted mt-4">

                {/* Client Name */}
                <div className="mb-2">
                  <div className="d-flex align-items-center">
                    <LuBuilding2 size={14} className="me-2 text-dark" />
                    <span className="fw-semibold text-dark fs-2">{project.client.label}</span>
                  </div>
                </div>

                {/* Category */}
                <div className="mb-2">
                  <div className="d-flex align-items-center">
                    <LuFolderOpen size={14} className="me-2 text-dark" />
                    <span className="fw-semibold text-dark fs-2">{project.category}</span>
                  </div>
                </div>

                {/* Date */}
                <div className="mb-2">
                  <div className="d-flex align-items-center">
                    <LuCalendar size={14} className="me-2 text-dark" />
                    <span className="fw-semibold text-dark fs-2">
                      {moment(project.start_date).format("DD-MM-YYYY")}
                    </span>
                  </div>
                </div>

                {/* Leader */}
                <div className="mb-2">
                  <div className="d-flex align-items-center">
                    <LuUser size={14} className="me-2 text-dark" />
                    <span className="fw-semibold text-dark fs-2">
                      Leader: {project.leader}
                    </span>
                  </div>
                </div>

                {/* Support */}
                <div className="mb-2">
                  <div className="d-flex align-items-center">
                    <LuUser size={14} className="me-2 text-dark" />
                    <span className="fw-semibold text-dark fs-2">
                      Support: {project.support}
                    </span>
                  </div>
                </div>

                {/* Assigned Experts (Avatar List) */}
                <div className="mb-2">
                  <div className="d-flex align-items-center">
                    <LuUsers size={14} className="me-2 text-dark" />
                    {/* ITERASI UNTUK AVATAR BERTUMPUK */}
                    {project.assignedExperts && project.assignedExperts.map((expert, index) => (
                      expert.image ? (
                        <img
                          key={index}
                          src={expert.image}
                          alt={expert.name}
                          className="rounded-circle object-fit-cover me-1"
                          style={{ width: 30, height: 30 }}
                        />
                      ) : (
                        <span key={index} className="avatar-initial me-1 fs-2" style={{ width: 30, height: 30 }}>
                          {expert.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()}
                        </span>
                      )
                    ))}
                  </div>
                </div>

                <hr className="my-3" />

                <div className="d-flex align-items-center">
                  {selectedExpert && (
                    <div className="d-flex align-items-center">
                      {/* 1. Avatar (Gambar atau Inisial) */}
                      <div className="me-2">
                        {selectedExpert.image ? (
                          <img
                            // key={index} Dihapus karena index tidak tersedia di scope ini
                            src={selectedExpert.image}
                            alt={selectedExpert.name}
                            className="rounded-circle object-fit-cover"
                            style={{ width: 30, height: 30 }} // Ukuran 40x40 agar sesuai gambar
                          />
                        ) : (
                          <span key={index} className="avatar-initial me-1 fs-2" style={{ width: 30, height: 30 }}>
                            {selectedExpert.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .substring(0, 2)
                              .toUpperCase()}
                          </span>
                        )}
                      </div>
                      {/* 2. Teks (Selected Expert & Nama) */}
                      <div className="fs-6">
                        <p className="mb-0 text-muted fs-2">Selected Expert</p>
                        <p className="fw-semibold text-dark fs-3 mb-0" style={{ lineHeight: 1.2 }}>
                          {/* Gunakan nama ahli (asumsi nama lengkap ada di 'name' atau 'fullname') */}
                          {selectedExpert.name || 'N/A'}
                        </p>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>
          </div>
        );
      })}
    </div >
  );
};

export default Card;