import React from 'react';

function ParcelRowsForGuest({ parcel, style, handleParcelSelect, selectedParcels }) {
  // Function to render the checkedIn status
  const renderCheckedInStatus = (checkedIn) => {
    return checkedIn ? 'Yes' : 'No';
  };

  // Function to render the pickedUp status
  const renderPickedUpStatus = (pickedUp) => {
    return pickedUp ? 'Yes' : 'No';
  };

  return (
    <tr>
      <td style={style}>
        <input
          type="checkbox"
          checked={selectedParcels.includes(parcel.id)}
          onChange={() => handleParcelSelect(parcel.id)}
        />
      </td>
      <td style={style}>{parcel.guest.id}</td>
      <td style={style}>{`${parcel.guest.firstName} ${parcel.guest.lastName}`}</td>
      <td style={style}>{parcel.guest.roomNumber}</td>
      <td style={style}>{parcel.parcelNumber}</td>
      <td style={style}>{parcel.receptionistComment}</td>
      <td style={style}>{parcel.guest.checkIn ? new Date(parcel.guest.checkIn).toLocaleString() : 'N/A'}</td>
      <td style={style}>{parcel.guest.checkOut ? new Date(parcel.guest.checkOut).toLocaleString() : 'N/A'}</td>
      <td style={style}>{renderCheckedInStatus(parcel.guest.checkedIn)}</td>
      <td style={style}>{renderPickedUpStatus(parcel.pickedUp)}</td>
    </tr>
  );
}

export default ParcelRowsForGuest;
