# Care Notes App

This is an **offline-first** Care Notes App built with:
- **Frontend:** React, Redux Toolkit, WatermelonDB (for offline storage)
- **Backend:** Node.js (with a mock JSON file for storage)
- **Database:** WatermelonDB (frontend) + JSON file (backend, mock database)
- **State Management:** Redux Toolkit
- **Sync Mechanism:** Polling every 60 seconds to fetch new notes

## Features
 Add Care Notes (Resident Name, Author Name, Content)
 Store notes offline using WatermelonDB
 Sync notes from the backend every 60 seconds
 Display the 5 most recent notes in the UI
 Responsive design with modal support
 Toast notifications for success & error messages

---

##  How to Run the Project

### ** 1️ Clone the Repository**
```bash
  git clone https://github.com/SajidLakhani/full-stack-care-notes-app.git
  cd full-stack-care-notes-app
```

### ** 2️ Run the Backend**
```bash
  cd backend
  npm install
  npm start
```
_Backend will start on **http://localhost:5000**_

### ** 3️ Run the Frontend**
```bash
  cd ../frontend
  npm install
  npm run dev
```
_Frontend will start on **http://localhost:5173** (or another port)_

---

##  Project Structure
```
/care-notes
 ├── /backend        # Node.js backend
 │   ├── server.js   # Express server
 │   ├── data.json   # Mock database
 │   ├── routes.js   # API routes
 │   ├── package.json
 │   └── .env        # Backend environment variables
 │
 ├── /frontend       # React + Redux frontend
 │   ├── /src
 │   │   ├── /components   # UI Components
 │   │   ├── /redux        # Redux state management
 │   │   ├── /db           # WatermelonDB setup
 │   │   ├── App.js        # Main App component
 │   │   ├── index.css     # Styles
 │   │   ├── main.jsx      # Entry file
 │   ├── package.json
 │   ├── vite.config.js
 │   └── .env              # Frontend environment variables
 │
 ├── README.md  # Documentation
```

---

##  API Endpoints
| Method | Endpoint           | Description                |
|--------|-------------------|----------------------------|
| GET    | /api/care-notes   | Fetch all care notes       |
| POST   | /api/care-notes   | Add a new care note        |

_Backend data is stored in `backend/data.json` as a mock database._

---

##  Additional Notes
- **Frontend Polling:** The frontend fetches notes from the backend every 60 seconds.
- **Offline Storage:** Notes are stored locally using WatermelonDB to allow offline access.
- **Error Handling:** If the backend is unavailable, the app falls back to offline data.


