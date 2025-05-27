import React from "react";
import ReactApexChart from "react-apexcharts";
import "./PortfolioInsights.css";
import { FileText, Shield, DollarSign, AlertTriangle } from "lucide-react";

const PortfolioInsights = () => {
  return (
    <div className="dashboard">
      {/* Top Row */}
      <div className="top-row">
        {/* Book of Business Card */}
        <div className="card business-card">
          <h3 className="card-title">Book Of Business (YTD)</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon blue">
                <FileText size={16} />
              </div>
              <div className="stat-content">
                <div className="stat-value">$25 M</div>
                <div className="stat-label">Written Premium</div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon green">
                <Shield size={16} />
              </div>
              <div className="stat-content">
                <div className="stat-value">5000</div>
                <div className="stat-label">Policy Count</div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon purple">
                <DollarSign size={16} />
              </div>
              <div className="stat-content">
                <div className="stat-value">$500,000</div>
                <div className="stat-label">Claim Amount</div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon teal">
                <AlertTriangle size={16} />
              </div>
              <div className="stat-content">
                <div className="stat-value">5</div>
                <div className="stat-label">Claim Count</div>
              </div>
            </div>
          </div>
        </div>

        {/* Written Premium By Product */}
        <div className="card">
          <h3 className="card-title">Written Premium By Product (YTD)</h3>
          <div className="donut-chart-container">
            <div className="donut-chart">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50" 
                  fill="none" 
                  stroke="#e5e7eb" 
                  strokeWidth="20"
                />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="20"
                  strokeDasharray="188.5 314.2"
                  strokeDashoffset="0"
                  transform="rotate(-90 60 60)"
                />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50" 
                  fill="none" 
                  stroke="#1e40af" 
                  strokeWidth="20"
                  strokeDasharray="125.7 314.2"
                  strokeDashoffset="-188.5"
                  transform="rotate(-90 60 60)"
                />
              </svg>
            </div>
            <div className="donut-legend">
              <div className="legend-item">
                <div className="legend-dot" style={{backgroundColor: '#3b82f6'}}></div>
                <span>Commercial Property</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{backgroundColor: '#1e40af'}}></div>
                <span>General Liability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue by Brokerages */}
        <div className="card">
          <h3 className="card-title">Revenue by Brokerages (YTD)</h3>
          <div className="status-indicator">
            <span className="status-dot green"></span>
            <span className="status-text">On track</span>
            <span className="status-percentage">+24%</span>
          </div>
          <div className="bar-chart">
            <div className="bar-group">
              <div className="bar" style={{height: '25px', backgroundColor: '#3b82f6'}}></div>
              <div className="bar-label">Marsh Brokers</div>
            </div>
            <div className="bar-group">
              <div className="bar" style={{height: '40px', backgroundColor: '#3b82f6'}}></div>
              <div className="bar-label">New York Choice Brokerages</div>
            </div>
            <div className="bar-group">
              <div className="bar" style={{height: '55px', backgroundColor: '#3b82f6'}}></div>
              <div className="bar-label">Ariston Brokerage Corp.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="bottom-row">
        {/* Written Premium By Year */}
        <div className="card large-card">
          <h3 className="card-title">
            Total Report
            <br />
            Written Premium By Year
          </h3>
          <div className="line-chart">
            <div className="y-axis">
              <div className="y-label">40</div>
              <div className="y-label">30</div>
              <div className="y-label">20</div>
              <div className="y-label">10</div>
              <div className="y-label">0</div>
            </div>
            <div className="chart-area">
              <div className="chart-bars">
                <div className="chart-column">
                  <div className="bar-item" style={{height: '40px', backgroundColor: '#e5e7eb'}}></div>
                  <div className="x-label">2019</div>
                </div>
                <div className="chart-column">
                  <div className="bar-item" style={{height: '50px', backgroundColor: '#e5e7eb'}}></div>
                  <div className="x-label">2020</div>
                </div>
                <div className="chart-column">
                  <div className="bar-item" style={{height: '60px', backgroundColor: '#e5e7eb'}}></div>
                  <div className="x-label">2021</div>
                </div>
                <div className="chart-column">
                  <div className="bar-item" style={{height: '35px', backgroundColor: '#e5e7eb'}}></div>
                  <div className="x-label">2022</div>
                </div>
                <div className="chart-column">
                  <div className="bar-item" style={{height: '75px', backgroundColor: '#e5e7eb'}}></div>
                  <div className="x-label">2023</div>
                </div>
                <div className="chart-column active">
                  <div className="bar-item" style={{height: '100px', backgroundColor: '#3b82f6'}}></div>
                  <div className="x-label">2024</div>
                  <div className="bar-value">$19</div>
                </div>
              </div>
              <div className="target-line">
                <div className="dashed-line"></div>
                <div className="target-label">Target</div>
              </div>
            </div>
          </div>
        </div>

        {/* Claim History */}
        <div className="card">
          <h3 className="card-title">Claim History</h3>
          <div className="claim-circles">
            <div className="claim-circle">
              <div className="circle-chart blue">
                <div className="circle-fill" style={{strokeDasharray: '251.3 314.2'}}></div>
                <div className="circle-percentage">83%</div>
              </div>
              <div className="circle-label">General Liability</div>
            </div>
            <div className="claim-circle">
              <div className="circle-chart green">
                <div className="circle-fill" style={{strokeDasharray: '207.3 314.2'}}></div>
                <div className="circle-percentage">66%</div>
              </div>
              <div className="circle-label">Commercial Property</div>
            </div>
          </div>
          <div className="claim-amount">
            <div className="amount-label">Claim Amount</div>
            <div className="amount-value">$500,000</div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default PortfolioInsights;