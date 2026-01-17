# 📋 MedReminder – Medication & Appointment Management System

## 📌 Overview
**MedReminder** is a full-stack web application designed to help patients manage their medications and medical appointments effectively. The application sends reminders to ensure medication adherence and timely attendance of appointments, improving healthcare management for individuals, especially those with chronic conditions.

---

## ✨ Key Features

### 👤 User Management
- User registration and secure authentication using JWT
- Personal profile management (update info, view history)

### 💊 Medication Management
- Add, edit, and delete medications
- Set dosage, frequency, and intake times
- Daily medication reminders
- View today's medications and adherence history

### 🗓️ Appointment Management
- Book appointments with doctors by specialty, city, and date
- View upcoming and past appointments
- Receive appointment reminders via notifications
- Manage appointment status (Upcoming, Done)

### 🔔 Smart Notifications
- In-app notifications for medications and appointments
- Email reminders for upcoming events
- Multi-channel reminder system

### 📊 Dashboard & Analytics
- Personalized dashboard with today's medications and next appointments
- Adherence rate tracking
- Medication intake history

---

## 🖼️ Screenshots

| **Sign Up Page** | **Dashboard** | **Medication List** |
|------------------|---------------|---------------------|
| ![Sign Up](Screenshot%202025-09-09%20234604.png) | ![Dashboard](Screenshot%202025-09-10%20000039.png) | ![Medications](Screenshot%202025-09-10%20000321.png) |

| **Book Appointment** | **Appointments List** | **Add Medication** |
|----------------------|------------------------|--------------------|
| ![Book Appointment](Screenshot%202025-09-09%20235910.png) | ![Appointments](Screenshot%202025-09-09%20235333.png) | ![Add Medication](Screenshot%202025-09-09%20235449.png) |

| **Specialty Selection** | **Appointment Details** | **Footer** |
|-------------------------|--------------------------|------------|
| ![Specialty](Screenshot%202025-09-09%20234836.png) | ![Appointment Details](Screenshot%202025-09-09%20235131.png) | ![Footer](Screenshot%202025-09-10%20000122.png) |

---

## 🛠️ Technology Stack

### **Frontend**
- **React** – UI framework
- **Tailwind CSS** – Styling and responsive design
- **JavaScript/TypeScript** – Frontend logic

### **Backend**
- **NestJS** – Node.js framework for scalable backend
- **Prisma ORM** – Database management and migrations
- **JWT** – Authentication and authorization

### **Database**
- **PostgreSQL** / **SQLite** – Relational database

### **DevOps & Deployment**
- **Docker** – Containerization for consistent environments
- **Docker Compose** – Multi-container orchestration
- **Cron Jobs** – Scheduled reminders and notifications

---

## 📁 Project Structure

```
medreminder/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application pages (Home, Medications, Appointments, etc.)
│   │   ├── services/   # API calls and services
│   │   └── styles/     # Tailwind and custom CSS
│   └── public/
├── backend/            # NestJS application
│   ├── src/
│   │   ├── modules/    # Feature modules (users, medications, appointments)
│   │   ├── guards/     # Authentication guards
│   │   ├── services/   # Business logic
│   │   └── prisma/     # Prisma schema and migrations
│   └── docker/
├── docker-compose.yml  # Multi-container setup
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- PostgreSQL (if not using SQLite)

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medreminder.git
   cd medreminder
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma migrate dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Run with Docker (Recommended)**
   ```bash
   docker-compose up --build
   ```
   The app will be available at: `http://localhost:5173` (frontend) and `http://localhost:3000` (backend API).

5. **Run without Docker**
   ```bash
   # Backend
   cd backend && npm run start:dev
   
   # Frontend (in another terminal)
   cd frontend && npm run dev
   ```

---

## 📄 API Endpoints (Sample)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/medications` | Get user medications |
| POST | `/api/medications` | Add new medication |
| GET | `/api/appointments` | Get user appointments |
| POST | `/api/appointments` | Book new appointment |
| PUT | `/api/appointments/:id` | Update appointment |
| DELETE | `/api/medications/:id` | Delete medication |

---

## 🧪 Testing

- **Backend Tests**: Unit and integration tests using Jest
- **Frontend Tests**: Component tests with React Testing Library
- **E2E Tests**: Playwright/Cypress for user flow validation

Run tests:
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

---

## 📈 Future Enhancements

- [ ] **Mobile App** (React Native / Flutter)
- [ ] **AI-Powered Recommendations** for medication timing
- [ ] **Family Sharing** – Allow family members to monitor adherence
- [ ] **Telemedicine Integration** – Virtual consultations
- [ ] **Analytics Dashboard** for healthcare providers
- [ ] **Multi-language Support**
- [ ] **Voice-Activated Reminders** (Google Assistant/Alexa integration)

---

## 👥 Team

This project was developed as part of an academic project at **INPT (Institut National des Postes et Télécommunications)** by:
- **Abdelkarim Ezzhar ELIDRISSIMr**
- **Brahim BENIKEN**
- **Mouad CHAOUNI**

**Supervisor**: Mr. Abdessalam EN-NOUAARY

---

## 📜 License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request with detailed descriptions of your changes.

---

## 📞 Contact & Support
- **Email**: MedReminder@gmail.com
- **Phone**: +212 123-456789
- **Address**: Number, Street, City, Country

---

## 🌐 Social Media
- **Facebook**: MedReminder Facebook
- **Instagram**: MedReminder Instagram
- **Twitter/X**: MedReminder X

---

*Last Updated: September 2025*
