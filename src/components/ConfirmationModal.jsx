import React from 'react';

const ConfirmationModal = ({ onCancel, onDelete }) => {

  

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to delete this item?</p>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
