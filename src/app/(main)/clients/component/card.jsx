import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { LuMapPin, LuMail, LuPhone, LuBuilding2, LuStar, LuPencil } from "react-icons/lu";
import { MdMoreVert } from 'react-icons/md';

// Ikon-ikon lain yang diimpor di awal juga dipertahankan jika memang ada:
// import { LuActivity, LuArrowUpRight, LuAward, LuBadge, LuBriefcase, LuFolderOpen, LuSmile, LuStar, LuTrendingUp, LuUser, LuUserCheck, LuZap } from "react-icons/lu";

const Card = ({ data, onEdit }) => {
  // Pastikan data adalah array dan tidak kosong sebelum merender
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="col-12"><p className="text-center text-muted">No company data available.</p></div>;
  }

  // Fungsi untuk mendapatkan inisial
  const getInitials = (name) => {
    if (!name) return '??';
    // Ambil huruf pertama dari maksimal dua kata
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="row g-4 align-items-stretch">
      {
        data.map((company, index) => {
          // Inisial untuk Primary Contact
          const initials = getInitials(company.contact_person);
          const [isHovered, setIsHovered] = useState(false);

          return (
            <div key={index} className="col-md-6 col-lg-4 col-xl-3">
              {/* 2. Gunakan h-100 dan d-flex flex-column pada card */}
              <div className="card border shadow-sm p-3 h-100"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>

                {/* Pembungkus Konten Utama (akan meregang) */}
                <div className="flex-grow-1">

                  <div className="d-flex justify-content-between align-items-start mb-3">

                    {/* Kiri: Icon, Company Name, Industry (menggunakan flex-column untuk stacking) */}
                    <div className="d-flex align-items-center">
                      {/* Icon Placeholder */}
                      <div className="bg-primary-subtle text-primary p-2 rounded-3 me-3 d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px' }}>
                        <LuBuilding2 size={20} />
                      </div>

                      {/* Nama Perusahaan dan Industri (stacking) */}
                      <div className="d-flex flex-column">
                        <p className="mb-1 fw-bolder">{company.company_name}</p>
                        <span className="badge bg-primary fs-2 text-white" style={{ alignSelf: 'flex-start' }}>
                          {company.industry}
                        </span>
                      </div>
                    </div>

                    {/* Kanan: Tombol Edit (menggunakan ms-auto untuk memposisikannya di paling kanan) */}
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

                        {/* Mengganti fungsi onClick menjadi onEdit(company) */}
                        <Dropdown.Menu className="p-1">
                          <Dropdown.Item className="list-edit px-3 py-1" onClick={() => onEdit(company)}>
                            <LuPencil size={14} className="me-2" />
                            <span className="fs-3 fw-bold">Edit</span>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>

                  <hr className="my-3" />

                  {/* Location Section: Menampilkan SEMUA Lokasi */}
                  <p className="text-uppercase text-muted small fw-medium mb-2">Locations ({company.locations.length})</p>
                  <div className="mb-3">
                    {company.locations.map((loc, index) => (
                      <div key={index} className="d-flex align-items-center mb-1">
                        <LuMapPin className="text-muted me-2" size={16} />
                        <p className="mb-0 text-dark small me-2">
                          {loc.city}, {loc.country}
                        </p>
                        {/* Penanda Primary Location */}
                        {loc.primary && (
                          <span className="badge bg-success-subtle text-success fs-2 d-flex align-items-center py-1">
                            <LuStar size={12} className="me-1" /> Primary
                          </span>
                        )}
                      </div>
                    ))}
                  </div>


                  <hr className="my-3" />

                  {/* Primary Contact Section */}
                  <p className="text-uppercase text-muted small fw-medium mb-2">Primary Contact</p>

                  {/* Contact Person */}
                  <div className="d-flex align-items-center mb-3">
                    {/* Simulasi Inisial Placeholder */}
                    <div className="bg-info-subtle text-info p-1 rounded-circle me-3 d-flex justify-content-center align-items-center" style={{ width: '30px', height: '30px' }}>
                      <span className="fw-medium small" style={{ color: '#6c757d' }}>{initials}</span>
                    </div>
                    <p className="mb-0 fw-semibold">{company.contact_person}</p>
                  </div>

                  {/* Email */}
                  <div className="d-flex align-items-center mb-2">
                    <LuMail className="text-muted me-2" size={18} />
                    <p className="mb-0 text-dark small">{company.email}</p>
                  </div>

                  {/* Phone */}
                  <div className="d-flex align-items-center mb-2">
                    <LuPhone className="text-muted me-2" size={18} />
                    <p className="mb-0 text-dark small">{company.phone}</p>
                  </div>
                </div> {/* Penutup flex-grow-1 */}

                {/* Optional: View Details Button (Contoh elemen yang akan terdorong ke bawah) */}
                {/* <div className="mt-4">
                  <button className="btn btn-outline-primary w-100">View Details</button>
                </div> */}
              </div>
            </div>
          );
        })
      }
    </div >
  );
}

export default Card;