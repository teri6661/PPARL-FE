// components/RecentActivity.js
import React from 'react';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { LuClock, LuFilter, LuEye, LuPlus, LuUser, LuStar, LuUsers } from 'react-icons/lu';
import { FiBriefcase } from "react-icons/fi"; // Menggunakan ikon Briefcase untuk Project

// --- DATA DUMMY ---
const activityData = [
  {
    id: 1,
    icon: LuPlus,
    iconColor: '#9333ea', // Ungu
    type: 'Expert',
    description: 'New expert profile created with leadership and coaching expertise',
    user: 'Admin User',
    timestamp: '1/10/2024, 5:00 PM',
  },
  {
    id: 2,
    icon: LuPlus,
    iconColor: '#2563eb', // Biru
    type: 'Project',
    description: 'New project created for TechCorp Inc. leadership training',
    user: 'Admin User',
    timestamp: '1/15/2024, 9:30 PM',
  },
  {
    id: 3,
    icon: LuUser,
    iconColor: '#9333ea', // Ungu
    type: 'Expert',
    description: 'Expert assigned to Leadership Excellence Program project',
    user: 'Admin User',
    timestamp: '1/16/2024, 4:15 PM',
  },
  {
    id: 4,
    icon: LuStar,
    iconColor: '#9333ea', // Ungu
    type: 'Expert',
    description: 'Expert received ratings for Leadership Excellence Program',
    user: 'Admin User',
    timestamp: '1/20/2024, 11:45 PM',
  },
  {
    id: 5,
    icon: LuUsers,
    iconColor: '#e11d48', // Merah/Pink
    type: 'Client',
    description: 'Client contact information updated',
    user: 'Admin User',
    timestamp: '1/25/2024, 6:20 PM',
  },
];

const RecentActivity = () => {
  return (
    <Card
      className="border-1 shadow-sm"
    >
      {/* === HEADER === */}
      <div className="card-header d-flex justify-content-between align-items-center p-4"
        style={{
          background: '#FCF4FB',
          color: '#856404',
          border: 'none',
        }}
      >
        {/* Judul */}
        <div className="d-flex flex-column align-items-start">
          <div className="d-flex align-items-center mb-1">
            <LuClock size={20} className="me-2" color="#6b21a8" /> {/* Ikon Jam */}
            <span className="fw-semibold text-dark">
              Recent Activity
            </span>
          </div>
          <p
            className="mb-0 text-muted"
            style={{ fontSize: '0.9em' }}
          >
            Latest system activities and updates
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="d-flex gap-2">
          {/* <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center"
          >
            <LuFilter className="me-1" /> Filter
          </Button> */}
          <Button
            variant="dark"
            size="sm"
            className="d-flex align-items-center"
          >
            <LuEye className="me-1" /> View All
          </Button>
        </div>
      </div>

      {/* === BODY/LIST === */}
      <div className="card-body p-4 d-flex flex-column gap-3">
        {activityData.map((activity) => (
          <div
            key={activity.id}
            className="p-3"
            style={{
              border: '1px solid #d1d1d1',
              borderRadius: '10px',
              backgroundColor: '#F9FAFB',
            }}
          >
            <Row className="align-items-center">
              {/* Kolom Kiri: Ikon dan Deskripsi */}
              <Col xs={10} className="d-flex align-items-start">
                {/* Icon Wrapper */}
                <div
                  className="me-3 d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: activity.iconColor + '20', // Warna ikon dengan opasitas rendah
                    position: 'relative',
                  }}
                >
                  <activity.icon size={18} color={activity.iconColor} />
                </div>

                {/* Deskripsi */}
                <div>
                  <p className="mb-1 fw-semibold text-dark fs-3">
                    {activity.description}
                  </p>
                  <div className="d-flex align-items-center fs-2">
                    <span className="text-uppercase badge bg-primary me-2 fs-1">{activity.type}</span>
                    <span className="text-dark">by {activity.user}</span>
                  </div>
                </div>
              </Col>

              {/* Kolom Kanan: Timestamp */}
              <Col xs={2} className="text-end text-dark fs-2">
                {activity.timestamp}
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </Card >
  );
};

export default RecentActivity;