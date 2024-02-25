function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName() {
  const names = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana'];
  return names[getRandomInt(0, names.length - 1)];
}

function getRandomSurname() {
  const surnames = ['Doe', 'Smith', 'Johnson', 'Lee', 'Brown', 'Williams'];
  return surnames[getRandomInt(0, surnames.length - 1)];
}

function getRandomRoomNumber() {
  return getRandomInt(100, 500).toString();
}

function getRandomParcelNumber() {
  return 'P' + getRandomInt(1000, 9999).toString();
}

function getRandomComment() {
  const comments = ['Fragile', 'Handle with care', 'Urgent', 'Standard delivery'];
  return comments[getRandomInt(0, comments.length - 1)];
}

function getRandomCheckInAndOutTimes() {
  const checkInTime = new Date();
  // Randomly decide if the guest has checked out
  const checkedOut = Math.random() > 0.5;
  const checkOutTime = checkedOut ? new Date(checkInTime.getTime() + getRandomInt(1, 72) * 60 * 60 * 1000) : null; // Add between 1 to 72 hours to check-in time for check-out

  return {
    checkIn: checkInTime.toISOString(),
    checkOut: checkOutTime ? checkOutTime.toISOString() : null
  };
}

export function generateRandomCheckInData() {
  const { checkIn, checkOut } = getRandomCheckInAndOutTimes();
  return {
    firstName: getRandomName(),
    lastName: getRandomSurname(),
    roomNumber: getRandomRoomNumber(),
    checkIn,
    checkOut
  };
}


export function generateRandomParcelData(guestId) {
  return {
    parcelNumber: getRandomParcelNumber(),
    guest: {
      id: guestId
    },
    receptionistComment: getRandomComment(),
  };
}
