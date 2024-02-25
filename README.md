# Parcel Management System

![Parcel Management System Demo](./demo-picture.png)

This Hotel Parcel Management System is a web application built with Next.js, designed to streamline the process of managing parcels for hotel guests. It provides a user-friendly interface for hotel staff to register, track, and handle the pickup of parcels, ensuring efficient and accurate parcel delivery services.

## Project Status

Please note that this project is a prototype and was created for demonstration purposes as part of a coding challenge. While it illustrates my skills in software development, it is not intended for actual use in a production environment and may require further development to meet industry standards.

## The coding challenge requirements

### Scenario
Receptionists have to accomplish various tasks throughout the day when operating a hotel. One of those tasks is to accept parcels for guests.  
•	It happens, that receptionists accept parcels for guests, that was already checked out of the hotel.  
•	It happens from time to time, that guests forget to pick up their parcels before check-out and even forget it then.

### Code challenge: frontend part
Requirements
1.	It should be created single page React(Next.js) web application.
2.	On this page it should be displayed list of registered by receptionists guests' parcels with possibility to filter, register new parcel, unregister parcel.
3.	The parcel filtering should be done:
-	by typing room number, guest' first and last names or parcel number in single input field;
-	by set in calendar guest's checkout date.
4.	List should be sorted by guest's checkout date from earliest to latest: initially, after filtering, after register/unregiter parcels.
5.	Register new parcel should be done via popup with next fields: parcel number, room number, receptionist's comment. Minimal validation on fields for empty and maximum length should be present there.
6.	Receptionist should be able to chose one or several parcels from the list and press "Unregister parcel" to unregister them. Confirmation popup is needed to prevent accidental removal.
7.	Manipulating with data, like getting list, register new and unregister parcels should be done in 2 variants: use Jest mocks and real RESTful JSON-API prepared in backend part.
8.	CSS styles should be done via SCSS in dark purple and white color scheme.

### Deliverable
The frontend part should be provided as source code of React(Next.js) web application on GitHub repo or zip file.
If some specific action is required they should be described in readme.md.

### In Scope
It would be good to have well styled, visually complete solution of managing parcels following the requirements.
All described functions should work.

### Out of Scope
It should not be spent too much time for design there, just a neat alignment of fields/values and following provided color scheme.  
Possibility to sort columns is out of scope, only autosorting described in requirements should be done.


## Features of this frontend application

- Register new parcels for guests
- Track parcel status
- Manage guest check-ins and check-outs
- Unregister parcels upon guest pickup

## Getting Started

To get the development server running locally:

```bash
npm run dev
# or
yarn dev
```
Navigate to http://localhost:3000 in your web browser to view the application.

## API
The frontend interacts with a RESTful JSON-API for all backend operations. 
The backend API should be servered at http://localhost:8000.
For more information on API endpoints and usage, refer to the backend API project https://github.com/gitercn/hotel-parcel-management-backend .

## Usage
Click Generate Random Data a few times to generate a random set of data. Then test the search filter, register parcel, unregister parcel functions.