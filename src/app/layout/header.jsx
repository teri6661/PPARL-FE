"use client";
import Link from "next/link";
import { useState } from "react";
import { LuMail, LuUser } from "react-icons/lu";
import { TbMenu2 } from "react-icons/tb";
import { GoKebabHorizontal } from "react-icons/go";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    // Dapatkan elemen main-wrapper HANYA SEKALI
    const mainWrapper = document.getElementById("main-wrapper");
    // 💻 DESKTOP: Lakukan Toggle pada 'data-sidebartype'
    const currentType = document.body.getAttribute("data-sidebartype");
    const newType = currentType === "full" ? "mini-sidebar" : "full";

    // 1. Set atribut di <body>
    document.body.setAttribute("data-sidebartype", newType);

    // 2. LOGIKA BARU: Tambah/Hapus class di #main-wrapper
    if (mainWrapper) {
      if (newType === "mini-sidebar") {
        // Tambahkan class jika sidebar mengecil
        mainWrapper.classList.add("show-sidebar");
      } else {
        // Hapus class jika sidebar membesar (full)
        mainWrapper.classList.remove("show-sidebar");
      }
    }
  };

  return (
    <header className="topbar border-bottom border-2">
      <div className="with-vertical">
        <nav className="navbar navbar-expand-lg p-0">
          <ul className="navbar-nav">
            <li className="nav-item nav-icon-hover-bg rounded-circle ms-n2">
              <button className="nav-link sidebartoggler" id="headerCollapse" onClick={() => toggleSidebar()}>
                <TbMenu2 size={20} />
              </button>
            </li>
            {/* <li className="nav-item nav-icon-hover-bg rounded-circle d-none d-lg-flex">
              <a className="nav-link" href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <TbSearch size={20} />
              </a>
            </li> */}
          </ul>

          <div className="d-block d-lg-none py-4">
            <Link href="/dashboard" className="text-nowrap logo-img">
              <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/logos/dark-logo.svg" className="dark-logo" alt="Logo-Dark" />
              {/* <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/logos/light-logo.svg" className="light-logo" alt="Logo-light" /> */}
            </Link>
          </div>
          <a
            className="navbar-toggler nav-icon-hover-bg rounded-circle p-0 mx-0 border-0"
            onClick={handleToggle}
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            role="button"
          >
            <GoKebabHorizontal className="fs-7" />
          </a>

          <div
            id="navbarNav"
            className={`collapse navbar-collapse justify-content-end collapse ${isOpen ? "show" : ""}`}
            style={{ height: "70px" }}
          >
            <div className="d-flex align-items-center justify-content-between" style={{ height: "70px" }}>
              <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-center">
                <li className="nav-item dropdown">
                  <a className="nav-link pe-0 cursor-pointer" id="drop1" aria-expanded="false">
                    <div className="d-flex align-items-center">
                      <div className="user-profile-img">
                        <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg" className="rounded-circle" width="35" height="35" alt="modernize-img" />
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop1">
                    <div className="profile-dropdown position-relative" data-simplebar>
                      <div className="py-3 px-7 pb-0">
                        <h5 className="mb-0 fs-5 fw-semibold">User Profile</h5>
                      </div>
                      <div className="d-flex align-items-center py-9 mx-7 border-bottom">
                        <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg" className="rounded-circle" width="80" height="80" alt="modernize-img" />
                        <div className="ms-3">
                          <h5 className="mb-1 fs-3">Zebew Anderson</h5>
                          <span className="mb-1 d-block">Admin</span>
                          <p className="mb-0 d-flex align-items-center gap-2">
                            <LuMail /> admin@pparl.com
                          </p>
                        </div>
                      </div>
                      <div className="message-body">
                        <Link href="/profile" className="py-8 px-7 mt-8 d-flex align-items-center">
                          <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                            <LuUser size={24} />
                          </span>
                          <div className="w-100 ps-3">
                            <h6 className="mb-1 fs-3 fw-semibold">My Profile</h6>
                            <span className="fs-2 d-block text-dark">Account Settings</span>
                          </div>
                        </Link>
                        {/* <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-email.html" className="py-8 px-7 d-flex align-items-center">
                          <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                            <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-inbox.svg" alt="modernize-img" width="24" height="24" />
                          </span>
                          <div className="w-100 ps-3">
                            <h6 className="mb-1 fs-3 fw-semibold lh-base">My Inbox</h6>
                            <span className="fs-2 d-block text-body-secondary">Messages & Emails</span>
                          </div>
                        </a>
                        <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-notes.html" className="py-8 px-7 d-flex align-items-center">
                          <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                            <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-tasks.svg" alt="modernize-img" width="24" height="24" />
                          </span>
                          <div className="w-100 ps-3">
                            <h6 className="mb-1 fs-3 fw-semibold lh-base">My Task</h6>
                            <span className="fs-2 d-block text-body-secondary">To-do and Daily Tasks</span>
                          </div>
                        </a> */}
                      </div>
                      {/* <div className="d-grid py-4 px-7 pt-8">
                        <div className="upgrade-plan bg-primary-subtle position-relative overflow-hidden rounded-4 p-4 mb-9">
                          <div className="row">
                            <div className="col-6">
                              <h5 className="fs-4 mb-3 fw-semibold">Unlimited Access</h5>
                              <button className="btn btn-primary">Upgrade</button>
                            </div>
                            <div className="col-6">
                              <div className="m-n4 unlimited-img">
                                <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/unlimited-bg.png" alt="modernize-img" className="w-100" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/authentication-login.html" className="btn btn-outline-primary">Log Out</a>
                      </div> */}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="app-header with-horizontal">
        <nav className="navbar navbar-expand-xl container-fluid p-0">
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <div className="d-flex align-items-center justify-content-between px-0 px-xl-8">
              <a href="javascript:void(0)" className="nav-link round-40 p-1 ps-0 d-flex d-xl-none align-items-center justify-content-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobilenavbar" aria-controls="offcanvasWithBothOptions">
                <i className="ti ti-align-justified fs-7"></i>
              </a>
              <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-center">
                <li className="nav-item nav-icon-hover-bg rounded-circle">
                  <a className="nav-link moon dark-layout" href="javascript:void(0)">
                    <i className="ti ti-moon moon"></i>
                  </a>
                  <a className="nav-link sun light-layout" href="javascript:void(0)">
                    <i className="ti ti-sun sun"></i>
                  </a>
                </li>
                <li className="nav-item nav-icon-hover-bg rounded-circle">
                  <a className="nav-link position-relative" href="javascript:void(0)" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <i className="ti ti-basket"></i>
                    <span className="popup-badge rounded-pill bg-danger text-white fs-2">2</span>
                  </a>
                </li>
                <li className="nav-item nav-icon-hover-bg rounded-circle dropdown">
                  <a className="nav-link position-relative" href="javascript:void(0)" id="drop2" aria-expanded="false">
                    <i className="ti ti-bell-ringing"></i>
                    <div className="notification bg-primary rounded-circle"></div>
                  </a>
                  <div className="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                    <div className="d-flex align-items-center justify-content-between py-3 px-7">
                      <h5 className="mb-0 fs-5 fw-semibold">Notifications</h5>
                      <span className="badge text-bg-primary rounded-4 px-3 py-1 lh-sm">5 new</span>
                    </div>
                    <div className="message-body" data-simplebar>
                      <a href="javascript:void(0)" className="py-6 px-7 d-flex align-items-center dropdown-item">
                        <span className="me-3">
                          <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-2.jpg" alt="user" className="rounded-circle" width="48" height="48" />
                        </span>
                        <div className="w-100">
                          <h6 className="mb-1 fw-semibold lh-base">Roman Joined the Team!</h6>
                          <span className="fs-2 d-block text-body-secondary">Congratulate him</span>
                        </div>
                      </a>
                      <a href="javascript:void(0)" className="py-6 px-7 d-flex align-items-center dropdown-item">
                        <span className="me-3">
                          <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-3.jpg" alt="user" className="rounded-circle" width="48" height="48" />
                        </span>
                        <div className="w-100">
                          <h6 className="mb-1 fw-semibold lh-base">New message</h6>
                          <span className="fs-2 d-block text-body-secondary">Salma sent you new message</span>
                        </div>
                      </a>
                      <a href="javascript:void(0)" className="py-6 px-7 d-flex align-items-center dropdown-item">
                        <span className="me-3">
                          <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-4.jpg" alt="user" className="rounded-circle" width="48" height="48" />
                        </span>
                        <div className="w-100">
                          <h6 className="mb-1 fw-semibold lh-base">Bianca sent payment</h6>
                          <span className="fs-2 d-block text-body-secondary">Check your earnings</span>
                        </div>
                      </a>
                      <a href="javascript:void(0)" className="py-6 px-7 d-flex align-items-center dropdown-item">
                        <span className="me-3">
                          <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-5.jpg" alt="user" className="rounded-circle" width="48" height="48" />
                        </span>
                        <div className="w-100">
                          <h6 className="mb-1 fw-semibold lh-base">Jolly completed tasks</h6>
                          <span className="fs-2 d-block text-body-secondary">Assign her new tasks</span>
                        </div>
                      </a>
                      <a href="javascript:void(0)" className="py-6 px-7 d-flex align-items-center dropdown-item">
                        <span className="me-3">
                          <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-6.jpg" alt="user" className="rounded-circle" width="48" height="48" />
                        </span>
                        <div className="w-100">
                          <h6 className="mb-1 fw-semibold lh-base">John received payment</h6>
                          <span className="fs-2 d-block text-body-secondary">$230 deducted from account</span>
                        </div>
                      </a>
                      <a href="javascript:void(0)" className="py-6 px-7 d-flex align-items-center dropdown-item">
                        <span className="me-3">
                          <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-7.jpg" alt="user" className="rounded-circle" width="48" height="48" />
                        </span>
                        <div className="w-100">
                          <h6 className="mb-1 fw-semibold lh-base">Roman Joined the Team!</h6>
                          <span className="fs-2 d-block text-body-secondary">Congratulate him</span>
                        </div>
                      </a>
                    </div>
                    <div className="py-6 px-7 mb-1">
                      <button className="btn btn-outline-primary w-100">See All Notifications</button>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link pe-0" href="javascript:void(0)" id="drop1" aria-expanded="false">
                    <div className="d-flex align-items-center">
                      <div className="user-profile-img">
                        <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg" className="rounded-circle" width="35" height="35" alt="modernize-img" />
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop1">
                    <div className="profile-dropdown position-relative" data-simplebar>
                      <div className="py-3 px-7 pb-0">
                        <h5 className="mb-0 fs-5 fw-semibold">User Profile</h5>
                      </div>
                      <div className="d-flex align-items-center py-9 mx-7 border-bottom">
                        <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg" className="rounded-circle" width="80" height="80" alt="modernize-img" />
                        <div className="ms-3">
                          <h5 className="mb-1 fs-3">Zebew Anderson</h5>
                          <span className="mb-1 d-block">Admin</span>
                          <p className="mb-0 d-flex align-items-center gap-2">
                            <LuMail /> admin@pparl.com
                          </p>
                        </div>
                      </div>
                      <div className="message-body">
                        <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/page-user-profile.html" className="py-8 px-7 mt-8 d-flex align-items-center">
                          <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                            <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-account.svg" alt="modernize-img" width="24" height="24" />
                          </span>
                          <div className="w-100 ps-3">
                            <h6 className="mb-1 fs-3 fw-semibold lh-base">My Profile</h6>
                            <span className="fs-2 d-block text-body-secondary">Account Settings</span>
                          </div>
                        </a>
                        <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-email.html" className="py-8 px-7 d-flex align-items-center">
                          <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                            <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-inbox.svg" alt="modernize-img" width="24" height="24" />
                          </span>
                          <div className="w-100 ps-3">
                            <h6 className="mb-1 fs-3 fw-semibold lh-base">My Inbox</h6>
                            <span className="fs-2 d-block text-body-secondary">Messages & Emails</span>
                          </div>
                        </a>
                        <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-notes.html" className="py-8 px-7 d-flex align-items-center">
                          <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                            <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-tasks.svg" alt="modernize-img" width="24" height="24" />
                          </span>
                          <div className="w-100 ps-3">
                            <h6 className="mb-1 fs-3 fw-semibold lh-base">My Task</h6>
                            <span className="fs-2 d-block text-body-secondary">To-do and Daily Tasks</span>
                          </div>
                        </a>
                      </div>
                      <div className="d-grid py-4 px-7 pt-8">
                        <div className="upgrade-plan bg-primary-subtle position-relative overflow-hidden rounded-4 p-4 mb-9">
                          <div className="row">
                            <div className="col-6">
                              <h5 className="fs-4 mb-3 fw-semibold">Unlimited Access</h5>
                              <button className="btn btn-primary">Upgrade</button>
                            </div>
                            <div className="col-6">
                              <div className="m-n4 unlimited-img">
                                <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/unlimited-bg.png" alt="modernize-img" className="w-100" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/authentication-login.html" className="btn btn-outline-primary">Log Out</a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header >
  );
};