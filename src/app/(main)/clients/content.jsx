'use client'
import { useState } from "react";
import { LuLayoutGrid, LuPlus, LuTable2 } from "react-icons/lu";
import Table from "./component/table";
import Card from "./component/card";

const Content = () => {
  const [viewMode, setViewMode] = useState('table'); // 'table' atau 'cards'
  const activeClass = "btn-dark-red";
  const inactiveClass = "btn-outline-dark-red";

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="row mb-4">

          {/* 1. Header Halaman */}
          <div className="d-flex justify-content-between align-items-center p-3 mb-4 rounded-4 shadow-sm border border-gray-400" style={{ backgroundColor: '#fbf5fd' }}>
            <div>
              <p className="fs-8 fw-bold text-purple mb-0">Clients</p>
              <p className="text-dark mb-0">Manage your client relationships and contacts</p>
            </div>
            <button className="btn btn-primary-gradient fw-bold d-flex align-items-center shadow-sm">
              <LuPlus size={20} /> Add Client
            </button>
          </div>

          {/* 2. Control Bar (Search & Toggle) */}
          <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded-4 shadow-sm border border-gray-400">

            {/* Search Input */}
            <div className="me-3" style={{ maxWidth: '400px', flexGrow: 1 }}>
              <input
                type="search"
                className="form-control"
                placeholder="Search clients..."
              />
            </div>

            {/* Toggle Button Group */}
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

          <div className="card p-3 rounded-4 shadow-sm border border-gray-400">

            {/* 3. Konten (Tabel atau Card) */}
            {viewMode === 'table' ? <Table /> : <Card />}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Content;