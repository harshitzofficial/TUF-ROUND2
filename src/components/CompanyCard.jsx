import React from 'react';
import './Dashboard.css';
import './CompanyCard.css';

const CompanyCard = () => {
  return (
    <div className="card bento-row" style={{ backgroundColor: '#ffffff', padding: '0', display: 'flex' }}>
      {/* Left Box */}
      <div className="company-left">
        <div className="company-header">
          <div className="company-logo">
            <div className="company-logo-img">||||</div>
            <div className="online-indicator"></div>
          </div>
          <div>
            <h3 style={{ margin: '0', fontSize: '18px' }}>Intercom</h3>
            <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>Joined 9 Feb 2023</p>
          </div>
        </div>

        <div className="company-stats">
          <div className="stat-row">
            <span className="stat-label"><span className="stat-icon">⚡</span> Total seats</span>
            <span className="stat-value">50</span>
          </div>
          <div className="stat-row">
            <span className="stat-label"><span className="stat-icon">⚡</span> Active seats</span>
            <span className="stat-value">22</span>
          </div>
          <div className="stat-row">
            <span className="stat-label"><span className="stat-icon">⚡</span> Active last 7 days</span>
            <span className="stat-value">True</span>
          </div>
        </div>
      </div>

      {/* Right Box */}
      <div className="company-right">
        <div className="activation-header">
          <div style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>Company activation</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>40%</div>
        </div>

        <div className="activation-steps">
          <div className="step">
            <span className="step-label"><span className="step-check">⭐</span> Signed up</span>
            <div className="progress-bar-container"><div className="progress-bar" style={{ width: '100%' }}></div></div>
            <span className="step-percent">100%</span>
          </div>
          <div className="step">
            <span className="step-label"><span className="step-check" style={{filter: 'grayscale(1)'}}>⚙️</span> Setup</span>
            <div className="progress-bar-container"><div className="progress-bar" style={{ width: '80%' }}></div></div>
            <span className="step-percent">80%</span>
          </div>
          <div className="step">
            <span className="step-label"><span className="step-check" style={{filter: 'grayscale(1)'}}>💡</span> Aha moment</span>
            <div className="progress-bar-container"><div className="progress-bar" style={{ width: '60%' }}></div></div>
            <span className="step-percent">60%</span>
          </div>
          <div className="step">
            <span className="step-label"><span className="step-check">🌗</span> Activated</span>
            <div className="progress-bar-container"><div className="progress-bar" style={{ width: '40%' }}></div></div>
            <span className="step-percent">40%</span>
          </div>
          <div className="step">
            <span className="step-label"><span className="step-check" style={{filter: 'grayscale(1)'}}>🏃</span> Active</span>
            <div className="progress-bar-container"><div className="progress-bar" style={{ width: '80%' }}></div></div>
            <span className="step-percent">80%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
