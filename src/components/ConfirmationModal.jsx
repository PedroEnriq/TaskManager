import './ConfirmationModal.css';

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="confirmation-modal-content" onClick={(e) => e.stopPropagation()}>
        
        <h2>{title}</h2>
        <p>{message}</p>
        
        <div className="modal-actions">
          <button 
            type="button" 
            className="cancel-btn" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="confirm-delete-btn"
            onClick={handleConfirm}
          >
            Confirm Deletion
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;