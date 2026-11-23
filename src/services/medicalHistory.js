const HISTORY_KEY = "medicalHistory";

const defaultHistory = [
  {
    id: "1",
    date: "20 August 2026",
    type: "Report",
    title: "Complete Blood Count",
    doctor: "Lab Report",
    description: "CBC blood test report uploaded.",
  },
  {
    id: "2",
    date: "15 August 2026",
    type: "Doctor Visit",
    title: "General Health Consultation",
    doctor: "Dr. Raj Sharma",
    description: "Routine health consultation.",
  },
  {
    id: "3",
    date: "02 August 2026",
    type: "Prescription",
    title: "Prescription Added",
    doctor: "Dr. Raj Sharma",
    description: "Prescription recorded in medical history.",
  },
];

export function getMedicalHistory() {
  const saved = localStorage.getItem(HISTORY_KEY);

  if (saved) {
    return JSON.parse(saved);
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(defaultHistory));

  return defaultHistory;
}

export function saveMedicalHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
