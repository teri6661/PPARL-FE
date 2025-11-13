import moment from "moment";
import { Dropdown } from "react-bootstrap";
import { LuMail, LuCalendar, LuPencil } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";

const Card = ({ data, onEdit }) => {

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success';
      case 'Inactive':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-primary';
      case 'Editor':
        return 'bg-info';
      case 'Viewer':
        return 'bg-light text-dark';
      default:
        return 'bg-secondary';
    }
  };

  const handleView = (account) => {
    console.log('Viewing details for:', account.fullname);
  };

  return (
    <div className="row g-3">
      {data.map((account) => (
        <div key={account.uuid} className="col-md-6 col-lg-4 col-xl-3">
          <div className="card border shadow-sm p-4">

            {/* Header: Avatar + Nama + Dropdown */}
            <div className="d-flex align-items-start justify-content-between mb-3">
              {/* Avatar + Info */}
              <div className="d-flex align-items-center gap-2">
                {account.image ? (
                  <img
                    src={account.image}
                    alt={account.name}
                    className="rounded-circle object-fit-cover"
                    style={{ width: 48, height: 48 }}
                  />
                ) : (
                  <span className="avatar-initial">
                    {account.fullname
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}
                  </span>
                )}

                <div>
                  <p className="fw-bolder mb-1">{account.fullname}</p>
                  <div className="d-flex gap-2">
                    <span className={`badge ${getRoleBadgeClass(account.role)} fs-1`}>{account.role}</span>
                    <span className={`badge ${getStatusBadgeClass(account.status)} fs-1`}>{account.status}</span>
                  </div>
                </div>
              </div>

              {/* Dropdown (3 titik vertikal) */}
              <Dropdown align="end">
                <Dropdown.Toggle
                  className="d-flex align-items-center justify-content-center border-0 shadow-none rounded-circle no-caret"
                  id={`dropdown-more-${account.uuid}`}
                  as="button"
                  style={{
                    width: "20px",
                    height: "20px",
                    background: "#bababa",
                    padding: 0,
                  }}
                >
                  <MdMoreVert size={14} />
                </Dropdown.Toggle>

                <Dropdown.Menu className="p-1">
                  {/* <Dropdown.Item className="list-edit" onClick={() => handleView(account)}>
                    <LuEye size={16} className="me-2" /> View
                  </Dropdown.Item> */}
                  <Dropdown.Item className="list-edit px-3 py-1" onClick={() => onEdit(account)}>
                    <LuPencil size={14} className="me-2" />
                    <span className="fs-2 fw-bold">Edit</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Email */}
            <div className="d-flex align-items-center text-muted mb-2">
              <LuMail size={14} className="me-2" />
              <span className="fs-2">{account.email || `${account.role.toLowerCase()}@${account.fullname.replace(/\s/g, '').toLowerCase()}.com`}</span>
            </div>

            {/* Created Date */}
            <div className="d-flex align-items-center text-muted">
              <LuCalendar size={14} className="me-2" />
              <span className="fs-2">{moment(account.created_at).format("YYYY-MM-DD")}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;