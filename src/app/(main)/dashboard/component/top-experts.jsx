"use client";
import { useState } from "react";
import { LuStar, LuAward } from "react-icons/lu";

const data = {
  monthly: [
    {
      rank: 1,
      name: "Sarah Martinez",
      title: "Coach, Trainer, Speaker",
      rating: 4.8,
      location: "Manila, Philippines",
      image: null, // ganti null → URL gambar kalau ada
    },
    {
      rank: 2,
      name: "Amanda Lee",
      title: "Executive Coach, Leadership Development, Mentor",
      rating: 4.8,
      location: "Sydney, Australia",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      rank: 3,
      name: "Jennifer Wong",
      title: "Facilitator, Coach, Consultant",
      rating: 4.7,
      location: "Hong Kong",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
  ],
  yearly: [
    {
      rank: 1,
      name: "John Doe",
      title: "Senior Consultant, Leadership Coach",
      rating: 4.9,
      location: "Singapore",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      rank: 2,
      name: "Lisa Tan",
      title: "Executive Trainer, Public Speaker",
      rating: 4.8,
      location: "Jakarta, Indonesia",
      image: null,
    },
    {
      rank: 3,
      name: "Ravi Patel",
      title: "Corporate Coach, Mentor",
      rating: 4.7,
      location: "Kuala Lumpur, Malaysia",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
    },
  ],
};

const TopExperts = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  const experts = data[activeTab];

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-warning text-dark";
      case 2:
        return "bg-secondary text-white";
      case 3:
        return "bg-dark text-white"; // or custom bronze
      default:
        return "bg-light text-dark";
    }
  };

  return (
    <div className="card border-1 p-3 shadow-sm rounded-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-start gap-2">
          <LuStar className="text-warning" size={22} />
          <div>
            <h6 className="fw-semibold fs-4 mb-0">Top Performing Experts</h6>
            <small className="text-muted d-none d-md-block">
              {activeTab === "monthly"
                ? "Highest rated experts this month"
                : "Highest rated experts this year"}
            </small>
          </div>
        </div>

        {/* Tabs */}
        <div className="btn-group btn-group-sm border rounded-pill">
          <button
            type="button"
            className={`btn ${activeTab === "monthly" ? "btn-dark-red" : "btn-outline-dark-red"}`}
            onClick={() => setActiveTab("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`btn ${activeTab === "yearly" ? "btn-dark-red" : "btn-outline-dark-red"}`}
            onClick={() => setActiveTab("yearly")}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="d-flex flex-column gap-3">
        {experts.map((exp) => (
          <div
            key={exp.rank}
            className="d-flex align-items-center border rounded-4 p-2 bg-light hover-shadow transition"
          >
            {/* Avatar with Rank Badge */}
            <div className="position-relative me-3">
              {exp.image ? (
                <img
                  src={exp.image}
                  alt={exp.name}
                  className="rounded-circle object-fit-cover"
                  style={{ width: 48, height: 48 }}
                />
              ) : (
                <div
                  className="rounded-circle bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center"
                  style={{ width: 48, height: 48 }}
                >
                  <span className="fw-bolder text-secondary">
                    {exp.name
                      .split(" ")
                      .slice(0, 2) // ambil 2 kata pertama
                      .map(word => word.charAt(0).toUpperCase()) // ambil huruf pertama tiap kata
                      .join("") // gabungkan jadi string
                      .padEnd(2, exp.name.charAt(1).toUpperCase()) // kalau cuma 1 huruf, tambahkan huruf kedua dari nama
                    }
                  </span>
                </div>
              )}

              {/* Rank badge (top-right) */}
              <span className={`popup-badge rounded-pill text-white fw-bold fs-2 ${getRankColor(
                exp.rank
              )}`} style={{ right: 0 }}>{exp.rank}</span>
            </div>

            {/* Info */}
            <div className="flex-grow-1">
              <h6 className="mb-0 fw-semibold text-dark">{exp.name}</h6>
              <small className="text-muted d-block">{exp.title}</small>
            </div>

            {/* Rating */}
            <div className="text-end" style={{ width: "150px" }}>
              <div className="d-flex align-items-center justify-content-end gap-1">
                <LuStar className="text-warning" size={16} />
                <span className="fw-semibold text-dark">{exp.rating}</span>
              </div>
              <small className="text-muted">{exp.location}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopExperts;
