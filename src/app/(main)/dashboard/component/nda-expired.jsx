import React from 'react';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { LuCalendar, LuEye, LuTriangleAlert } from 'react-icons/lu';
import { BsFillStarFill } from "react-icons/bs";

// --- DATA DUMMY ---
const expertsData = [
  {
    id: 1,
    initials: 'SM',
    name: 'Sarah Martinez',
    status: 'Expired',
    location: 'Manila, Philippines',
    role: 'Coach, Trainer',
    expiredDays: 332,
    expiresDate: '12/15/2024',
    rating: 4.8,
  },
  {
    id: 2,
    initials: 'MC',
    name: 'Michael Chen',
    status: 'Expired',
    location: 'Singapore',
    role: 'Technology Leader, Innovation Strategist',
    expiredDays: 237,
    expiresDate: '3/20/2025',
    rating: 4.6,
    image: "https://randomuser.me/api/portraits/women/37.jpg",
  },
  {
    id: 3,
    initials: 'JW',
    name: 'Jennifer Wong',
    status: 'Expired',
    location: 'Hong Kong',
    role: 'Facilitator, Coach',
    expiredDays: 25,
    expiresDate: '10/18/2025',
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
];
// ------------------

const NdaExpiredAlert = () => {
  const totalAlerts = expertsData.length;

  return (
    <Card
      className="border-0 shadow-sm"
      style={{ borderRadius: '15px', overflow: 'hidden' }}
    >
      {/* === HEADER === */}
      <div className="card-header d-flex justify-content-between align-items-center p-4"
        style={{
          background: 'linear-gradient(to right, #FFECD4, #FFE2E2)',
          color: '#856404',
          border: 'none',
        }}
      >
        <div className="d-flex flex-column align-items-start">
          <div className="d-flex align-items-center mb-1">
            <LuTriangleAlert size={20} className="me-2" />
            <span className="fw-semibold">
              NDA Expiration Alerts ({totalAlerts})
            </span>
          </div>
          <p
            className="mb-0"
            style={{ fontSize: '0.9em', color: '#E7000B' }}
          >
            Experts with NDAs expiring soon or already expired
          </p>
        </div>

        <Button
          variant="dark"
          size="sm"
          className="d-flex align-items-center"
        >
          <LuEye className="me-1" /> View All Experts
        </Button>
      </div>

      {/* === BODY === */}
      <div
        className="card-body p-4 d-flex flex-column gap-3"
        style={{
          background: 'linear-gradient(to right, #FFF7ED, #FEF2F2)',
        }}
      >
        {expertsData.map((expert) => {
          const ndaText = `NDA expired ${expert.expiredDays} days ago`;

          const Avatar = () => (
            expert.image ? (
              <img
                src={expert.image}
                alt={expert.name}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '15px',
                  border: '2px solid #f1f1f1',
                }}
              />
            ) : (
              <div
                className='avatar-initial me-2'
              >
                {expert.initials}
              </div>
            )
          );

          return (
            <div
              key={expert.id}
              className="p-3"
              style={{
                border: '1px solid #f5c2c7',
                borderRadius: '10px',
                backgroundColor: '#FEF2F2',
              }}
            >
              <Row className="align-items-center">
                {/* Kiri */}
                <Col xs={9} className="d-flex align-items-center">
                  <Avatar />
                  <div>
                    <div className="d-flex align-items-center mb-1">
                      <strong className="text-dark-red me-2">{expert.name}</strong>
                      <Badge
                        bg="danger"
                        className="text-uppercase"
                        style={{ fontSize: '0.7em' }}
                      >
                        {expert.status}
                      </Badge>
                    </div>
                    <p className="mb-1 text-danger" style={{ fontSize: '0.9em' }}>
                      {expert.location} &bull; {expert.role}
                    </p>
                    <p className="mb-0 text-danger fw-bold" style={{ fontSize: '0.85em' }}>
                      <LuCalendar className="me-1" />
                      {ndaText} &nbsp; &bull; &nbsp; Expires: {expert.expiresDate}
                    </p>
                  </div>
                </Col>

                {/* Kanan */}
                <Col xs={3} className="text-end">
                  <Button variant="danger" size="sm" className="mb-2">
                    Renew Now
                  </Button>

                  <div
                    className="d-flex justify-content-end align-items-center"
                    style={{ fontSize: '0.85em' }}
                  >
                    <BsFillStarFill className="text-warning me-1" />
                    <span className='fw-bold'>{expert.rating}</span>
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}

      </div>
    </Card >
  );
};

export default NdaExpiredAlert;
