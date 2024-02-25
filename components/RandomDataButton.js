import axios from 'axios';
import { generateRandomCheckInData, generateRandomParcelData } from '../utils/generateRandomData';

async function checkInGuest(guestData) {
  const response = await axios.post('/api/guests/check-in', guestData);
  return response.data;
}

async function registerParcel(parcelData) {
  const response = await axios.post('/api/parcels/register', parcelData);
  return response.data;
}

function RandomDataButton() {
  const handleGenerateData = async () => {
    try {
      // Generate and check in a random guest
      const checkInData = generateRandomCheckInData();
      const checkedInGuestResponse = await checkInGuest(checkInData);

      // Check if the guest is checked in before registering a parcel
      if (checkedInGuestResponse.checkedIn) {
        // Generate and register a random parcel for the new guest
        const parcelData = generateRandomParcelData(checkedInGuestResponse.id);
        await registerParcel(parcelData);
        alert('Random guest checked in and parcel registered successfully!');
      } else {
        alert('Random guest registered but no parcel registered because the guest is not currently checked in.');
      }
    } catch (error) {
      console.error('Error generating random data:', error);
      alert('Failed to create random data. Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <button onClick={handleGenerateData}>Generate Random Data</button>
  );
}

export default RandomDataButton;
