export const filterParcels = (parcels, searchText, checkoutDate) => {
  if (!parcels || !Array.isArray(parcels)) {
    // If parcels is undefined or not an array, return an empty array
    return [];
  }

  return parcels.filter((parcel) => {
    const checkOutTime = parcel.guest.checkOut ? new Date(parcel.guest.checkOut).toLocaleDateString() : '';
    return (
      parcel.parcelNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      parcel.guest.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      parcel.guest.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      parcel.guest.roomNumber.includes(searchText) ||
      (checkoutDate && checkOutTime === new Date(checkoutDate).toLocaleDateString())
    );
  });
};
