# Map Tracker Web App

A full-stack web application to visualize and track global crime events interactively. Built with React (frontend), Flask (backend), and PostgreSQL (database).

## Features
- Interactive world map with crime event visualization
- Filtering by country, crime type, and method
- Modern, responsive UI with custom color scheme
- User authentication (login/signup)
- Dashboard and latest news sections
- Draggable country event counts overlay
- Sidebar drawer menu

## Demo
You can run the app locally by following the instructions below.

## Getting Started

### Prerequisites
- Node.js & npm
- Python 3.x
- PostgreSQL

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd map-front
   ```
2. Install dependencies:
   ```sh
   npm install --force
   ```
3. Start the frontend:
   ```sh
   npm start
   ```
   The app will run at `http://localhost:3000`.

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd map-back
   ```
2. (Optional) Create and activate a Python virtual environment.
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Start the backend:
   ```sh
   python app.py
   ```
   The backend will run at `http://localhost:5050`.

### Database Setup
1. Ensure PostgreSQL is running.
2. Create the database and tables using the provided SQL scripts in `map-scripts/`.
3. Update database connection settings in the backend as needed.

## Usage
- Open `http://localhost:3000` in your browser.
- Register a new user or login.
- Explore the map, filter events, and view dashboard/news.

## Codebase
- Frontend: `map-front/`
- Backend: `map-back/`
- SQL scripts: `map-scripts/`

## Author
**Shrom Chopra - ACLED**

## License
This project is for demonstration purposes.

---

For any questions, contact: choprashrom@gmail.com


/screenshots/Screenshot 2025-09-03 at 1.16.53 AM.png
/screenshots/Screenshot 2025-09-03 at 1.17.12 AM.png
/screenshots/Screenshot 2025-09-03 at 1.18.18 AM.png
/screenshots/Screenshot 2025-09-03 at 1.18.31 AM.png
/screenshots/Screenshot 2025-09-03 at 1.18.43 AM.png
/screenshots/Screenshot 2025-09-03 at 1.18.51 AM.png
/screenshots/Screenshot 2025-09-03 at 1.18.59 AM.png
/screenshots/Screenshot 2025-09-03 at 1.19.15 AM.png
/screenshots/Screenshot 2025-09-03 at 1.19.24 AM.png
/screenshots/Screenshot 2025-09-03 at 1.19.33 AM.png
/screenshots/Screenshot 2025-09-03 at 1.19.41 AM.png
/screenshots/Screenshot 2025-09-03 at 1.20.01 AM.png
/screenshots/Screenshot 2025-09-03 at 1.20.36 AM.png

## Repository
Find the latest code and updates at:

GitHub: https://github.com/ShromChopra/Map-Tracker
Branch: feature/login
