'use client';
import { useState } from "react";
import { LuLayoutGrid, LuPlus, LuTable2 } from "react-icons/lu";
import Table from "./component/table";
import Card from "./component/card";
import AccountModal from "./component/account-modal"; // import modal

const Content = () => {
  const [viewMode, setViewMode] = useState("table");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedAccount, setSelectedAccount] = useState(null);

  const activeClass = "btn-dark-red";
  const inactiveClass = "btn-outline-dark-red";

  const handleAdd = () => {
    setModalMode("add");
    setSelectedAccount(null);
    setShowModal(true);
  };

  const handleEdit = (account) => {
    setModalMode("edit");
    setSelectedAccount(account);
    setShowModal(true);
  };

  const handleSubmit = (data) => {
    if (modalMode === "add") {
      console.log("Tambah akun:", data);
      // TODO: panggil API add di sini
    } else {
      console.log("Update akun:", data);
      // TODO: panggil API update di sini
    }
  };

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="row mb-4">

          {/* Header Halaman */}
          <div className="d-flex justify-content-between align-items-center p-3 mb-4 rounded-4 shadow-sm border border-gray-400" style={{ backgroundColor: '#fbf5fd' }}>
            <div>
              <p className="fs-6 fw-bolder text-primary-gradient mb-0">Accounts Management</p>
              <p className="text-dark mb-0">Manage user accounts and permissions</p>
            </div>
            <button
              className="btn btn-primary-gradient fw-bold d-flex align-items-center shadow-sm"
              onClick={handleAdd}
            >
              <LuPlus size={20} className="me-2" /> Add Account
            </button>
          </div>

          {/* Control Bar */}
          <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded-4 shadow-sm border border-gray-400">
            <div className="me-3" style={{ maxWidth: '400px', flexGrow: 1 }}>
              <input
                type="search"
                className="form-control"
                placeholder="Search clients..."
              />
            </div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${viewMode === 'cards' ? activeClass : inactiveClass}`}
                onClick={() => setViewMode('cards')}
              >
                <LuLayoutGrid size={16} /> Cards
              </button>
              <button
                type="button"
                className={`btn ${viewMode === 'table' ? activeClass : inactiveClass}`}
                onClick={() => setViewMode('table')}
              >
                <LuTable2 size={16} /> Table
              </button>
            </div>
          </div>

          {/* Konten */}
          <div className="card p-3 rounded-4 shadow-sm border border-gray-400">
            {viewMode === 'table' ? (
              <Table onEdit={handleEdit} />
            ) : (
              <Card onEdit={handleEdit} />
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AccountModal
        show={showModal}
        onHide={() => setShowModal(false)}
        mode={modalMode}
        initialData={selectedAccount}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Content;
