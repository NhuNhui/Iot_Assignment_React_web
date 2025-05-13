// src/pages/Analytic.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Analytic.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Analytic({ sensorHistory }) {
  // Tạo nhãn cho biểu đồ dựa trên độ dài mảng history 
  const labels = Array.from({ length: 10 }, (_, i) => `T${i + 1}`);

  const temperatureChart = {
    labels,
    datasets: [
      {
        label: 'Nhiệt độ',
        data: sensorHistory.temperature,
        fill: false,
        borderColor: '#FF5733',
        tension: 0.4,
      }
    ]
  };

  const airHumidityChart = {
    labels,
    datasets: [
      {
        label: 'Độ ẩm không khí',
        data: sensorHistory.airHumidity,
        fill: false,
        borderColor: '#3498DB',
        tension: 0.4,
      }
    ]
  };

  const soilMoistureChart = {
    labels,
    datasets: [
      {
        label: 'Độ ẩm đất',
        data: sensorHistory.soilMoisture,
        fill: false,
        borderColor: '#27ae60',
        tension: 0.4,
      }
    ]
  };

  const brightnessChart = {
    labels,
    datasets: [
      {
        label: 'Độ sáng',
        data: sensorHistory.brightness,
        fill: false,
        borderColor: '#f1c40f',
        tension: 0.4,
      }
    ]
  };

  return (
    <div className="analytic-container">
      <h1>Biểu Đồ Phân Tích (Real-Time từ Adafruit IO)</h1>
      <div className="chart-grid">
        <div>
          <Line data={temperatureChart} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Nhiệt độ' }
            }
          }} />
        </div>
        <div>
          <Line data={airHumidityChart} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Độ ẩm không khí' }
            }
          }} />
        </div>
        <div>
          <Line data={soilMoistureChart} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Độ ẩm đất' }
            }
          }} />
        </div>
        <div>
          <Line data={brightnessChart} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Độ sáng' }
            }
          }} />
        </div>
      </div>
    </div>
  );
}

export default Analytic;
