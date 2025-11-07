import { LuActivity, LuArrowUpRight, LuAward, LuBadge, LuBriefcase, LuFolderOpen, LuSmile, LuStar, LuTrendingUp, LuUser, LuUserCheck, LuZap } from "react-icons/lu";

const Table = ({ data, onEdit, totalData }) => {

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="badge text-bg-success fs-2">Active</span>;
      case 'Inactive':
        return <span className="badge text-bg-warning fs-2">Inactive</span>;
      default:
        return <span className="badge text-bg-secondary fs-2">{status}</span>;
    }
  };

  return (
    <div className="row">
      <div className="table-responsive">
        <div className="rounded-4 shadow-sm overflow-hidden border border-gray-200">
          <table className="table align-middle table-hover table-bordered mb-0">
            <thead className="bg-primary">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((account) => (
                <tr key={account.uuid}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <span className="avatar-initial">
                        {account.fullname
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </span>
                      <div>
                        <div className="fw-bold">{account.fullname}</div>
                        <div className="text-muted small">{account.role.toLowerCase()}@{account.fullname.replace(/\s/g, '').toLowerCase()}.com</div>
                      </div>
                    </div>
                  </td>

                  <td>{account.email}</td>

                  <td><span className="badge text-bg-primary fs-2">{account.role}</span></td>

                  <td>{getStatusBadge(account.status)}</td>

                  <td>{account.created_at}</td>

                  <td>
                    {/* <button className="btn btn-sm btn-outline-primary me-2">View</button> */}
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => onEdit(account)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table;