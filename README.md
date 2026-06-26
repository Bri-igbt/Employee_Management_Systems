# Employee Management System (EMS)
<img src="https://res.cloudinary.com/dhdcmkuhx/image/upload/v1782464961/Screenshot_2026-06-26_at_09.51.03_xg06li.png" alt="EMS Image"/>

A full‑stack Employee Management System built with React (Vite) on the client and Node.js/Express + MongoDB on the server. EMS enables organizations to manage employees, attendance, leaves, and payslips with role‑based access (Admin & Employee), JWT authentication, email notifications, and background workflows powered by Inngest.

An Employee Management System (EMS) is a software application designed to help organizations efficiently manage employee information, daily operations, and human resource activities. It serves as a centralized platform where employee records, attendance, payroll, performance, and other workforce-related data can be stored, updated, and accessed securely.

The primary goal of an Employee Management System is to improve organizational productivity by automating manual administrative tasks. Instead of maintaining paper files or spreadsheets, businesses can use an EMS to keep accurate and up-to-date employee information in a digital format. This reduces errors, saves time, and enhances data security.


## Key Features

- Authentication & Authorization
  - JWT-based login for Admin and Employee portals
  - Role‑based access control with admin‑only endpoints
  - Change password flow
- Employee Management (Admin)
  - Create, update, soft‑delete employees
  - Departments, salaries, allowances, deductions, status, and bio
- Attendance (Employee)
  - Clock‑in / Clock‑out with automatic late/working hours/day‑type calculation
  - Auto reminder and auto check‑out assistance via background job (Inngest)
  - Recent attendance history view
- Leave Management
  - Employees can apply for leave (SICK, CASUAL, ANNUAL)
  - Admins can approve/reject
  - Reminders to Admin if pending > 24h (email via Nodemailer)
- Payslips
  - Admin: generate monthly payslips (net salary calculation)
  - Employees: view and print/download individual payslips
- Dashboard
  - Admin: total employees, departments, today’s attendance, pending leaves
  - Employee: current month attendance count, pending leaves, latest payslip
- Profile & Settings
  - View/update profile (contact, bio, etc.)
- Modern UI
  - React 19, Tailwind CSS, lucide‑react icons, React Hot Toast notifications


## Tech Stack

- Client
  - React 19, Vite, React Router, Axios, Tailwind CSS
- Server
  - Node.js, Express 5
  - MongoDB with Mongoose
  - JWT (jsonwebtoken), bcrypt
  - Multer (form data), CORS
  - Nodemailer (SMTP via Brevo or any SMTP server)
  - Inngest (background workflows & scheduled steps)
- Tooling
  - ESLint, PostCSS/Autoprefixer, Vite Dev Server


## Monorepo Structure

- client/ — React SPA (Vite)
- server/ — Express API + MongoDB + background jobs

```
EMS/
├─ client/
│  ├─ src/
│  │  ├─ api/axios.js                 # Axios instance (baseURL + auth header)
│  │  ├─ components/                  # UI components (attendance, leave, payslip, etc.)
│  │  ├─ context/AuthContext.jsx      # Auth provider & hooks
│  │  ├─ pages/                       # Dashboard, Employees, Attendance, Leave, Payslip, Settings, Login
│  │  ├─ main.jsx, App.jsx
│  │  └─ index.css, assets/
│  ├─ index.html
│  └─ package.json
└─ server/
   ├─ server.js                       # App entry, route registration, Inngest endpoint
   ├─ config/
   │  ├─ db.js                        # Mongo connection (MONGODB_URI)
   │  └─ nodemailer.js                # SMTP transport + sendEmail helper
   ├─ controllers/                    # Business logic (auth, employees, attendance, leave, payslip, dashboard)
   ├─ middleware/auth.js              # JWT protect + admin guard
   ├─ models/                         # Mongoose schemas (User, Employee, Attendance, LeaveApplication, Payslip)
   ├─ routes/                         # Express routers
   ├─ constants/departments.js
   ├─ inngest/index.js                # Inngest client & background functions
   ├─ seed.js                         # Admin seeding script
   ├─ vercel.json                     # Serverless deployment config (optional)
   └─ package.json
```


## Getting Started

Prerequisites
- Node.js 18+ (recommended)
- MongoDB Atlas connection string or local MongoDB instance
- SMTP credentials (Brevo, SendGrid, etc.) for email notifications
- Optional: Inngest account/keys for production signing (local works without extra config)


### 1) Clone and install

- Install Server deps
  - cd server
  - npm install
- Install Client deps
  - cd ../client
  - npm install


### 2) Configure environment variables

Create a .env file in server/ with:

```
# Database
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_jwt_secret_value

# Admin & Notifications
ADMIN_EMAIL=admin@example.com
SENDER_EMAIL=no-reply@example.com
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password

# Optional Inngest (for production signing/verification)
# INNGEST_SIGNING_KEY=...
```

Create a .env file in client/ (optional) if the API base URL isn’t the default:

```
# Note: Vite only exposes vars prefixed with VITE_
VITE_BASEURL=http://localhost:8000
```

- By default, client/src/api/axios.js points to http://localhost:8000/api if VITE_BASEURL isn’t provided.


### 3) Run the apps (development)

- Start the server
  - cd server
  - npm run start         # or: npm run server (with nodemon)
  - Server runs on http://localhost:8000

- Seed an initial Admin user (one‑time)
  - Ensure ADMIN_EMAIL is set in server/.env
  - cd server
  - npm run seed
  - Temporary password printed in terminal: admin123 (change it after login)

- Start the client
  - cd client
  - npm run dev
  - Open the printed local URL (e.g., http://localhost:5173)


## Login & Roles

- Admin portal: /login/admin
- Employee portal: /login/employee
- After login, JWT token is stored in localStorage and attached to API calls via Authorization: Bearer <token>.


## High‑Level API Overview

Base URL: http://<server-host>/api

Auth (/api/auth)
- POST /login — Body: { email, password, role_type: "admin" | "employee" } → { user, token }
- GET /session — Requires Bearer token → { user }
- POST /change-password — Requires Bearer token; Body: { currentPassword, newPassword }

Employees (/api/employees) — Admin only
- GET / — Optional query: ?department=Engineering
- POST / — Create user+employee
- PUT /:id — Update employee + related user fields (role/password/email)
- DELETE /:id — Soft delete (isDeleted=true, employmentStatus=INACTIVE)

Attendance (/api/attendance)
- POST / — Employee clock‑in/out; server computes status, workingHours, and dayType. Triggers background reminder and safety auto checkout flow.
- GET / — Employee attendance history (limit=30 default)

Leave (/api/leave)
- POST / — Employee applies for leave; server validates dates and triggers admin reminder if pending > 24h
- GET / —
  - Admin: returns all leaves (optionally filter by ?status=PENDING)
  - Employee: returns own leaves + employee info
- PATCH /:id — Admin approves/rejects (status in [APPROVED, REJECTED, PENDING])

Payslips (/api/payslips)
- POST / — Admin creates payslip ({ employeeId, month, year, basicSalary, allowances, deductions }) → netSalary computed
- GET / —
  - Admin: all payslips (with employee data)
  - Employee: own payslips
- GET /:id — Single payslip (populated employee data)

Dashboard (/api/dashboard)
- GET / —
  - Admin: { totalEmployees, totalDepartments, todayAttendance, pendingLeaves }
  - Employee: { employee, currentMonthAttendance, pendingLeaves, latestPayslip }

Inngest Endpoint
- The server exposes /api/inngest for receiving/scheduling background events (used internally for reminders and auto check‑out assistance).


## Data Models (Summary)

- User: { email, password, role: ADMIN|EMPLOYEE }
- Employee: { userId, firstName, lastName, email, phone, position, department, basicSalary, allowances, deductions, employmentStatus, joinDate, isDeleted, bio }
- Attendance: { employeeId, date, checkIn, checkOut, status: PRESENT|ABSENT|LATE, workingHours, dayType }
- LeaveApplication: { employeeId, type: SICK|CASUAL|ANNUAL, startDate, endDate, reason, status }
- Payslip: { employeeId, month, year, basicSalary, allowances, deductions, netSalary }


## Client Application

- Routing (React Router)
  - /login, /login/admin, /login/employee
  - /dashboard, /employees, /attendance, /leave, /payslips, /settings, /print/payslips/:id
- Auth Context
  - Provides current user/session state and guards routes in Layout
- UI/UX
  - Tailwind CSS styles, lucide-react icons, toasts for feedback


## Scripts

Server (in server/package.json)
- npm run start — Start Express server
- npm run server — Start with nodemon for hot reload
- npm run seed — Seed initial Admin user (requires ADMIN_EMAIL)

Client (in client/package.json)
- npm run dev — Start Vite dev server
- npm run build — Production build
- npm run preview — Preview production build
- npm run lint — Lint client code


## Deployment Notes

- Server
  - Can be deployed to platforms supporting Node/Express (Render, Railway, Fly.io, VPS)
  - vercel.json provided for serverless deployment on Vercel (routes all traffic to server.js)
  - Ensure env vars set (MONGODB_URI, JWT_SECRET, SMTP_*, SENDER_EMAIL, ADMIN_EMAIL, and optionally INNGEST_SIGNING_KEY)
- Client
  - Any static hosting (Vercel, Netlify, S3/CloudFront). Build with npm run build and deploy dist/
  - Configure VITE_BASEURL to the deployed server origin
- Emails
  - Configure SMTP_* and SENDER_EMAIL for production. Brevo example is included; any SMTP provider works.
- Inngest
  - Local dev works out of the box. For production signing/verification, set INNGEST_SIGNING_KEY and consult Inngest docs.


## Security Considerations

- Use strong JWT_SECRET and rotate if compromised
- Enforce HTTPS in production and secure cookie/storage practices if migrating from localStorage
- Validate and sanitize inputs (server already validates critical fields)
- Restrict admin endpoints with protect + protectAdmin middleware


## Troubleshooting

- Server won’t start
  - Verify MONGODB_URI and network access
  - Ensure Node 18+
- Auth errors (401/403)
  - Check Authorization header in requests and JWT_SECRET consistency
  - Verify role_type on login matches the account’s role
- Emails not sending
  - Check SMTP credentials and provider logs; confirm SENDER_EMAIL is authorized
- Client cannot reach server
  - Set VITE_BASEURL correctly; confirm server CORS settings (server uses cors())


## License

This project is provided as‑is. Update licensing as needed for your organization.


## Acknowledgements

- React, Vite, Tailwind CSS
- Express, Mongoose
- Inngest
- Nodemailer
