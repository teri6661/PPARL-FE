"use client";
import moment from "moment";
import Link from "next/link";
import { LuActivity, LuCalendar, LuEye, LuPlus, LuSearch, LuUser, LuUserCheck } from "react-icons/lu";
import Select from "react-select";
import { useState, useEffect } from 'react'; // << Tambahkan import
import { selectStyle } from "@/app/utilities/select"; // Saya asumsikan ini sudah diimpor


// -----------------------------------------------------------
// 1. Hook untuk mendeteksi client
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

// 2. Komponen Pembungkus Select (Mengatasi Hydration Error)
const ClientOnlySelect = (props) => {
  const isClient = useIsClient();

  if (!isClient) {
    // Render div placeholder yang mempertahankan layout saat SSR
    return <div />;
  }

  // Render React Select setelah mount di client
  return <Select {...props} />;
};
// -----------------------------------------------------------


const Content = () => {
  const actionOptions = [
    { value: 'all', label: 'All Actions' },
    { value: 'created', label: 'Created' },
    { value: 'updated', label: 'Updated' },
    { value: 'deleted', label: 'Deleted' },
    { value: 'viewed', label: 'Viewed' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'rated', label: 'Rated' },
    { value: 'status_changed', label: 'Status Changed' },
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'experts', label: 'Experts' },
    { value: 'projects', label: 'Projects' },
    { value: 'clients', label: 'Clients' },
    { value: 'accounts', label: 'Accounts' },
    { value: 'employment_status', label: 'Employment Status' },
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'action_asc', label: 'Action A-Z' },
    { value: 'action_desc', label: 'Action Z-A' },
    { value: 'type_asc', label: 'Type A-Z' },
    { value: 'type_desc', label: 'Type Z-A' },
  ];

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="row">
          {/* 1. Header Halaman */}
          <div className="d-flex justify-content-between align-items-center p-3 mb-4 rounded-4 shadow-sm border border-gray-400" style={{ backgroundColor: '#fbf5fd' }}>
            <div>
              <p className="fs-6 fw-bolder text-primary-gradient mb-0">Activity Logs</p>
              <p className="text-dark mb-0">Track all system activities and changes</p>
            </div>
            <button className="btn btn-primary-gradient fw-bold d-flex align-items-center shadow-sm">
              <LuPlus size={20} className="me-2" /> Add Activity
            </button>
          </div>

          {/* Control Bar */}
          <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded-4 shadow-sm border border-gray-400 bg-white">
            {/* Kolom Kiri: Search dan Filter */}
            <div className="d-flex flex-grow-1 gap-3">
              {/* 1. Search Input: flex-basis 25% */}
              <div className="flex-fill">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
              </div>
              {/* 2. Filter 1: All Actions */}
              <div className="flex-fill">
                <ClientOnlySelect
                  options={actionOptions}
                  defaultValue={actionOptions[0]}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="All Actions"
                  styles={selectStyle()}
                />
              </div>
              {/* 3. Filter 2: All Types */}
              <div className="flex-fill">
                <ClientOnlySelect
                  options={typeOptions}
                  defaultValue={typeOptions[0]}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="All Types"
                  styles={selectStyle()}
                />
              </div>
              {/* 4. Filter 3: Latest First (Sort Order) */}
              <div className="flex-fill">
                <ClientOnlySelect
                  options={sortOptions}
                  defaultValue={sortOptions[0]}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Latest First"
                  styles={selectStyle()}
                />
              </div>
            </div>
          </div>

          {/* Konten Timeline */}
          {/* ... (Log Item 1 tetap sama) */}
          <div className="card p-3 rounded-4 shadow-sm border border-gray-400">
            <h3 className="fs-5 fw-bold mb-4">
              <LuActivity size={20} className="text-purple me-2" />
              Activity Timeline (12 activities)
            </h3>

            {/* Item Log 1 */}
            <div className="d-flex p-3 mb-3 border border-1 rounded-3 bg-white shadow-sm">
              <div className="flex-shrink-0 position-relative me-3" style={{ width: '40px' }}>
                <span className="p-2 rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center mx-auto" style={{ width: '40px', height: '40px' }}>
                  <LuUserCheck size={20} />
                </span>
                <div
                  className="position-absolute"
                  style={{
                    width: '2px',
                    backgroundColor: '#dee2e6',
                    left: '50%',
                    top: '50px',
                    bottom: '10px',
                    transform: 'translateX(-50%)',
                    zIndex: '0'
                  }}
                ></div>
              </div>
              <div className="flex-grow-1">
                <div>
                  <span className="badge border border-primary text-primary fs-2 me-2 mb-1">Expert</span>
                  Status Changed
                </div>
                <p className="fw-semibold mb-1">
                  User
                </p>
                <p className="mb-1 fs-3">
                  Expert status changed from Active to On Hold
                </p>
                <small className="fs-2">
                  <LuUser size={15} className="me-2" />
                  User
                </small>
                <small className="fs-2 ms-2">
                  <LuCalendar size={15} className="me-2" />
                  {moment(Date.now()).format('MMMM DD, YYYY, hh:mm:ss A')}
                </small>
              </div>

              <Link href="/activity-logs" className="flex-shrink-0 text-muted d-flex align-items-start ps-3">
                <LuEye size={20} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div >
  );
};

export default Content;