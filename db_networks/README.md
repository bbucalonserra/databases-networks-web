# Event Management System
### University of London | CM2040 Database Networks and the Web - Coursework

This server is a web application for managing events, allowing organisers to manage listings and attendees to browse and book tickets.

#### 1. Installation Requirements
* NodeJS: Latest LTS version is recommended ([https://nodejs.org/en/](https://nodejs.org/en/)).
* SQLite3: Pre-installed on most Mac/Linux systems. If using Windows, ensure SQLite3 is in your PATH.

#### 2. Setup and Execution
To run the application, follow these steps in the project directory:

1. Install Dependencies: 
   npm install

2. Build the Database: 
   - On Mac/Linux: npm run build-db
   - On Windows: npm run build-db-win

3. Start the Server: 
   npm run start

4. Access the App: 
   Open your browser at http://localhost:3000

#### 3. Core Features & Routes
Once the server is running, you can test the following main routes:

* Home Page: http://localhost:3000/
* Organiser Dashboard: http://localhost:3000/organiser
* Attendee Home: http://localhost:3000/attendee

#### 4. Extension: Search Engine & Booking Management
I have improved the server-side functionality with the following extensions:

* Event Search: Located at /attendee. It uses a server-side SQL LIKE query to filter events by title or description based on user input (req.query.q).
* My Bookings History: Located at /attendee/my-bookings. This route performs a SQL JOIN to retrieve bookings linked to event details, demonstrating relational database management.
* Sold Out Logic: The server dynamically checks ticket availability. If an event reaches 0 tickets, the booking button is disabled via server-side logic to maintain data integrity.

#### 5. Additional Libraries
I used only standard, widely-used libraries to ensure the app runs out-of-the-box:
* EJS: Server-side templating.
* SQLite3: Persistent data storage.
* Express: Web framework.

#### 6. Database Notes
* All table structures are defined in db_schema.sql.
* Foreign Key constraints are enabled (PRAGMA foreign_keys=ON) to ensure data integrity.