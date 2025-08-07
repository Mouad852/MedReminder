// src/utils/BookAppointmentData.js

export const specialties = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Psychiatry",
  "Ophthalmology",
];

export const doctors = [
  {
    id: "1",
    name: "Dr. Alice Smith",
    specialty: "Cardiology",
    availableDates: {
      "2025-07-25": ["10:00", "14:00"],
      "2025-07-26": ["11:00", "15:00"],
      "2025-07-27": ["09:00", "13:00"],
    },
  },
  {
    id: "2",
    name: "Dr. Bob Johnson",
    specialty: "Cardiology",
    availableDates: {
      "2025-07-25": ["09:00", "13:00"],
      "2025-07-28": ["10:00", "16:00"],
    },
  },
  {
    id: "3",
    name: "Dr. Clara Lee",
    specialty: "Neurology",
    availableDates: {
      "2025-07-26": ["10:00", "12:00"],
      "2025-07-29": ["14:00", "16:00"],
    },
  },
  {
    id: "4",
    name: "Dr. Daniel Kim",
    specialty: "Dermatology",
    availableDates: {
      "2025-07-25": ["11:00", "15:00"],
      "2025-07-27": ["09:00", "11:00"],
    },
  },
  {
    id: "5",
    name: "Dr. Emma Watson",
    specialty: "Pediatrics",
    availableDates: {
      "2025-07-26": ["08:00", "10:00"],
      "2025-07-27": ["10:00", "14:00"],
    },
  },
  {
    id: "6",
    name: "Dr. Farid Nouri",
    specialty: "Orthopedics",
    availableDates: {
      "2025-07-28": ["09:00", "12:00"],
      "2025-07-29": ["13:00", "15:00"],
    },
  },
  {
    id: "7",
    name: "Dr. Ghita El Idrissi",
    specialty: "Psychiatry",
    availableDates: {
      "2025-07-25": ["10:00", "12:00"],
      "2025-07-26": ["14:00", "16:00"],
    },
  },
  {
    id: "8",
    name: "Dr. Hicham Benali",
    specialty: "Ophthalmology",
    availableDates: {
      "2025-07-27": ["10:00", "12:00"],
      "2025-07-29": ["15:00", "17:00"],
    },
  },
];
