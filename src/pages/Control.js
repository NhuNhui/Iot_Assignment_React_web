import React, { useState, useEffect } from 'react';
import './Control.css';

function Control({ publishCommand, controlEndpoints }) {
  // true: ON, false: OFF
  const [ledStatus, setLedStatus] = useState(true);
  const [bombStatus, setBombStatus] = useState(false);

  useEffect(() => {
    const storedLedStatus = localStorage.getItem("ledStatus");
    const storedBombStatus = localStorage.getItem("bombStatus");
    if (storedLedStatus !== null) {
      setLedStatus(JSON.parse(storedLedStatus));
    }
    if (storedBombStatus !== null) {
      setBombStatus(JSON.parse(storedBombStatus));
    }
  }, []);
  // Hàm xử lý toggle cho LED
  const toggleLed = () => {
    const newStatus = !ledStatus;
    setLedStatus(newStatus);
    localStorage.setItem("ledStatus", JSON.stringify(newStatus));
    publishCommand(controlEndpoints.led, newStatus ? "ON" : "OFF");
  };

  // Hàm xử lý toggle cho Bomb
  const toggleBomb = () => {
    const newStatus = !bombStatus;
    setBombStatus(newStatus);
    localStorage.setItem("bombStatus", JSON.stringify(newStatus));
    publishCommand(controlEndpoints.bomb, newStatus ? "ON" : "OFF");
  };

  return (
    <div className="control-container">
      <h1>Control Panel</h1>
      <div className="toggle-section">
        <div className="toggle-wrapper">
          <span className="toggle-label">LED</span>
          <label className="switch">
            <input type="checkbox" checked={ledStatus} onChange={toggleLed} />
            <span className="slider"></span>
          </label>
          <span className={`toggle-status ${ledStatus ? 'on' : 'off'}`}>
            {ledStatus ? 'ON' : 'OFF'}
          </span>
        </div>
        <div className="toggle-wrapper">
          <span className="toggle-label">BOMB</span>
          <label className="switch">
            <input type="checkbox" checked={bombStatus} onChange={toggleBomb} />
            <span className="slider"></span>
          </label>
          <span className={`toggle-status ${bombStatus ? 'on' : 'off'}`}>
            {bombStatus ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Control;
