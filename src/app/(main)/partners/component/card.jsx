import React, { useState } from "react";
import moment from "moment";
import { Dropdown } from "react-bootstrap";
import { LuMail, LuCalendar, LuPencil, LuMapPin, LuWrench, LuPhone, LuGlobe, LuUser } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";

const Card = ({ data, onEdit }) => {

  const getStatusBadgeClass = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'active':
        return 'bg-success';
      case 'inactive':
        return 'bg-danger';
      case 'former':
        return 'bg-primary';
      default:
        return 'bg-secondary';
    }
  };

  // Fungsi utilitas untuk kelas Badge Tipe Partner
  const getTypeBadgeClass = (type) => {
    switch ((type || '').toLowerCase()) {
      case 'technology':
      case 'vendor':
        return 'bg-primary';
      case 'strategic':
        return 'bg-success';
      case 'reseller':
        return 'bg-warning text-dark';
      case 'consultant':
        return 'bg-info text-dark';
      case 'other':
      default:
        return 'bg-light text-dark border';
    }
  };

  // Memformat nama perusahaan untuk inisial Avatar
  const getInitials = (name) => {
    if (!name) return 'NA';
    const words = name.split(" ");
    let initials = '';
    if (words.length > 0) initials += words[0][0];
    if (words.length > 1) initials += words[1][0];
    return initials.toUpperCase();
  };

  // Asumsi: data adalah array objek partner
  return (
    <div className="row g-3">
      {data.map((partner, index) => {
        const [isHovered, setIsHovered] = useState(false);
        return (
          <div key={index} className="col-md-6 col-lg-4 col-xl-3">
            <div className="card border shadow-sm p-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <div
                    className="avatar-initial me-3 d-flex justify-content-center align-items-center rounded-circle fw-bold"
                    style={{
                      backgroundColor: '#e0b0ff',
                      color: '#6a0dad',
                      width: '40px',
                      height: '40px',
                      fontSize: '18px',
                    }}
                  >
                    {getInitials(partner.company_name)}
                  </div>

                  <div>
                    {/* Nama Perusahaan */}
                    <p className="fw-bolder mb-1">{partner.company_name || 'No Name'}</p>

                    {/* Tipe & Status Kemitraan */}
                    <div className="d-flex gap-2">
                      <span className={`badge text-bg-primary fw-bold fs-2`}>
                        {partner.partner_type || 'N/A'}
                      </span>
                      <span className={`badge ${getStatusBadgeClass(partner.partnership_status)} fw-bold fs-2`}>
                        {partner.partnership_status || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dropdown (3 titik vertikal) */}
                {isHovered && (
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      className="d-flex align-items-center justify-content-center border-0 shadow-none rounded-circle no-caret"
                      id={`dropdown-more-${partner.company_name}`}
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
                      <Dropdown.Item className="list-edit px-3 py-1" onClick={() => onEdit(partner)}>
                        <LuPencil size={14} className="me-2" />
                        <span className="fs-3 fw-bold">Edit</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>

              <hr className="my-2" />

              {/* Informasi Utama 1: Industri */}
              <div className="d-flex align-items-center text-dark mb-2">
                <LuWrench size={14} className="me-2 text-muted" />
                <span className="fs-3 fw-bold">{partner.industry || 'No Industry'}</span>
              </div>


              {/* Informasi Utama 2: Email */}
              <div className="d-flex align-items-center text-muted mb-2">
                <LuUser size={14} className="me-2" />
                <span className="fs-3">{partner.contactPerson || 'N/A'}</span>
              </div>
              <div className="d-flex align-items-center text-muted mb-2">
                <LuPhone size={14} className="me-2" />
                <span className="fs-3">{partner.phone || 'N/A'}</span>
              </div>
              <div className="d-flex align-items-center text-muted mb-2">
                <LuMail size={14} className="me-2" />
                <span className="fs-3">{partner.email || 'N/A'}</span>
              </div>
              <div className="d-flex align-items-center text-muted mb-2">
                <LuMapPin size={14} className="me-2" />
                <span className="fs-3">{partner.location || 'N/A'}</span>
              </div>
              <div className="d-flex align-items-center text-muted mb-2">
                <LuGlobe size={14} className="me-2" />
                <span className="fs-3">{partner.website || 'N/A'}</span>
              </div>
              <div className="d-flex align-items-center text-muted">
                <LuCalendar size={14} className="me-2" />
                <span className="fs-3">Joined: {partner.partnership_date ? moment(partner.partnership_date).format("MMM YYYY") : 'N/A'}</span>
              </div>

            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Card;