"use client"
import React from "react";
import { LuChartColumn, LuChartPie, LuEye, LuSettings } from "react-icons/lu";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const dataArea = [
  { month: "Jan", expert: 3, project: 5 },
  { month: "Feb", expert: 5, project: 7 },
  { month: "Mar", expert: 3, project: 6 },
  { month: "Apr", expert: 7, project: 12 },
  { month: "May", expert: 5, project: 9 },
];

const dataPie = [
  { name: "Active", value: 7, color: "#0f9d58" },    // hijau
  { name: "Inactive", value: 1, color: "#db4437" },  // merah
];

const ChartPanel = () => {
  return (
    <div className="row gx-3 gy-2">
      {/* Left: Area Chart */}
      <div className="col-md-6">
        <div className="card border-1 p-4 shadow-sm rounded-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h6 className="fw-semibold fs-4">
                <LuChartColumn size={20} className="text-purple me-2" />  Project Trends
              </h6>
              <small className="text-muted">Monthly project completion data</small>
            </div>
            <button className="btn btn-sm btn-outline-dark">
              <LuEye size={14} className="me-2" />
              View Details</button>
          </div>

          <ResponsiveContainer width="100%" height={200} style={{ outline: 'none' }}>
            <AreaChart data={dataArea} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProject" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpert" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="project"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorProject)"
                name="Project"
              />
              <Area
                type="monotone"
                dataKey="expert"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorExpert)"
                name="Expert"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right: Donut Chart */}
      <div className="col-md-6">
        <div className="card border-1 p-4 shadow-sm rounded-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h6 className="fw-semibold fs-4">
                <LuChartPie size={20} className="text-purple me-2" />Expert Status Distribution
              </h6>
              <small className="text-muted">Current expert availability status</small>
            </div>
            <button className="btn btn-sm btn-outline-dark">
              <LuSettings size={14} className="me-2" />Manage</button>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={dataPie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={80}
                paddingAngle={0}
                label={false}
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>

              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                formatter={(value, entry) => {
                  const item = dataPie.find((d) => d.name === value);
                  return (
                    <span>
                      {value}: {item.value}
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartPanel;
