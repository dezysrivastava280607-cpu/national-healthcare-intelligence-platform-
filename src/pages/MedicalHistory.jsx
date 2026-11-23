import { useEffect, useState } from "react";
import { getMedicalHistory } from "../services/medicalHistory";
import "./MedicalHistory.css";

function MedicalHistory() {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setHistory(getMedicalHistory());
  }, []);

  const filteredHistory =
    filter === "All" ? history : history.filter((item) => item.type === filter);

  return (
    <div className="history-page">
      <div className="history-header">
        <div>
          <h1>Medical History</h1>
          <p>View your healthcare journey in one place.</p>
        </div>
      </div>

      <div className="history-filters">
        {["All", "Report", "Doctor Visit", "Prescription"].map((item) => (
          <button
            key={item}
            className={
              filter === item ? "filter-button active" : "filter-button"
            }
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="history-card">
        {filteredHistory.length === 0 ? (
          <div className="history-empty">
            <div>📋</div>
            <h3>No records found</h3>
            <p>There are no records in this category.</p>
          </div>
        ) : (
          <div className="timeline">
            {filteredHistory.map((item) => (
              <div className="timeline-item" key={item.id}>
                <div className="timeline-dot">
                  {item.type === "Report"
                    ? "📄"
                    : item.type === "Doctor Visit"
                      ? "👨‍⚕️"
                      : "💊"}
                </div>

                <div className="timeline-content">
                  <div className="timeline-top">
                    <div>
                      <span className="history-type">{item.type}</span>

                      <h2>{item.title}</h2>
                    </div>

                    <span className="history-date">{item.date}</span>
                  </div>

                  <p>{item.description}</p>

                  <small>{item.doctor}</small>

                  <button
                    className="history-view"
                    onClick={() =>
                      alert(
                        `${item.title}\n\n${item.description}\n\n${item.doctor}\n${item.date}`,
                      )
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalHistory;
