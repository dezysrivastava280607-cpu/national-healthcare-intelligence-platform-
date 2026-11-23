import { useEffect, useState } from "react";
import {
  getAppointments,
  addAppointment,
  cancelAppointment,
} from "../services/appointments";
import "./Appointments.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const [showBookingForm, setShowBookingForm] = useState(false);

  const [doctor, setDoctor] = useState("Dr. Raj Sharma");

  const [date, setDate] = useState("");

  const [time, setTime] = useState("10:00 AM");

  const [reason, setReason] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const handleBookAppointment = (e) => {
    e.preventDefault();

    if (!date) {
      setMessage("Please select an appointment date.");
      return;
    }

    const selectedDoctor =
      doctor === "Dr. Raj Sharma"
        ? {
            name: "Dr. Raj Sharma",
            specialization: "General Physician",
            hospital: "City Hospital",
          }
        : doctor === "Dr. Priya Mehta"
          ? {
              name: "Dr. Priya Mehta",
              specialization: "Cardiologist",
              hospital: "Apollo Care",
            }
          : {
              name: "Dr. Arjun Verma",
              specialization: "Dermatologist",
              hospital: "MediLife Hospital",
            };

    const newAppointment = {
      id: Date.now().toString(),
      doctor: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      hospital: selectedDoctor.hospital,
      date: new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      time,
      reason: reason.trim() || "General Consultation",
      status: "Upcoming",
    };

    addAppointment(newAppointment);

    setAppointments(getAppointments());

    setDate("");
    setTime("10:00 AM");
    setReason("");
    setDoctor("Dr. Raj Sharma");

    setShowBookingForm(false);

    setMessage("Appointment booked successfully!");
  };

  const handleCancel = (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?",
    );

    if (!confirmCancel) {
      return;
    }

    cancelAppointment(id);

    setAppointments(getAppointments());

    setMessage("Appointment cancelled.");
  };

  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.status === "Upcoming",
  );

  const pastAppointments = appointments.filter(
    (appointment) => appointment.status !== "Upcoming",
  );

  return (
    <div className="appointments-page">
      {/* Header */}

      <div className="appointments-header">
        <div>
          <h1>Appointments</h1>

          <p>Manage your doctor visits and appointments.</p>
        </div>

        <button
          className="book-main-button"
          onClick={() => {
            setShowBookingForm(!showBookingForm);
            setMessage("");
          }}
        >
          + Book Appointment
        </button>
      </div>

      {/* Message */}

      {message && <div className="appointment-message">{message}</div>}

      {/* Booking Form */}

      {showBookingForm && (
        <div className="booking-card">
          <div className="booking-header">
            <h2>Book an Appointment</h2>

            <p>Choose a doctor and schedule your visit.</p>
          </div>

          <form onSubmit={handleBookAppointment}>
            <div className="booking-form-grid">
              <div className="form-group">
                <label>Choose Doctor</label>

                <select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                >
                  <option>Dr. Raj Sharma</option>

                  <option>Dr. Priya Mehta</option>

                  <option>Dr. Arjun Verma</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date</label>

                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Time</label>

                <select value={time} onChange={(e) => setTime(e.target.value)}>
                  <option>09:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>02:00 PM</option>
                  <option>03:00 PM</option>
                  <option>04:00 PM</option>
                  <option>05:00 PM</option>
                </select>
              </div>

              <div className="form-group full-form-group">
                <label>Reason for Visit</label>

                <textarea
                  placeholder="Enter the reason for your visit"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows="4"
                />
              </div>
            </div>

            <div className="booking-actions">
              <button
                type="button"
                className="cancel-form-button"
                onClick={() => {
                  setShowBookingForm(false);
                  setMessage("");
                }}
              >
                Cancel
              </button>

              <button type="submit" className="confirm-book-button">
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Upcoming */}

      <section className="appointment-section">
        <div className="section-heading">
          <div>
            <h2>Upcoming Appointments</h2>

            <p>Your scheduled doctor visits</p>
          </div>

          <span className="count-badge">{upcomingAppointments.length}</span>
        </div>

        {upcomingAppointments.length === 0 ? (
          <div className="empty-state">
            <div>📅</div>

            <h3>No upcoming appointments</h3>

            <p>Book an appointment to see it here.</p>
          </div>
        ) : (
          <div className="appointment-list">
            {upcomingAppointments.map((appointment) => (
              <div className="appointment-item" key={appointment.id}>
                <div className="doctor-avatar-large">👨‍⚕️</div>

                <div className="appointment-doctor">
                  <h3>{appointment.doctor}</h3>

                  <p>{appointment.specialization}</p>

                  <p>📍 {appointment.hospital}</p>
                </div>

                <div className="appointment-date">
                  <div>📅</div>

                  <div>
                    <small>Date</small>

                    <strong>{appointment.date}</strong>
                  </div>
                </div>

                <div className="appointment-date">
                  <div>🕙</div>

                  <div>
                    <small>Time</small>

                    <strong>{appointment.time}</strong>
                  </div>
                </div>

                <div className="appointment-actions">
                  <button
                    className="view-appointment"
                    onClick={() =>
                      alert(
                        `Doctor: ${appointment.doctor}\nDate: ${appointment.date}\nTime: ${appointment.time}\nReason: ${appointment.reason}`,
                      )
                    }
                  >
                    View
                  </button>

                  <button
                    className="cancel-appointment"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Past */}

      <section className="appointment-section">
        <div className="section-heading">
          <div>
            <h2>Past & Cancelled</h2>

            <p>Previous appointment activity</p>
          </div>
        </div>

        {pastAppointments.length === 0 ? (
          <div className="small-empty-state">
            No past or cancelled appointments.
          </div>
        ) : (
          <div className="past-list">
            {pastAppointments.map((appointment) => (
              <div className="past-item" key={appointment.id}>
                <div>
                  <strong>{appointment.doctor}</strong>

                  <p>
                    {appointment.specialization}
                    {" • "}
                    {appointment.date}
                  </p>
                </div>

                <span
                  className={
                    appointment.status === "Cancelled"
                      ? "status-cancelled"
                      : "status-completed"
                  }
                >
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Appointments;
