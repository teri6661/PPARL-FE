import { IoLocationOutline } from "react-icons/io5";

const Table = ({ data, onEdit }) => {
  return (
    <div className="row">
      <div className="table-responsive">
        {/* Wrapper div untuk rounded, shadow, dan border halus */}
        <div className="rounded-4 shadow-sm overflow-hidden border border-gray-200">
          <table className="table align-middle table-hover table-bordered mb-0">
            <thead className="bg-primary text-white">
              <tr>
                <th>Company</th>
                <th>Industry</th>
                <th>Location</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.company_name}</td>
                      <td>
                        <span className="badge text-bg-primary fs-2 fw-bold">
                          {item.industry}
                        </span>
                      </td>
                      <td>
                        {item.locations && item.locations.length > 0 ? (
                          <ul className="list-unstyled mb-0">
                            {item.locations.map((loc, idx) => (
                              <li key={idx}>
                                <span>
                                  <IoLocationOutline /> {loc.city}, {loc.country}
                                </span>
                                {loc.primary && (
                                  <span className="badge bg-success fs-1 fw-bold ms-2">Primary</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-muted">No locations</span>
                        )}
                      </td>
                      <td>{item.contact_person}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        {/* <button
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          View
                        </button> */}
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => onEdit(item)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-3 text-muted">
                    No data available
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