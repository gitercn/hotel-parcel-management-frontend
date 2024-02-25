import React from 'react';

const UnregisterParcelModal = ({ isOpen, onClose, onConfirm, selectedParcels }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Unregistration</h2>
        <p>Are you sure you want to unregister the selected parcels?</p>
        <button onClick={() => onConfirm(selectedParcels)}>Yes, Unregister</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UnregisterParcelModal;
