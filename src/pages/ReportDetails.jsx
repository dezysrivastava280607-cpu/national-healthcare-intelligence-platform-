import { useNavigate, useParams } from "react-router-dom";
import { getReportById } from "../services/reports";
import "./ReportDetails.css";

function ReportDetails() {
  const { reportId } = useParams();
  const navigate = useNavigate();

  const report = getReportById(reportId);

  if (!report) {
    return (
      <div className="report-not-found">
        <h1>Report not found</h1>

        <button onClick={() => navigate("/reports")}>Back to Reports</button>
      </div>
    );
  }

  const isPdf = report.fileType === "application/pdf";

  return (
    <div className="report-details-page">
      <button className="back-button" onClick={() => navigate("/reports")}>
        ← Back to Reports
      </button>

      <div className="report-detail-header">
        <div>
          <p className="detail-type">{report.type}</p>

          <h1>{report.title}</h1>

          <p>Uploaded on {report.date}</p>
        </div>
      </div>

      <div className="report-detail-grid">
        {/* Report Preview */}

        <div className="detail-card">
          <div className="detail-card-header">
            <div>
              <h2>Report</h2>
              <p>{report.fileName}</p>
            </div>
          </div>

          {report.fileData ? (
            isPdf ? (
              <iframe
                src={report.fileData}
                title={report.fileName}
                className="pdf-preview"
              />
            ) : (
              <img
                src={report.fileData}
                alt={report.title}
                className="image-preview"
              />
            )
          ) : (
            <div className="no-preview">
              <span>📄</span>
              <p>Preview is not available for this sample report.</p>
            </div>
          )}
        </div>

        {/* AI Summary */}

        <div className="detail-card ai-card">
          <div className="ai-header">
            <div className="ai-icon">✨</div>

            <div>
              <h2>AI Health Summary</h2>
              <p>Easy-to-understand report explanation</p>
            </div>
          </div>

          <div className="ai-summary" id="ai-summary">
            {report.aiSummary}
          </div>

          <div className="ai-note">
            <strong>Important:</strong>

            <p>
              This feature is intended to explain report information in simple
              language. It is not a medical diagnosis or a replacement for
              professional medical advice.
            </p>
          </div>

          <button
            className="analyze-button"
            onClick={() => {
              document
                .getElementById("ai-summary")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            ✨ View AI Summary
          </button>
        </div>
      </div>

{/* Extracted OCR Results */}

<div className="detail-card results-card">
  <div className="detail-card-header">
    <div>
      <h2>Extracted Results</h2>
      <p>Text extracted from your uploaded medical report.</p>
    </div>
  </div>

  <div className="results-content">
    {report.extractedText ? (
      <pre className="extracted-text">
        {report.extractedText}
      </pre>
    ) : (
      <div className="results-placeholder">
        <div>🔎</div>

        <h3>No OCR results available</h3>

        <p>
          No extracted text was found for this report.
        </p>
      </div>
    )}
  </div>
</div>

</div>
);
}

export default ReportDetails;