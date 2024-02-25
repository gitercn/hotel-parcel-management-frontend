import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { filterParcels } from './SearchFilter';
import ParcelRowsForGuest from './ParcelRowsForGuest';
import UnregisterParcelModal from './UnregisterParcelModal';

// Fetch all checked-in guests and their parcels
const fetchCheckedInGuestsAndParcels = async () => {
  const { data: guests } = await axios.get('/api/guests/checked-in');
  // Fetch parcels for each guest and add it to the guest object
  await Promise.all(guests.map(async (guest) => {
    const { data: parcels } = await axios.get(`/api/parcels/guest/${guest.id}`);
    guest.parcels = parcels;
  }));
  return guests;
};

function ParcelList() {
  const [searchText, setSearchText] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [selectedParcels, setSelectedParcels] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { data: guests, isLoading: loadingGuests, error: errorGuests, refetch } = useQuery('checkedInGuestsAndParcels', fetchCheckedInGuestsAndParcels);

  const handleParcelSelect = (parcelId) => {
    setSelectedParcels((prevSelected) =>
      prevSelected.includes(parcelId)
        ? prevSelected.filter((id) => id !== parcelId)
        : [...prevSelected, parcelId]
    );
  };

  const handleUnregisterClick = () => {
    setIsModalOpen(true);
  };

  const closeUnregisterModal = () => {
    setIsModalOpen(false);
  };

  const unregisterParcels = async (parcelIds) => {
    try {
      await Promise.all(parcelIds.map((id) =>
        axios.post(`/api/parcels/pickup/${id}`)
      ));
      // Refetch the parcel list to get the updated data
      refetch();
    } catch (error) {
      console.error('Failed to pickup parcels:', error);

    }
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thTdStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
  };

  if (loadingGuests) return <p>Loading guests...</p>;
  if (errorGuests) return <p>An error has occurred: {errorGuests.message}</p>;

  // Filter guests' parcels based on search text and checkout date
  const filteredParcels = guests.flatMap(guest => 
    filterParcels(guest.parcels, searchText, checkoutDate)
  );

  // Sort the parcels by guest's checkout date from earliest to latest, placing null dates at the end
  const sortedParcels = [...filteredParcels].sort((a, b) => {

    if (a.guest.checkOut === null) return 1;
    if (b.guest.checkOut === null) return -1;
    return new Date(a.guest.checkOut) - new Date(b.guest.checkOut);
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by room number, name, or parcel number"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <input
        type="date"
        value={checkoutDate}
        onChange={(e) => setCheckoutDate(e.target.value)}
      />
      <button onClick={handleUnregisterClick}>Unregister (Pickup) parcel</button>
      <UnregisterParcelModal
        isOpen={isModalOpen}
        onClose={closeUnregisterModal}
        onConfirm={unregisterParcels}
        selectedParcels={selectedParcels}
      />
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Select</th>
            <th style={thTdStyle}>Guest ID</th>
            <th style={thTdStyle}>Guest Name</th>
            <th style={thTdStyle}>Room Number</th>
            <th style={thTdStyle}>Parcel Number</th>
            <th style={thTdStyle}>Comment</th>
            <th style={thTdStyle}>Check-In Time</th>
            <th style={thTdStyle}>Check-Out Time</th>
            <th style={thTdStyle}>Checked In</th>
            <th style={thTdStyle}>Picked Up</th>
          </tr>
        </thead>
        <tbody>
          {sortedParcels.map(parcel => (
            <ParcelRowsForGuest
              key={parcel.id}
              parcel={parcel}
              style={thTdStyle}
              handleParcelSelect={handleParcelSelect}
              selectedParcels={selectedParcels}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParcelList;
