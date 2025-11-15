import { useState, useEffect } from 'react';
import './MemberModal.css'; // Importa os estilos

function MemberModal({ isOpen, onClose, onConfirm }) {
  const [memberName, setMemberName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMemberName('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(memberName);
    setMemberName('');
  };

  return (
    
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <h2>Add New Member</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Member name (ex: Ana Silva)"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            className="member-input"
            required
          />
          
          <div className="modal-actions">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="confirm-btn" 
              disabled={memberName.trim() === ''}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MemberModal;