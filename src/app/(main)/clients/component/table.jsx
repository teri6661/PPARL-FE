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
              <tr>
                <td>TechCorp Inc.</td>
                <td><span className="badge text-bg-light">Technology</span></td>
                <td>San Francisco, CA</td>
                <td>John Smith</td>
                <td>john.smith@techcorp.com</td>
                <td>+1-555-0123</td>
                <td><button className="btn btn-sm btn-outline-primary me-2">View</button><button className="btn btn-sm btn-outline-secondary">Edit</button></td>
              </tr>
              <tr>
                <td>InnovateHub</td>
                <td><span className="badge text-bg-light text-purple-500">Consulting</span></td>
                <td>New York, NY</td>
                <td>Emma Wilson</td>
                <td>emma.wilson@innovatehub.com</td>
                <td>+1-555-0456</td>
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