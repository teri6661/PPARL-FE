"use client";
import Link from "next/link";
import { useState } from "react";
import { LuUser } from "react-icons/lu";
import { TbMenu2, TbSearch } from "react-icons/tb";

export default function Header() {
  const year = new Date().getFullYear();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

    // 3. Update state
    setSidebarOpen(newType === "full");
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

          {/* <ul className="navbar-nav quick-links d-none d-lg-flex align-items-center">
            <li className="nav-item nav-icon-hover-bg rounded w-auto dropdown d-none d-lg-block mx-0">
              <div className="hover-dd">
                <a className="nav-link" href="javascript:void(0)">
                  Apps<span className="mt-1">
                    <i className="ti ti-chevron-down fs-3"></i>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-nav dropdown-menu-animate-up py-0">
                  <div className="row">
                    <div className="col-8">
                      <div className="ps-7 pt-7">
                        <div className="border-bottom">
                          <div className="row">
                            <div className="col-6">
                              <div className="position-relative">
                                <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-chat.html" className="d-flex align-items-center pb-9 position-relative">
                                  <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                    <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-dd-chat.svg" alt="modernize-img" className="img-fluid" width="24" height="24" />
                                  </div>
                                  <div>
                                    <h6 className="mb-1 fw-semibold fs-3">
                                      Chat Application
                                    </h6>
                                    <span className="fs-2 d-block text-body-secondary">New messages arrived</span>
                                  </div>
                                </a>
                                <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-invoice.html" className="d-flex align-items-center pb-9 position-relative">
                                  <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                    <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-dd-invoice.svg" alt="modernize-img" className="img-fluid" width="24" height="24" />
                                  </div>
                                  <div>
                                    <h6 className="mb-1 fw-semibold fs-3">Invoice App</h6>
                                    <span className="fs-2 d-block text-body-secondary">Get latest invoice</span>
                                  </div>
                                </a>
                                <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-contact2.html" className="d-flex align-items-center pb-9 position-relative">
                                  <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                    <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-dd-mobile.svg" alt="modernize-img" className="img-fluid" width="24" height="24" />
                                  </div>
                                  <div>
                                    <h6 className="mb-1 fw-semibold fs-3">
                                      Contact Application
                                    </h6>
                                    <span className="fs-2 d-block text-body-secondary">2 Unsaved Contacts</span>
                                  </div>
                                </a>
                                <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-email.html" className="d-flex align-items-center pb-9 position-relative">
                                  <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                    <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-dd-message-box.svg" alt="modernize-img" className="img-fluid" width="24" height="24" />
                                  </div>
                                  <div>
                                    <h6 className="mb-1 fw-semibold fs-3">Email App</h6>
                                    <span className="fs-2 d-block text-body-secondary">Get new emails</span>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="position-relative">
                                <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/page-user-profile.html" className="d-flex align-items-center pb-9 position-relative">
                                  <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                    <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-dd-cart.svg" alt="modernize-img" className="img-fluid" width="24" height="24" />
                                  </div>
                                  <div>
                                    <h6 className="mb-1 fw-semibold fs-3">
                                      User Profile
                                    </h6>
                                    <span className="fs-2 d-block text-body-secondary">learn more information</span>
                                  </div>
                                </a>
                                <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-calendar.html" className="d-flex align-items-center pb-9 position-relative">
                                  <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                    <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-dd-date.svg" alt="modernize-img" className="img-fluid" width="24" height="24" />
                                  </div>
                                  <div>
                                    <h6 className="mb-1 fw-semibold fs-3">
                                      Calendar App
                                    </h6>
                                    <span className="fs-2 d-block text-body-secondary">Get dates</span>
                                  </div>
                                </a>
                                <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-contact.html" className="d-flex align-items-center pb-9 position-relative">
                                  <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                    <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-dd-lifebuoy.svg" alt="modernize-img" className="img-fluid" width="24" height="24" />
                                  </div>
                                  <div>
                                    <h6 className="mb-1 fw-semibold fs-3">
                                      Contact List Table
                                    </h6>
                                    <span className="fs-2 d-block text-body-secondary">Add new contact</span>
                                  </div>
                                </a>
                                <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-notes.html" className="d-flex align-items-center pb-9 position-relative">
                                  <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                    <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-dd-application.svg" alt="modernize-img" className="img-fluid" width="24" height="24" />
                                  </div>
                                  <div>
                                    <h6 className="mb-1 fw-semibold fs-3">
                                      Notes Application
                                    </h6>
                                    <span className="fs-2 d-block text-body-secondary">To-do and Daily tasks</span>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row align-items-center py-3">
                          <div className="col-8">
                            <a className="fw-semibold d-flex align-items-center lh-1" href="javascript:void(0)">
                              <i className="ti ti-help fs-6 me-2"></i>Frequently Asked Questions
                            </a>
                          </div>
                          <div className="col-4">
                            <div className="d-flex justify-content-end pe-4">
                              <button className="btn btn-primary">Check</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 ms-n4">
                      <div className="position-relative p-7 border-start h-100">
                        <h5 className="fs-5 mb-9 fw-semibold">Quick Links</h5>
                        <ul className="">
                          <li className="mb-3">
                            <a className="fw-semibold bg-hover-primary" href="https://bootstrapdemos.adminmart.com/modernize/dist/main/page-pricing.html">Pricing Page</a>
                          </li>
                          <li className="mb-3">
                            <a className="fw-semibold bg-hover-primary" href="https://bootstrapdemos.adminmart.com/modernize/dist/main/authentication-login.html">Authentication
                              Design</a>
                          </li>
                          <li className="mb-3">
                            <a className="fw-semibold bg-hover-primary" href="https://bootstrapdemos.adminmart.com/modernize/dist/main/authentication-register.html">Register Now</a>
                          </li>
                          <li className="mb-3">
                            <a className="fw-semibold bg-hover-primary" href="https://bootstrapdemos.adminmart.com/modernize/dist/main/authentication-error.html">404 Error Page</a>
                          </li>
                          <li className="mb-3">
                            <a className="fw-semibold bg-hover-primary" href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-notes.html">Notes App</a>
                          </li>
                          <li className="mb-3">
                            <a className="fw-semibold bg-hover-primary" href="https://bootstrapdemos.adminmart.com/modernize/dist/main/page-user-profile.html">User Application</a>
                          </li>
                          <li className="mb-3">
                            <a className="fw-semibold bg-hover-primary" href="https://bootstrapdemos.adminmart.com/modernize/dist/main/page-account-settings.html">Account Settings</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown-hover d-none d-lg-block">
              <a className="nav-link" href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-chat.html">Chat</a>
            </li>
            <li className="nav-item dropdown-hover d-none d-lg-block">
              <a className="nav-link" href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-calendar.html">Calendar</a>
            </li>
            <li className="nav-item dropdown-hover d-none d-lg-block">
              <a className="nav-link" href="https://bootstrapdemos.adminmart.com/modernize/dist/main/app-email.html">Email</a>
            </li>
          </ul> */}

          <div className="d-block d-lg-none py-4">
            <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/index.html" className="text-nowrap logo-img">
              <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/logos/dark-logo.svg" className="dark-logo" alt="Logo-Dark" />
              {/* <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/logos/light-logo.svg" className="light-logo" alt="Logo-light" /> */}
            </a>
          </div>
          <a className="navbar-toggler nav-icon-hover-bg rounded-circle p-0 mx-0 border-0" href="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i className="ti ti-dots fs-7"></i>
          </a>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <div className="d-flex align-items-center justify-content-between">
              <a href="javascript:void(0)" className="nav-link nav-icon-hover-bg rounded-circle mx-0 ms-n1 d-flex d-lg-none align-items-center justify-content-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobilenavbar" aria-controls="offcanvasWithBothOptions">
                <i className="ti ti-align-justified fs-7"></i>
              </a>
              <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-center">
                {/* <li className="nav-item nav-icon-hover-bg rounded-circle">
                  <a className="nav-link moon dark-layout" href="javascript:void(0)">
                    <i className="ti ti-moon moon"></i>
                  </a>
                  <a className="nav-link sun light-layout" href="javascript:void(0)">
                    <i className="ti ti-sun sun"></i>
                  </a>
                </li>
                <li className="nav-item nav-icon-hover-bg rounded-circle dropdown">
                  <a className="nav-link" href="javascript:void(0)" id="drop2" aria-expanded="false">
                    <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-flag-en.svg" alt="modernize-img" width="20px" height="20px" className="rounded-circle object-fit-cover round-20" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                    <div className="message-body">
                      <a href="javascript:void(0)" className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item">
                        <div className="position-relative">
                          <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-flag-en.svg" alt="modernize-img" width="20px" height="20px" className="rounded-circle object-fit-cover round-20" />
                        </div>
                        <p className="mb-0 fs-3">English (UK)</p>
                      </a>
                      <a href="javascript:void(0)" className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item">
                        <div className="position-relative">
                          <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-flag-cn.svg" alt="modernize-img" width="20px" height="20px" className="rounded-circle object-fit-cover round-20" />
                        </div>
                        <p className="mb-0 fs-3">中国人 (Chinese)</p>
                      </a>
                      <a href="javascript:void(0)" className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item">
                        <div className="position-relative">
                          <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-flag-fr.svg" alt="modernize-img" width="20px" height="20px" className="rounded-circle object-fit-cover round-20" />
                        </div>
                        <p className="mb-0 fs-3">français (French)</p>
                      </a>
                      <a href="javascript:void(0)" className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item">
                        <div className="position-relative">
                          <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-flag-sa.svg" alt="modernize-img" width="20px" height="20px" className="rounded-circle object-fit-cover round-20" />
                        </div>
                        <p className="mb-0 fs-3">عربي (Arabic)</p>
                      </a>
                    </div>
                  </div>
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
                </li> */}
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
                          <h5 className="mb-1 fs-3">Mathew Anderson</h5>
                          <span className="mb-1 d-block">Designer</span>
                          <p className="mb-0 d-flex align-items-center gap-2">
                            <i className="ti ti-mail fs-4"></i> info@modernize.com
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
                          <h5 className="mb-1 fs-3">Mathew Anderson</h5>
                          <span className="mb-1 d-block">Designer</span>
                          <p className="mb-0 d-flex align-items-center gap-2">
                            <i className="ti ti-mail fs-4"></i> info@modernize.com
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
    </header>
  );
};