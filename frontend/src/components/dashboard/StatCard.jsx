import React from 'react';

const StatCard = ({ title, value, badge, image, alt }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-badge-container">
        <span className="stat-badge">{badge}</span>
      </div>
      <div className="stat-card-img-box">
        <img src={image} alt={alt || title} className="stat-card-img" />
      </div>
      <div className="stat-card-info">
        <span className="stat-title">{title}</span>
        <h2 className="stat-value">{value}</h2>
      </div>
    </div>
  );
};

export default StatCard;