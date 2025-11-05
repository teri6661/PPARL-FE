import { LuFolderOpen, LuHandshake, LuMonitorSpeaker, LuPlus, LuUserCheck, LuUsers } from "react-icons/lu";
import CardTotal from "./component/card-total";
import Link from "next/link";

const Content = () => {

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12 text-center">
            {/* Judul utama dengan warna ungu dari template */}
            <h1 className="fw-bold mb-2 text-primary-gradient" style={{ fontSize: '2.5rem' }}>
              PPEARL Management System
            </h1>
            {/* Sub-judul deskripsi */}
            <p className="lead">
              Your comprehensive platform for managing experts, projects, and client relationships
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row mb-5 justify-content-center">
          <div className="col-auto d-flex flex-wrap justify-content-center gap-3">

            {/* Tombol 1: Add Expert */}
            <Link href="/experts" className="btn btn-primary-gradient fw-bold text-white d-flex align-items-center gap-2 shadow-sm">
              <LuUserCheck size={20} className="me-2" />
              Add Expert
              <LuPlus size={20} className="ms-2" />
            </Link>

            {/* Tombol 2: Create Project */}
            <Link href="/cs-projects" className="btn btn-primary-gradient fw-bold text-white d-flex align-items-center gap-2 shadow-sm"
              style={{ background: '#ec4899', border: 'none' }}>
              <LuFolderOpen size={20} className="me-2" />
              Create Project
              <LuPlus size={20} className="ms-2" />
            </Link>

            {/* Tombol 3: Add Client */}
            <Link href="/clients" className="btn btn-primary-gradient fw-bold text-white d-flex align-items-center gap-2 shadow-sm"
              style={{ background: '#3b82f6', border: 'none' }}>
              <LuMonitorSpeaker size={20} className="me-2" />
              Add Client
              <LuPlus size={20} className="ms-2" />
            </Link>

            {/* Tombol 4: Add Partner */}
            <Link href="/partners" className="btn btn-primary-gradient fw-bold text-white d-flex align-items-center gap-2 shadow-sm"
              style={{ background: '#f59e0b', border: 'none' }}>
              <LuHandshake size={20} className="me-2" />
              Add Partner
              <LuPlus size={20} className="ms-2" />
            </Link>

          </div>
        </div>

        {/* Ini adalah tempat untuk meletakkan 4 card statistik yang sebelumnya kita buat */}
        <CardTotal />

      </div>
    </div>
  );
};

export default Content;