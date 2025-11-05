import { LuActivity, LuArrowUpRight, LuAward, LuBadge, LuBriefcase, LuFolderOpen, LuSmile, LuStar, LuTrendingUp, LuUser, LuUserCheck, LuZap } from "react-icons/lu";

const CardTotal = () => {
  const year = new Date().getFullYear();

  return (
    <div className="row g-3">

      {/* CARD 1: Total Experts */}
      <div className="col-lg-3 col-md-6">
        <div className="card shadow-sm border-1" style={{
          backgroundImage: 'linear-gradient(to bottom right, #f8f4ff, #ffffff)',
        }}>
          <div className="card-body p-4">
            <p className="card-title mb-2 fs-4 fw-medium">Total Experts</p>
            <div className="d-flex justify-content-between align-items-start">
              {/* Nilai Utama */}
              <h2 className="display-5 fw-bold" style={{ color: '#9b18f4' }}>7</h2>
              {/* Ikon di Samping */}
              <div className="p-3 text-white rounded-circle" style={{ background: '#9b18f4' }}>
                {/* Ganti dengan ikon User yang paling cocok */}
                <LuUserCheck size={28} />
              </div>
            </div>

            {/* Statistik Bawah */}
            <div className="mt-2 d-flex align-items-center">
              <span
                className="fw-medium me-2 px-2 py-1 rounded-pill d-inline-flex align-items-center bg-light-green"
              >
                <LuTrendingUp size={18} className="me-2" /> +12%
              </span>
              <span className="fw-medium fs-3">7 active</span>
            </div>

            {/* Avg Rating (Progress Bar) */}
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <p className="mb-0 fs-3">Avg Rating</p>
                <small className="fs-3 fw-medium">4.6/5.0</small>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: '92%', background: '#9b18f4' }}
                  aria-valuenow="92"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 2: Active Projects */}
      <div className="col-lg-3 col-md-6">
        <div className="card shadow-sm border-1" style={{
          backgroundImage: 'linear-gradient(to bottom right, #eff6ff, #ffffff)',
        }}>
          <div className="card-body p-4">
            <p className="card-title mb-2 fs-4 fw-medium">Active Projects</p>
            <div className="d-flex justify-content-between align-items-start">
              {/* Nilai Utama */}
              <h2 className="display-5 fw-bold" style={{ color: '#3b82f6' }}>2</h2>
              {/* Ikon di Samping */}
              <div className="p-3 text-white rounded-circle" style={{ background: '#3b82f6' }}>
                {/* Ganti dengan ikon Briefcase/Folder/Project yang paling cocok */}
                <LuFolderOpen size={28} />
              </div>
            </div>

            {/* Statistik Bawah */}
            <div className="mt-3 d-flex align-items-center">
              <span
                className="fw-medium me-2 px-2 py-1 rounded-pill d-inline-flex align-items-center bg-light-green"
              >
                <LuArrowUpRight size={18} className="me-2" /> 8%
              </span>
              <span className="fw-medium fs-3">7 active</span>
            </div>

            {/* Completion Rate (Progress Bar) */}
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <p className="mb-0 fs-3">Completion Rate</p>
                <small className="fs-3 fw-medium">33%</small>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: '33%', background: '#3b82f6' }}
                  aria-valuenow="33"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 3: Client Satisfaction */}
      <div className="col-lg-3 col-md-6">
        <div className="card shadow-sm border-1" style={{
          backgroundImage: 'linear-gradient(to bottom right, #fce7f6, #ffffff)',
        }}>
          <div className="card-body p-4">
            <p className="card-title mb-2 fs-4 fw-medium">Client Satisfaction</p>
            <div className="d-flex justify-content-between align-items-start">
              {/* Nilai Utama */}
              <h2 className="display-5 fw-bold" style={{ color: '#ec4899' }}>4.7</h2>
              {/* Ikon di Samping */}
              <div className="p-3 text-white rounded-circle" style={{ background: '#ec4899' }}>
                {/* Ganti dengan ikon Senyum/Hati yang paling cocok */}
                <LuAward size={28} />
              </div>
            </div>

            {/* Statistik Bawah */}
            <div className="mt-3 d-flex align-items-center">
              <span
                className="fw-medium me-2 px-2 py-1 rounded-pill d-inline-flex align-items-center bg-light-green"
              >
                <LuStar size={18} className="me-2" /> 8%
              </span>
              <span className="fw-medium fs-3">7 active</span>
            </div>

            {/* Top Rated Experts (Progress Bar) */}
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <p className="mb-0 fs-3">Top Rated Experts</p>
                <small className="fs-3 fw-medium">5</small>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: '70%', background: '#ec4899' }}
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 4: System Activity */}
      <div className="col-lg-3 col-md-6">
        <div className="card shadow-sm border-1" style={{
          backgroundImage: 'linear-gradient(to bottom right, #e0f7e9, #ffffff)',
        }}>
          <div className="card-body p-4">
            <p className="card-title mb-2 fs-4 fw-medium">System Activity</p>
            <div className="d-flex justify-content-between align-items-start">
              {/* Nilai Utama */}
              <h2 className="display-5 fw-bold" style={{ color: '#10b981' }}>12</h2>
              {/* Ikon di Samping */}
              <div className="p-3 text-white rounded-circle" style={{ background: '#10b981' }}>
                {/* Ganti dengan ikon Activity/Heartbeat yang paling cocok */}
                <LuActivity size={28} />
              </div>
            </div>

            {/* Statistik Bawah */}
            <div className="mt-3 d-flex align-items-center">
              <span
                className="fw-medium me-2 px-2 py-1 rounded-pill d-inline-flex align-items-center bg-light-green"
              >
                <LuZap size={18} className="me-2 text-success" /> 8%
              </span>
              <span className="fw-medium fs-4">7 active</span>
            </div>

            {/* Active Partners (Progress Bar) */}
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <p className="mb-0 fs-3">Active Partners</p>
                <small className="fs-3 fw-medium">0</small>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: '0%', background: '#10b981' }}
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CardTotal;