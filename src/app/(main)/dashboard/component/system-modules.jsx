"use client";
import Link from "next/link";
import {
  LuUsers,
  LuFolderOpen,
  LuUserCheck,
  LuNetwork,
  LuClipboardList,
  LuActivity,
  LuTarget,
} from "react-icons/lu";

const modules = [
  {
    icon: <LuUsers size={26} className="text-purple" />,
    title: "Experts",
    description: "Manage expert profiles, ratings, and availability",
    status: "7/7 Active",
    growth: "+12%",
    link: "/experts",
  },
  {
    icon: <LuFolderOpen size={26} className="text-primary" />,
    title: "Projects",
    description: "Track project status and expert assignments",
    status: "2 Active Projects",
    growth: "+8%",
    link: "/cs-projects",
  },
  {
    icon: <LuUserCheck size={26} className="text-danger" />,
    title: "Clients",
    description: "Manage client information and contacts",
    status: "2 Total Clients",
    growth: "+5%",
    link: "/clients",
  },
  {
    icon: <LuClipboardList size={26} className="text-success" />,
    title: "Internal Projects",
    description: "Track internal initiatives and development",
    status: "2 Projects",
    growth: "+15%",
    link: "/internal-projects",
  },
  {
    icon: <LuNetwork size={26} className="text-secondary" />,
    title: "Partners",
    description: "Manage strategic partnerships",
    status: "0 Active Partners",
    growth: "+3%",
    link: "/partners",
  },
  {
    icon: <LuActivity size={26} className="text-warning" />,
    title: "Activity Logs",
    description: "Monitor system activities and changes",
    status: "12 Log Entries",
    growth: "+25%",
    link: "/activity-logs",
  },
];

const SystemModules = () => {
  return (
    <div className="card border-1 p-4 shadow-sm rounded-4">
      <div className="d-flex align-items-start gap-2 mb-3">
        <LuTarget className="text-purple" size={22} />
        <div>
          <h6 className="fw-semibold fs-4 mb-0">System Modules</h6>
          <small className="text-muted">
            Quick access to all system modules
          </small>
        </div>
      </div>

      <div className="row g-4">
        {modules.map((mod, i) => (
          <div key={i} className="col-12 col-md-6 col-lg-4">
            <Link href={mod.link} className="text-decoration-none">
              <div className="module-card p-3 border rounded-4 h-100 bg-light">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="d-flex align-items-start gap-2">
                    <div className="p-2 bg-white rounded-3 shadow-sm">
                      {mod.icon}
                    </div>
                  </div>
                  <span className="text-success small fw-semibold">
                    {mod.growth}
                  </span>
                </div>

                <div>
                  <h6 className="fw-semibold mb-0 text-dark">{mod.title}</h6>
                  <small className="text-dark">{mod.description}</small>
                </div>
                <span className="badge text-bg-primary fw-semibold fs-2 mt-2 mb-0">
                  {mod.status}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div >
  );
};

export default SystemModules;
