import { useState } from 'react';
import axios from 'axios';

function RegisterParcelModal({ onClose }) {
  const [parcelNumber, setParcelNumber] = useState('');
  const [guestId, setGuestId] = useState('');
  const [receptionistComment, setComment] = useState('');

  const validateFields = () => {
    // Check for empty fields
    if (!parcelNumber.trim() || !guestId.trim()) {
      alert('Parcel number and guest ID are required.');
      return false;
    }
    // Check for maximum length
    if (parcelNumber.length > 10 || guestId.length > 10 || receptionistComment.length > 200) {
      alert('Please adhere to the maximum length for fields: Parcel number and guest ID up to 10 characters, comment up to 200 characters.');
      return false;
    }
    return true;
  };

  const registerParcel = async () => {
    if (!validateFields()) {
      return; // Stop the registration process if validation fails
    }
    try {
      const response = await axios.post('/api/parcels/register', {
        parcelNumber,
        guest: { id: guestId },
        receptionistComment
      });
      if (response.status === 200) {
        onClose();
      }
    } catch (error) {
      console.error('Error registering parcel:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={parcelNumber}
        onChange={(e) => setParcelNumber(e.target.value)}
        placeholder="Parcel Number"
      />
      <input
        type="text"
        value={guestId}
        onChange={(e) => setGuestId(e.target.value)}
        placeholder="Guest ID"
      />
      <input
        type="text"
        value={receptionistComment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Receptionist's Comment"
      />
      <button onClick={registerParcel}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default RegisterParcelModal;
