import React from "react";
import { Badge } from "react-bootstrap";
import { MdStar } from "react-icons/md";

const Table = ({ data, onEdit, onView }) => {
  const getInitials = (name) => {
    if (!name) return "NA";
    const parts = name.split(" ");
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <Badge bg="success" className="border fs-2">{status}</Badge>;
      case "inactive":
        return <Badge bg="danger" className="border fs-2">{status}</Badge>;
      default:
        return <Badge bg="warning" text="dark" className="border fs-2">{status}</Badge>;
    }
  };

  const getNDABadge = (status) => {
    return <Badge bg="primary" className="border fs-2">Submitted</Badge>;
  };

  return (
    <div className="row">
      <div className="table-responsive">
        <div className="rounded-4 shadow-sm overflow-x-auto border border-gray-200">
          <table className="table align-middle table-hover table-bordered mb-0">
            <thead className="bg-primary text-white">
              <tr>
                <th>Name</th>
                <th>Expertise</th>
                <th>Location</th>
                <th>Employment</th>
                <th>Rating</th>
                <th>Status</th>
                <th>NDA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((expert, idx) => (
                  <tr key={idx}>

                    {/* Name */}
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        {expert.image ? (
                          <img
                            src={expert.image}
                            alt={expert.name}
                            className="rounded-circle object-fit-cover"
                            style={{ width: 48, height: 48 }}
                          />
                        ) : (
                          <span className="avatar-initial">
                            {expert.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .substring(0, 2)
                              .toUpperCase()}
                          </span>
                        )}
                        <div>
                          <div className="fw-bold">{expert.name}</div>
                        </div>
                      </div>
                    </td>

                    {/* Expertise */}
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {expert.expertise.slice(0, 2).map((exp, i) => (
                          <Badge key={i} bg="light-purple" text="light-purple" className="fw-semibold border fs-2">
                            {exp}
                          </Badge>
                        ))}
                        {expert.expertise.length > 2 && (
                          <Badge bg="light" text="dark" className="border fw-semibold fs-2">
                            +{expert.expertise.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>

                    {/* Location */}
                    <td>{expert.location}</td>

                    {/* Employment */}
                    <td>
                      <Badge bg="light" text="dark" className="border fw-semibold fs-2">
                        {expert.role}
                      </Badge>
                    </td>

                    {/* Rating */}
                    <td className="fw-semibold">
                      <div className="d-flex align-items-center">
                        <MdStar size={18} color="#ffc107" className="me-1" />
                        {expert.rating}
                      </div>
                    </td>

                    {/* Status */}
                    <td>{getStatusBadge(expert.status)}</td>

                    {/* NDA */}
                    <td>{getNDABadge(expert.nda_status)}</td>

                    {/* Actions */}
                    <td className="text-center">
                      <div className="d-flex gap-2 justify-content-center">
                        {/* <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => onView(expert)}
                    >
                      View
                    </button> */}
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => onEdit(expert)}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-3">
                    No experts data available
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
