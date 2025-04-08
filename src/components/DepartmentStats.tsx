import React from "react";
import { TransformedData } from "../api/types";
import "./DepartmentStats.css";

interface DepartmentStatsProps {
  data: TransformedData;
}

export const DepartmentStats: React.FC<DepartmentStatsProps> = ({ data }) => {
  return (
    <div className="department-stats">
      {Object.entries(data).map(([department, stats]) => (
        <div key={department} className="department-card">
          <h2>{department}</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Male:</span>
              <span className="stat-value">{stats.male}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Female:</span>
              <span className="stat-value">{stats.female}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Age Range:</span>
              <span className="stat-value">{stats.ageRange}</span>
            </div>
          </div>

          <div className="hair-colors">
            <h3>Hair Colors</h3>
            <div className="color-grid">
              {Object.entries(stats.hair).map(([color, count]) => (
                <div key={color} className="color-item">
                  <span className="color-label">{color}:</span>
                  <span className="color-count">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="addresses">
            <h3>Addresses</h3>
            <div className="address-grid">
              {Object.entries(stats.addressUser).map(([name, postalCode]) => (
                <div key={name} className="address-item">
                  <span className="name">{name}:</span>
                  <span className="postal-code">{postalCode}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
