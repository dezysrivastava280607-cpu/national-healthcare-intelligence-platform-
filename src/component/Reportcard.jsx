import "./ReportCard.css";

function ReportCard({ title, date, status }) {
  return (
    <div className="report-card">

      <div className="report-icon">
        📄
      </div>

      <div className="report-info">
        <h3>{title}</h3>
        <p>{date}</p>
      </div>

      <div className="report-right">

        <span className="report-status">
          {status}
        </span>

        <button
          onClick={() => window.location.href = "/reports"}
        >
          View
        </button>

      </div>

    </div>
  );
}

export default ReportCard;