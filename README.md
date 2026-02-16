# Frontend Roomify

This frontend is a web interface for the **Roomify** application, built using **React**, **Tailwind CSS**, and several supporting libraries. The web application is **responsive**, ensuring comfortable access on both desktop and mobile devices.

## Key Features

- **Login & Register** pages for users and admins
- User & admin dashboards
- **Room booking**: booking, history, details
- Filtering by status, date, and borrower name search
- **Responsive** design across various screen sizes
- Display booking status with different colors (Pending, Approved, Rejected)
- Animations and hover effects for enhanced user experience

## Admin Login (for testing)

- **Username:** `crong`  
- **Password:** `crong123`  

> Use this account to log in as an admin and access the admin dashboard.

## Technologies

- **React** (frontend framework)
- **Vite** (build tool & dev server)
- **Tailwind CSS** (utility-first CSS)
- **React Router DOM** (page routing)
- **Fetch API** (for backend communication)

## Project Structure

```
2026-roomify-frontend/
│
├─ public/                    # Static files (favicon, index.html)
├─ src/
│  ├─ assets/                 # Images, icons, and static files
│  ├─ img/                    # Can be used for additional images
│  ├─ pages/
│  │  ├─ admin/               # Admin pages
│  │  │  ├─ adminLogin.tsx
│  │  │  ├─ adminRegister.tsx
│  │  │  ├─ DashboardAdmin.tsx
│  │  │  ├─ BuildingRooms.tsx
│  │  │  ├─ EditStatus.tsx
│  │  │  └─ HistoryPage.tsx
│  │  └─ user/                # User pages
│  │     ├─ userLogin.tsx
│  │     ├─ userRegister.tsx
│  │     ├─ DashboardUser.tsx
│  │     ├─ BookingForm.tsx
│  │     ├─ BuildingRoomsUser.tsx
│  │     └─ EditBooking.tsx
│  ├─ App.tsx                 # App entry point
│  └─ index.css               # Global styling
├─ .env.example
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ tailwind.config.js
├─ tsconfig.app.json
├─ postcss.config.js
└─ README.md
```

---

## Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Zahrins/2026-Roomify-frontend.git
cd 2026-Roomify-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

---

## Environment Configuration

Create a `.env` file in the project root by copying from `.env.example`:

```bash
cp .env.example .env
```

Example `.env` contents:

```env
# Backend API URL (ASP.NET Core)
VITE_API_URL=https://localhost:7252/api

# Dev server port (optional, default 5173)
VITE_PORT=5173

# Environment mode
VITE_ENV=development
```

> **Note:** 
> - Ensure every variable is prefixed with `VITE_` to be accessible in React using `import.meta.env.VITE_API_URL`.
> - The backend uses **HTTPS** on port **7252** (ASP.NET Core default).

---

## Running the Application

```bash
npm run dev
# or
yarn dev
```

The server will run at:

```
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
# or
yarn build
```

Build files will be saved in the `dist/` folder.

---

## Preview Production Build

```bash
npm run preview
# or
yarn preview
```

---

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, change `VITE_PORT` in the `.env` file or run with:

```bash
npm run dev -- --port 3000
```

### Backend Connection Failed

Make sure:
1. The backend is running
2. The URL in `VITE_API_URL` is correct
3. CORS is configured in the backend

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new feature branch
3. Commit changes
4. Open a pull request

---

## License

This project is licensed under the MIT License.

---

## Credits / Author

Developed by Zahrin Savana Khadijah
Frontend Developer – Roomify Project