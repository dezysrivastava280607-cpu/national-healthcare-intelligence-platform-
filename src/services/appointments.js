const APPOINTMENTS_KEY = "appointments";

const defaultAppointments = [
  {
    id: "1",
    doctor: "Dr. Raj Sharma",
    specialization: "General Physician",
    hospital: "City Hospital",
    date: "25 August 2026",
    time: "10:00 AM",
    reason: "General Health Checkup",
    status: "Upcoming",
  },
];

export function getAppointments() {
  const savedAppointments = localStorage.getItem(APPOINTMENTS_KEY);

  if (savedAppointments) {
    return JSON.parse(savedAppointments);
  }

  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(defaultAppointments));

  return defaultAppointments;
}

export function saveAppointments(appointments) {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}

export function addAppointment(appointment) {
  const appointments = getAppointments();

  appointments.unshift(appointment);

  saveAppointments(appointments);

  return appointment;
}

export function cancelAppointment(id) {
  const appointments = getAppointments();

  const updatedAppointments = appointments.map((appointment) =>
    appointment.id === id
      ? {
          ...appointment,
          status: "Cancelled",
        }
      : appointment,
  );

  saveAppointments(updatedAppointments);
}

export function deleteAppointment(id) {
  const appointments = getAppointments();

  const updatedAppointments = appointments.filter(
    (appointment) => appointment.id !== id,
  );

  saveAppointments(updatedAppointments);
}
