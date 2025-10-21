# TODO: Enhance Admin Page with Cricket Academy and Improved Bookings

## Step 1: Add AcademyPlayer Interface
- Define AcademyPlayer interface with fields: id, name, email, phone, admissionDate, course, etc.
- [x] COMPLETED

## Step 2: Add State and LocalStorage for Academy Players
- Add academyPlayers state array
- Update loadData and saveData functions to handle academyPlayers
- Initialize academyPlayers from localStorage
- [x] COMPLETED

## Step 3: Add Academy Tab and Dashboard Card
- Add 'academy' tab to navigation
- Add Academy card to dashboard with count
- [x] COMPLETED

## Step 4: Implement renderAcademy Function
- Create renderAcademy component with table for players
- Add Add New Player button
- Implement view/edit/delete actions
- [x] COMPLETED

## Step 5: Enhance Booking Interface
- Add optional fields to Booking interface: numberOfCams?, numberOfDays?, etc.
- [x] COMPLETED

## Step 6: Update renderBookings
- Add columns for numberOfCams, numberOfDays, etc. in bookings table
- Display these fields conditionally based on service type
- [x] COMPLETED

## Step 7: Update Modal Forms and Handlers
- Add 'academy' case to renderFormFields for player admission form
- Update handleSaveItem to handle academy players
- Update handleDelete to handle academy players
- [x] COMPLETED
