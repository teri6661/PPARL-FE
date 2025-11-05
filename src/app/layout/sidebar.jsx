/* eslint-disable @next/next/no-img-element */
"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { LuChartColumn, LuUsers, LuFileText, LuUser, LuFolder, LuFolderOpen, LuHandshake, LuBriefcase, LuActivity, LuUserCheck, LuBuilding2, LuMonitorSpeaker } from 'react-icons/lu';

const Sidebar = forwardRef((props, ref) => {
  const barRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 💡 FUNGSI BARU: Menentukan kelas aktif untuk sub-path.
  const getActiveClass = (href) => {
    // Trik untuk membedakan antara '/' (Dashboard) dan semua yang lain:
    if (href === "/home") {
      // Hanya aktif jika persis '/home' atau path root (jika Anda anggap /home adalah root)
      return pathname === href ? "active" : "";
    }

    // Untuk path seperti '/client', cek apakah pathname dimulai dengan '/client'
    // Perhatikan penambahan pengecekan '/' di belakang untuk menghindari match seperti '/client-settings'
    // Namun, untuk kasus umum, cukup cek apakah pathname diawali dengan href-nya.
    const pathToCheck = href.length > 1 ? href : pathname;

    // Jika pathname dimulai dengan href (case-insensitive & hanya cek dari awal)
    // Contoh: "/client/settings" dimulai dengan "/client" -> true
    // Contoh: "/home" dimulai dengan "/client" -> false
    if (pathname.startsWith(href)) {
      return "active";
    }

    return "";
  };

  const handleCloseSidebar = () => {
    const mainWrapper = document.getElementById("main-wrapper");

    // Jika sidebar harus ditutup, kita hapus semua kontrol yang membuatnya terlihat.

    // 1. Bersihkan main-wrapper
    if (mainWrapper) {
      // Hapus class overlay/show dari main-wrapper
      mainWrapper.classList.remove("show-sidebar");
    }

    document.body.setAttribute("data-sidebartype", "full");
  };

  return (
    <aside className="left-sidebar with-vertical">
      <div>
        {/* Header logo */}
        <div className="brand-logo d-flex align-items-center justify-content-between border-bottom border-2">
          <a
            href="#"
            className="text-nowrap logo-img"
          >
            <img
              src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/logos/dark-logo.svg"
              className="dark-logo"
              alt="Logo-Dark"
            />
          </a>
          <button
            className="sidebartoggler ms-auto text-decoration-none fs-5 d-block d-xl-none border-0 bg-transparent"
            aria-label="Close sidebar"
            onClick={() => handleCloseSidebar()}
          >
            <IoClose />
          </button>

        </div>

        {/* Sidebar navigation */}
        <SimpleBar className="sidebar-nav scroll-sidebar" ref={barRef} style={{ visibility: mounted ? "visible" : "hidden" }}>
          <ul id="sidebarnav">

            {/* Dashboard */}
            <li className="sidebar-item my-2">
              <Link
                className={`sidebar-link ${pathname === "/dashboard" ? "active" : ""} d-flex align-items-center gap-2`}
                href="/dashboard"
              >
                {/* Ikon Dashboard: LuChartColumn mirip dengan yang di gambar */}
                <LuChartColumn size={20} />
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>

            {/* Clients */}
            <li className="sidebar-item my-2">
              <Link
                className={`sidebar-link ${getActiveClass("/clients")} d-flex align-items-center gap-2`}
                href="/clients"
              >
                {/* Ikon Klien/Pengguna: Mirip LuBuilding2 */}
                <LuBuilding2 size={20} />
                <span className="hide-menu">Clients</span>
              </Link>
            </li>

            {/* Client Portal */}
            <li className="sidebar-item my-2">
              <Link
                className={`sidebar-link ${getActiveClass("/client-portal")} d-flex align-items-center gap-2`}
                href="/client-portal"
              >
                {/* Ikon Portal: Seperti file di papan klip */}
                <LuMonitorSpeaker size={20} />
                <span className="hide-menu">Client Portal</span>
              </Link>
            </li>

            {/* CS Projects */}
            <li className="sidebar-item my-2">
              <Link
                className={`sidebar-link ${getActiveClass("/cs-projects")} d-flex align-items-center gap-2`}
                href="/cs-projects"
              >
                {/* Ikon CS Projects: Folder Terbuka */}
                <LuFolderOpen size={20} />
                <span className="hide-menu">CS Projects</span>
              </Link>
            </li>

            {/* Internal Projects */}
            <li className="sidebar-item my-2">
              <Link
                className={`sidebar-link ${getActiveClass("/internal-projects")} d-flex align-items-center gap-2`}
                href="/internal-projects"
              >
                {/* Ikon Internal Projects: Folder Tertutup */}
                <LuFolder size={20} />
                <span className="hide-menu">Internal Projects</span>
              </Link>
            </li>

            {/* Experts */}
            <li className="sidebar-item my-2">
              <Link
                className={`sidebar-link ${getActiveClass("/experts")} d-flex align-items-center gap-2`}
                href="/experts"
              >
                {/* Ikon Ahli: Mirip LuUser, sering dipakai untuk profil/ahli */}
                <LuUserCheck size={20} />
                <span className="hide-menu">Experts</span>
              </Link>
            </li>

            {/* Partners */}
            <li className="sidebar-item my-2">
              <Link
                className={`sidebar-link ${getActiveClass("/partners")} d-flex align-items-center gap-2`}
                href="/partners"
              >
                {/* Ikon Partner: Jabat Tangan */}
                <LuHandshake size={20} />
                <span className="hide-menu">Partners</span>
              </Link>
            </li>

            {/* Accounts */}
            <li className="sidebar-item my-2">
              <Link
                className={`sidebar-link ${getActiveClass("/accounts")} d-flex align-items-center gap-2`}
                href="/accounts"
              >
                {/* Ikon Akun: Mirip Dompet/Tas Kerja */}
                <LuUsers size={20} />
                <span className="hide-menu">Accounts</span>
              </Link>
            </li>

            {/* Employment Status */}
            <li className="sidebar-item my-2">
              <Link
                className={`sidebar-link ${getActiveClass("/employment-status")} d-flex align-items-center gap-2`}
                href="/employment-status"
              >
                {/* Ikon Status Pekerjaan: Mirip Koper/Tas Dokumen */}
                <LuBriefcase size={20} />
                <span className="hide-menu">Employment Status</span>
              </Link>
            </li>

            {/* Activity Logs (Yang ada di kode Anda) */}
            <li className="sidebar-item my-2">
              <Link
                className={`sidebar-link ${getActiveClass("/activity-logs")} d-flex align-items-center gap-2`}
                href="/activity-logs"
              >
                {/* Ikon Activity Logs: Garis gelombang/detak jantung */}
                <LuActivity size={20} />
                <span className="hide-menu">Activity Logs</span>
              </Link>
            </li>

          </ul>
        </SimpleBar>

        {/* Profile Section */}
        <div className="fixed-profile p-3 mx-4 mb-2 bg-secondary-subtle rounded mt-3">
          <div className="hstack gap-3">
            <div className="john-img">
              <img
                src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg"
                className="rounded-circle"
                width="40"
                height="40"
                alt="User"
              />
            </div>
            <div className="john-title">
              <h6 className="mb-0 fs-4 fw-semibold">Mathew</h6>
              <span className="fs-2">Designer</span>
            </div>
            <button
              className="border-0 bg-transparent text-primary ms-auto"
              type="button"
              aria-label="Logout"
            >
              <i className="ti ti-power fs-6"></i>
            </button>
          </div>
        </div>
      </div>
    </aside >
  );
});

export default Sidebar;