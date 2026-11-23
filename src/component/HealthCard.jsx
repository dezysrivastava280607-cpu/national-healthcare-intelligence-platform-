import "./HealthCard.css";

function HealthCard({ title, value, icon }) {
  return (
    <div className="health-card">

      <div className="health-card-icon">
        {icon}
      </div>

      <div className="health-card-content">
        <p>{title}</p>
        <h2>{value}</h2>
      </div>

    </div>
  );
}

export default HealthCard;