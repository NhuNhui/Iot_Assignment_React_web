// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytic from './pages/Analytic';
import Control from './pages/Control';
import RFIDAccess from './pages/RFIDAccess';
import Login from './pages/Login';
import './App.css';

// Cấu hình Adafruit IO
const AIO_USERNAME = "Giaqui14032002"; // Thay YOUR_USERNAME bằng tài khoản Adafruit IO của bạn
const AIO_KEY = "key";         // Thay YOUR_AIO_KEY bằng key của bạn

// Endpoint để đọc dữ liệu cảm biến trên Adafruit IO
const sensorEndpoints = {
  temperature: `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/temp`,
  airHumidity: `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/humi`,
  soilMoisture: `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/soil-moisture`,
  brightness: `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/light`
};

// Endpoint để gửi lệnh điều khiển
const controlEndpoints = {
  led: `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/led/data`,
  bomb: `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/bomb/data`
};

function App() {
  // Quản lý trạng thái đăng nhập
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State cho giá trị cảm biến hiện tại
  const [sensorData, setSensorData] = useState({
    temperature: 25,
    airHumidity: 55,
    soilMoisture: 40,
    brightness: 700,
  });

  // State cho lịch sử 10 giá trị gần nhất của mỗi chỉ số
  const [sensorHistory, setSensorHistory] = useState({
    temperature: [],
    airHumidity: [],
    soilMoisture: [],
    brightness: [],
  });

  // Hàm hỗ trợ cập nhật mảng lịch sử (đảm bảo tối đa 10 giá trị)
  const updateHistory = (newReading, historyArray) => {
    const updated = [...historyArray, newReading];
    if (updated.length > 10) {
      updated.shift();
    }
    return updated;
  };

  // Khi ứng dụng khởi động, lấy dữ liệu từ localStorage nếu có
  useEffect(() => {
    const storedSensorData = localStorage.getItem("sensorData");
    const storedSensorHistory = localStorage.getItem("sensorHistory");
    if (storedSensorData) {
      setSensorData(JSON.parse(storedSensorData));
    }
    if (storedSensorHistory) {
      setSensorHistory(JSON.parse(storedSensorHistory));
    }
  }, []);

  // Hàm fetch dữ liệu cảm biến từ Adafruit IO và lưu vào state, localStorage
  const fetchSensorData = async () => {
    const options = {
      method: 'GET',
      headers: {
        "X-AIO-Key": AIO_KEY,
        "Content-Type": "application/json"
      }
    };

    try {
      const tempRes = await fetch(sensorEndpoints.temperature, options);
      const tempData = await tempRes.json();

      const airRes = await fetch(sensorEndpoints.airHumidity, options);
      const airData = await airRes.json();

      const soilRes = await fetch(sensorEndpoints.soilMoisture, options);
      const soilData = await soilRes.json();

      const brightRes = await fetch(sensorEndpoints.brightness, options);
      const brightData = await brightRes.json();

      // Lấy giá trị mới nhất và chuyển về kiểu số
      const newTemperature = Number(tempData.last_value);
      const newAirHumidity = Number(airData.last_value);
      const newSoilMoisture = Number(soilData.last_value);
      const newBrightness = Number(brightData.last_value);

      const updatedSensorData = {
        temperature: newTemperature,
        airHumidity: newAirHumidity,
        soilMoisture: newSoilMoisture,
        brightness: newBrightness,
      };

      // Update state và lưu vào localStorage
      setSensorData(updatedSensorData);
      localStorage.setItem("sensorData", JSON.stringify(updatedSensorData));

      setSensorHistory((prev) => {
        const updatedHistory = {
          temperature: updateHistory(newTemperature, prev.temperature),
          airHumidity: updateHistory(newAirHumidity, prev.airHumidity),
          soilMoisture: updateHistory(newSoilMoisture, prev.soilMoisture),
          brightness: updateHistory(newBrightness, prev.brightness),
        };
        localStorage.setItem("sensorHistory", JSON.stringify(updatedHistory));
        return updatedHistory;
      });
    } catch (error) {
      console.error("Error fetching sensor data from Adafruit IO:", error);
    }
  };

  // Gọi fetchSensorData mỗi 15 giây để cập nhật dữ liệu liên tục
  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 15000);
    return () => clearInterval(interval);
  }, []);

  // Hàm gửi lệnh điều khiển (publishCommand) cho LED, Bomb
  const publishCommand = async (endpoint, command) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "X-AIO-Key": AIO_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ value: command })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Command published:", data);
      return data;
    } catch (error) {
      console.error("Error publishing command:", error);
      return null;
    }
  };

  // Khởi tạo trạng thái đăng nhập từ localStorage khi load trang
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        {isAuthenticated ? (
          <Route path="*" element={
            <div className="app-container">
              <Sidebar setIsAuthenticated={setIsAuthenticated} />
              <div className="main-content">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard sensorData={sensorData} />} />
                  <Route path="/analytic" element={<Analytic sensorHistory={sensorHistory} />} />
                  <Route path="/control" element={
                    <Control 
                      publishCommand={publishCommand} 
                      controlEndpoints={controlEndpoints} 
                    />}
                  />
                  <Route path="/rfid" element={<RFIDAccess />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </div>
            </div>
          } />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
