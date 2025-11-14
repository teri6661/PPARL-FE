import React, { useState } from "react";
import { Badge, Dropdown } from "react-bootstrap";
import { LuMapPin, LuPencil, LuPlus, LuUser } from "react-icons/lu";
import { MdMoreVert, MdStar } from "react-icons/md";

const Card = ({ data, onEdit }) => { // onEdit ditambahkan sebagai prop
  const getInitials = (name) => {
    if (!name) return "NA";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-success";
      case "inactive":
        return "bg-secondary";
      default:
        // Diperbaiki agar kontras
        return "bg-dark text-white";
    }
  };

  const getNDAColor = (ndaStatus) => {
    switch (ndaStatus?.toLowerCase()) {
      case "expired":
        return "bg-danger";
      case "valid":
        return "bg-success";
      case "pending":
        return "bg-warning text-dark";
      default:
        // Diperbaiki agar kontras
        return "bg-secondary text-white";
    }
  };

  return (
    <div className="row g-3">
      {data.map((expert, index) => {
        const [isHovered, setIsHovered] = useState(false);
        return (
          <div key={index} className="col-md-6 col-lg-4 col-xl-3">
            <div className="card border shadow-sm p-3 h-100"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {expert.image ? (
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="rounded-circle object-fit-cover"
                      style={{ width: 48, height: 48 }}
                    />
                  ) : (
                    <span className="avatar-initial">
                      {expert.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </span>
                  )}
                  <div>
                    <h6 className="fw-semibold fs-3 mb-2">{expert.name}</h6>
                    {/* PERBAIKAN UTAMA: Tambahkan flex-wrap di sini */}
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <MdStar color="#ffc107" />
                      <span className="fw-semibold">{expert.rating}</span>
                      <Badge className={`${getStatusColor(expert.status)} fw-bold fs-2`}>
                        {expert.status}
                      </Badge>
                      <Badge className={`${getNDAColor(expert.nda_status)} fw-bold fs-2`}>
                        NDA {expert.nda_status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Dropdown (3 titik vertikal) */}
                {isHovered && (
                  <Dropdown align="end">
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

                    {/* Mengganti fungsi onClick menjadi onEdit(expert) */}
                    <Dropdown.Menu className="p-1">
                      <Dropdown.Item className="list-edit px-3 py-1" onClick={() => onEdit(expert)}>
                        <LuPencil size={14} className="me-2" />
                        <span className="fs-3 fw-bold">Edit</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>

              <div className="mt-3 text-muted small">
                <div className="d-flex align-items-center text-dark fw-bold fs-2 mb-2">
                  <LuMapPin size={14} className="me-2" />
                  <span>{expert.location}</span>
                </div>
                <div className="d-flex align-items-center text-dark fw-bold fs-2 mb-2">
                  <LuUser size={14} className="me-2" />
                  <span>{expert.role}</span>
                </div>

                <div className="mb-2">
                  <strong className="text-dark d-block">Expertise</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {expert.expertise.map((item, i) => (
                      <Badge key={i} bg="secondary" text="white" className="border fs-2">
                        {item}
                      </Badge>))}
                  </div>
                </div>

                <div className="mb-2">
                  <strong className="text-dark d-block">Topics</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {expert.topics.slice(0, 2).map((item, i) => (
                      <Badge key={i} bg="primary" className="text-white fs-2"> {/* Ganti secondary ke primary untuk warna biru pada gambar */}
                        {item}
                      </Badge>
                    ))}
                    {expert.topics.length > 2 && (
                      <Badge bg="secondary" className="text-white fs-2">
                        <LuPlus className="text-white" />{expert.topics.length - 2}
                      </Badge>)}
                  </div>
                </div>

                <hr />

                <div className="d-flex justify-content-between small text-dark">
                  <span className="fs-2">NDA: {expert.nda}</span>
                  <span className="fs-2">{expert.industries} Industries</span>
                </div>
              </div>
            </div>
          </div >
        )
      })}
    </div >
  );
};

export default Card;