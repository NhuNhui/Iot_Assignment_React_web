import React, { useState } from 'react';
import './RFIDAccess.css';

function RFIDAccess() {
  const [cardId, setCardId] = useState('');
  const [accessStatus, setAccessStatus] = useState(null);
  // Tạo danh sách các thẻ RFID cho phép (giả định)
  const allowedCardIds = ["RFID12345", "RFID67890"];

  const handleScan = () => {
    if (allowedCardIds.includes(cardId.trim())) {
      setAccessStatus('granted');
    } else {
      setAccessStatus('denied');
    }
    // Sau 5 giây hiệu ứng sẽ mờ dần và ẩn thông báo
    setTimeout(() => {
      setAccessStatus(null);
      setCardId('');
    }, 5000);
  };

  return (
    <div className="rfid-access-container">
      <h1>RFID Access Control</h1>
      <p>Quẹt thẻ của bạn để vào khu vườn thông minh</p>
      <div className="rfid-scan-section">
        <input
          type="text"
          placeholder="Nhập mã thẻ RFID..."
          value={cardId}
          onChange={(e) => setCardId(e.target.value)}
        />
        <button onClick={handleScan}>Quét Thẻ</button>
      </div>
      {accessStatus === 'granted' && (
        <div className="access-granted">
          <p>Chào mừng!</p>
        </div>
      )}
      {accessStatus === 'denied' && (
        <div className="access-denied">
          <p>Truy cập từ chối!</p>
        </div>
      )}
    </div>
  );
}

export default RFIDAccess;
