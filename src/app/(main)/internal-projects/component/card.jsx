import React, { useState } from "react";
import { Badge, Dropdown } from "react-bootstrap";
import { LuCalendar, LuPencil, LuUser, LuHash } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";

const Card = ({ data, onEdit }) => {

  // Fungsi untuk mendapatkan warna Status Badge
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-success";
      case "planning":
        return "bg-warning"; // Ganti menjadi warna yang lebih sesuai dengan Planning
      case "completed":
        return "bg-secondary";
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
        return (
          <div key={index} className="col-md-6 col-lg-4 col-xl-3">
            <div className="card border shadow-sm p-3 h-100"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              {/* Bagian Header dan Dropdown */}
              <div className="d-flex justify-content-between align-items-start">
                <p className="fw-bolder mb-1">{project.project_title || 'No Project'}</p>

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

              {/* Bagian Detail Proyek */}
              <div className="small text-muted mt-4">
                {/* Project Code */}
                <div className="mb-2">
                  <p className="mb-1 text-dark fw-normal fs-2">Project Code</p>
                  <div className="d-flex align-items-center">
                    <LuHash size={14} className="me-2 text-dark" />
                    <span className="fw-semibold text-purple fs-2">{project.project_code}</span>
                  </div>
                </div>

                {/* Category */}
                <div className="mb-2">
                  <p className="mb-1 text-dark fw-normal fs-2">Category</p>
                  <span className="fw-semibold border fs-2 badge text-light-purple bg-light-purple">{project.category}</span>
                </div>

                {/* Project Leader */}
                <div className="mb-2">
                  <p className="mb-1 text-dark fw-normal fs-2">Project Leader</p>
                  <div className="d-flex align-items-center">
                    <LuUser size={14} className="me-2 text-dark" />
                    <span className="fw-semibold text-dark fs-2">{project.project_leader}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-3">
                  <p className="mb-1 text-dark fw-normal fs-2">Timeline</p>
                  <div className="d-flex align-items-center">
                    <LuCalendar size={14} className="me-2 text-dark" />
                    <span className="fw-semibold text-dark fs-2">
                      {project.start_date} - {project.end_date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bagian Status (di bagian bawah kartu) */}
              <div>
                <p className="mb-1 text-dark fw-normal fs-2">Status</p>
                <Badge className={`${getStatusColor(project.status)} fw-bold fs-2`}>
                  {project.status}
                </Badge>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;