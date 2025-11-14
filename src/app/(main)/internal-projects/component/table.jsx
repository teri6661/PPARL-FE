import React from "react";
import { Badge } from "react-bootstrap";

const Table = ({ data, onEdit, onView }) => {
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        // Status Aktif: Hijau
        return <Badge bg="success" className="border fs-2">{status}</Badge>;
      case "planning":
        // Status Planning: Biru Muda
        return <Badge bg="warning" className="border fs-2">{status}</Badge>;
      case "completed":
        // Status Completed: Abu-abu
        return <Badge bg="secondary" className="border fs-2">{status}</Badge>;
      case "on hold":
        // Status On Hold: Kuning
        return <Badge bg="dark" className="border fs-2">{status}</Badge>;
      default:
        return <Badge bg="dark" className="border fs-2">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category) => {
    return (
      <Badge
        className="fw-semibold fs-2 border-0"
        text="outline-purple"
      >
        {category}
      </Badge>
    );
  };

  return (
    <div className="row">
      <div className="table-responsive">
        <div className="rounded-4 shadow-sm overflow-x-auto border border-gray-200">
          <table className="table align-middle table-hover table-bordered mb-0">
            <thead className="bg-primary text-white">
              <tr>
                {/* Header Kolom Disesuaikan untuk Data Proyek */}
                <th>Project Code</th>
                <th>Title</th>
                <th>Category</th>
                <th>Project Leader</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Menggunakan 'project' sebagai item iterasi */}
              {data.length > 0 ? (
                data.map((project, idx) => (
                  <tr key={idx}>

                    {/* Project Code */}
                    <td className="fw-semibold text-primary">
                      {project.project_code}
                    </td>

                    {/* Title */}
                    <td>{project.title}</td>

                    {/* Category */}
                    <td>
                      {getCategoryBadge(project.category)}
                    </td>

                    {/* Project Leader */}
                    <td>{project.project_leader}</td>

                    {/* Status */}
                    <td>{getStatusBadge(project.status)}</td>

                    {/* Start Date */}
                    <td>{project.start_date}</td>

                    {/* End Date */}
                    <td>{project.end_date}</td>

                    {/* Actions */}
                    <td className="text-center">
                      <div className="d-flex gap-2 justify-content-center">
                        {/* <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => onView(project)}
                    >
                      View
                    </button> */}
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => onEdit(project)}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-3">
                    No project data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;