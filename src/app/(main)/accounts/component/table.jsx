import { LuActivity, LuArrowUpRight, LuAward, LuBadge, LuBriefcase, LuFolderOpen, LuSmile, LuStar, LuTrendingUp, LuUser, LuUserCheck, LuZap } from "react-icons/lu";

const Table = () => {

  return (
    <div className="row">
      <div className="table-responsive">
        {/* Wrapper div untuk menerapkan rounded, overflow-hidden, dan border luar yang mulus */}
        <div className="rounded-4 shadow-sm overflow-hidden border border-gray-200">
          <table className="table align-middle table-hover table-bordered mb-0">
            {/* Tambahkan class bg-secondary untuk latar belakang abu-abu gelap dan text-white untuk teks putih */}
            <thead className="bg-primary">
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <span className="avatar-initial">AU</span>
                    <div>
                      <div className="fw-bold">Admin User</div>
                      <div className="text-muted small">admin@gpearl.com</div>
                    </div>
                  </div>
                </td>
                <td><span className="badge text-bg-light">Technology</span></td>
                <td>San Francisco, CA</td>
                <td>John Smith</td>
                <td><button className="btn btn-sm btn-outline-primary me-2">View</button><button className="btn btn-sm btn-outline-secondary">Edit</button></td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <span className="avatar-initial">AU</span>
                    <div>
                      <div className="fw-bold">Admin User</div>
                      <div className="text-muted small">admin@gpearl.com</div>
                    </div>
                  </div>
                </td>
                <td><span className="badge text-bg-light text-purple-500">Consulting</span></td>
                <td>New York, NY</td>
                <td>Emma Wilson</td>
                <td><button className="btn btn-sm btn-outline-primary me-2">View</button><button className="btn btn-sm btn-outline-secondary">Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Pindahkan "Showing results" di luar div wrapper tabel */}
        <small className="text-muted mt-2 d-block">Showing 2 of 2 results</small>
      </div>
    </div>
  )
}

export default Table;