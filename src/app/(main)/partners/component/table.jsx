import {
  LuMail,
  LuPhone,
} from "react-icons/lu";

const Table = ({ data, onEdit }) => {
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <span className="badge text-bg-success fw-bold fs-2">Active</span>;
      case "inactive":
        return <span className="badge text-bg-danger fw-bold fs-2">Inactive</span>;
      case "former":
        return <span className="badge text-bg-primary fw-bold fs-2">Former</span>;
      default:
        return <span className="badge text-bg-secondary fw-bold fs-2">{status}</span>;
    }
  };

  return (
    <div className="row">
      <div className="table-responsive">
        <div className="rounded-4 shadow-sm overflow-x-auto border border-gray-200">
          <table className="table align-middle table-hover table-bordered mb-0">
            <thead className="bg-primary text-white">
              <tr>
                <th>Company</th>
                <th>Type</th>
                <th>Contact Person</th>
                <th>Location</th>
                <th>Status</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((partner, index) => (
                  <tr key={index}>
                    <td>{partner.company_name}</td>
                    <td>
                      <span className="badge text-bg-info text-white fw-bold fs-2">
                        {partner.partner_type}
                      </span>
                    </td>
                    <td>
                      {partner.contactPerson}
                    </td>
                    <td>{partner.location}</td>
                    <td>{getStatusBadge(partner.partnership_status)}</td>
                    {/* <td>
                      {partner.website ? (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none text-primary"
                        >
                          <LuGlobe size={16} className="me-1" />
                          {partner.website.replace(/^https?:\/\//, "")}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td> */}
                    <td>
                      <LuMail size={14} className="me-1 text-secondary" />
                      {partner.email}
                    </td>
                    <td>
                      <LuPhone size={14} className="me-1 text-secondary" />
                      {partner.phone}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 mx-auto"
                        onClick={() => onEdit(partner)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-3 text-muted">
                    No partner data available
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
