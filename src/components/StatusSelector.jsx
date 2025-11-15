import { useState, useRef, useEffect } from 'react';
import './StatusSelector.css';

const STATUS_COLORS = {
  "Pending": "#f59e0b",     
  "In Progress": "#3b82f6", 
  "Completed": "#10b981",   
};


const ALL_STATUSES = ["Pending", "In Progress", "Completed"];

function StatusSelector({ currentStatus, taskId, onTaskUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectorRef]);

  const handleStatusClick = (newStatus) => {
    if (newStatus !== currentStatus) {
      onTaskUpdate(taskId, 'status', newStatus);
    }
    setIsOpen(false);
  };

  const statusColor = STATUS_COLORS[currentStatus] || "#6b7280";

  return (
    <div 
      className="status-selector-container" 
      ref={selectorRef} 
    >
      <button
        className="current-status-button"
        style={{ backgroundColor: statusColor }}
        onClick={() => setIsOpen(!isOpen)}
        title="Click to change status"
      >
        {currentStatus}
      </button>

      {isOpen && (
        <div className="status-dropdown">
          {ALL_STATUSES.map((status) => (
            <div
              key={status}
              className={`status-option ${status === currentStatus ? 'selected' : ''}`}
              onClick={() => handleStatusClick(status)}
            >
              <div 
                className="status-dot" 
                style={{ backgroundColor: STATUS_COLORS[status] }}
              ></div>
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusSelector;