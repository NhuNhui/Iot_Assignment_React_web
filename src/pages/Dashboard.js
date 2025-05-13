// src/pages/Dashboard.js
import React from 'react';
import './Dashboard.css';
import { FaThermometerHalf, FaTint, FaLeaf, FaSun } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Dashboard({ sensorData }) {
  // Tính toán phần trăm cho các chỉ số
  const temperaturePercent = Math.round(((sensorData.temperature - 20) / (40 - 20)) * 100);
  const brightnessPercent = Math.round(((sensorData.brightness) / 4000) * 100);

  return (
    <div className="dashboard-container">
      <h1>Smart Garden Dashboard</h1>
      <div className="dashboard-grid">
        {/* Card Nhiệt độ */}
        <div className="dashboard-card card-temp">
          <div className="card-icon"><FaThermometerHalf /></div>
          <div className="gauge-container">
            <CircularProgressbar 
              value={temperaturePercent} 
              text={`${sensorData.temperature}°C`}
              styles={buildStyles({
                pathColor: "#FF5733",
                textColor: "#fff",
                trailColor: "rgba(255,255,255,0.3)",
                textSize: '16px',
              })}
            />
          </div>
          <div className="card-label"><h2>Nhiệt độ</h2></div>
        </div>

        {/* Card Độ ẩm không khí */}
        <div className="dashboard-card card-air">
          <div className="card-icon"><FaTint /></div>
          <div className="gauge-container">
            <CircularProgressbar 
              value={sensorData.airHumidity} 
              text={`${sensorData.airHumidity}%`}
              styles={buildStyles({
                pathColor: "#3498DB",
                textColor: "#fff",
                trailColor: "rgba(255,255,255,0.3)",
                textSize: '16px',
              })}
            />
          </div>
          <div className="card-label"><h2>Độ ẩm không khí</h2></div>
        </div>

        {/* Card Độ ẩm đất */}
        <div className="dashboard-card card-soil">
          <div className="card-icon"><FaLeaf /></div>
          <div className="gauge-container">
            <CircularProgressbar 
              value={sensorData.soilMoisture} 
              text={`${sensorData.soilMoisture}%`}
              styles={buildStyles({
                pathColor: "#27ae60",
                textColor: "#fff",
                trailColor: "rgba(255,255,255,0.3)",
                textSize: '16px',
              })}
            />
          </div>
          <div className="card-label"><h2>Độ ẩm đất</h2></div>
        </div>

        {/* Card Độ sáng */}
        <div className="dashboard-card card-bright">
          <div className="card-icon"><FaSun /></div>
          <div className="gauge-container">
            <CircularProgressbar 
              value={brightnessPercent} 
              text={`${sensorData.brightness} Lux`}
              styles={buildStyles({
                pathColor: "#f1c40f",
                textColor: "#fff",
                trailColor: "rgba(255,255,255,0.3)",
                textSize: '16px',
              })}
            />
          </div>
          <div className="card-label"><h2>Độ sáng</h2></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
