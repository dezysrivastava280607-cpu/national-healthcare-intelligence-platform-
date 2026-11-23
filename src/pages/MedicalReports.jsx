import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getReports,
  addReport,
  deleteReport,
} from "../services/reports";

import { processReportWithOCR } from "../services/ocr";

import "./MedicalReports.css";


function MedicalReports() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [reportType, setReportType] = useState("Blood Test");
  const [reportTitle, setReportTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);


  useEffect(() => {
    setReports(getReports());
  }, []);


  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage("Please upload a PDF, JPG or PNG file.");
      setSelectedFile(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("For this demo, please choose a file below 2 MB.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setMessage("");
  };


  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("Could not read the selected file."));
      };

      reader.readAsDataURL(file);
    });
  };


  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please choose a report first.");
      return;
    }

    setIsUploading(true);
    setMessage("Uploading report and generating AI summary...");

    try {
      // 1. Send report to FastAPI OCR + AI
      const aiResult = await processReportWithOCR(selectedFile);

      // 2. Convert file to Data URL for demo/localStorage
      const fileData = await readFileAsDataURL(selectedFile);

      // 3. Create report object
      const newReport = {
        id: Date.now().toString(),

        title:
          reportTitle.trim() ||
          selectedFile.name.replace(/\.[^/.]+$/, ""),

        type: reportType,

        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),

        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileData: fileData,

        extractedText: aiResult.extracted_text || "",

        aiSummary:
          aiResult.ai_summary ||
          "AI summary could not be generated.",

        status: aiResult.status || "success",
      };

      // 4. Save report
      addReport(newReport);

      setReports(getReports());

      // 5. Reset upload form
      setSelectedFile(null);
      setReportTitle("");
      setReportType("Blood Test");
      setShowUpload(false);

      setMessage(
        "Report uploaded and AI analysis completed successfully!"
      );

    } catch (error) {
      console.error("Report processing error:", error);

      setMessage(
        error.message ||
        "Unable to process the report. Please make sure the OCR server is running."
      );
    } finally {
      setIsUploading(false);
    }
  };


  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmed) {
      return;
    }

    deleteReport(id);

    setReports(getReports());

    setMessage("Report deleted successfully.");
  };


  return (
    <div className="reports-page">

      <div className="reports-header">
        <div>
          <h1>Medical Reports</h1>

          <p>
            Store, view and manage your medical reports.
          </p>
        </div>

        <button
          className="upload-main-button"
          onClick={() => {
            setShowUpload(!showUpload);
            setMessage("");
          }}
        >
          + Upload Report
        </button>
      </div>


      {message && (
        <div className="report-message">
          {message}
        </div>
      )}


      {showUpload && (
        <div className="upload-card">

          <div className="upload-card-header">
            <div>
              <h2>Upload Medical Report</h2>

              <p>
                Upload a PDF or image of your medical report.
              </p>
            </div>
          </div>


          <div className="upload-form">

            <div className="input-group">

              <label>
                Report Title
              </label>

              <input
                type="text"
                placeholder="e.g. Complete Blood Count"
                value={reportTitle}
                onChange={(e) =>
                  setReportTitle(e.target.value)
                }
              />

            </div>


            <div className="input-group">

              <label>
                Report Type
              </label>

              <select
                value={reportType}
                onChange={(e) =>
                  setReportType(e.target.value)
                }
              >
                <option>Blood Test</option>
                <option>X-Ray</option>
                <option>MRI</option>
                <option>CT Scan</option>
                <option>Ultrasound</option>
                <option>Urine Test</option>
                <option>Prescription</option>
                <option>Other</option>
              </select>

            </div>


            <label className="file-drop-area">

              <span className="upload-icon">
                📄
              </span>

              <strong>
                {selectedFile
                  ? selectedFile.name
                  : "Choose your medical report"}
              </strong>

              <small>
                PDF, JPG or PNG • Maximum 2 MB for demo
              </small>

              <span className="choose-file-text">
                Choose File
              </span>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                hidden
              />

            </label>


            <div className="upload-actions">

              <button
                className="cancel-button"
                disabled={isUploading}
                onClick={() => {
                  setShowUpload(false);
                  setSelectedFile(null);
                  setMessage("");
                }}
              >
                Cancel
              </button>


              <button
                className="upload-button"
                disabled={isUploading}
                onClick={handleUpload}
              >
                {isUploading
                  ? "Analyzing..."
                  : "Upload & Analyze"}
              </button>

            </div>

          </div>

        </div>
      )}


      <div className="reports-card">

        <div className="reports-card-header">

          <div>
            <h2>My Reports</h2>

            <p>
              {reports.length} reports available
            </p>
          </div>

        </div>


        {reports.length === 0 ? (

          <div className="empty-reports">

            <div>📄</div>

            <h3>
              No medical reports yet
            </h3>

            <p>
              Upload your first report to get started.
            </p>

          </div>

        ) : (

          <div className="report-list">

            {reports.map((report) => (

              <div
                className="report-row"
                key={report.id}
              >

                <div className="report-file-icon">
                  📄
                </div>


                <div className="report-details">

                  <h3>
                    {report.title}
                  </h3>

                  <p>
                    {report.type} • {report.date}
                  </p>

                  <small>
                    {report.fileName}
                  </small>

                </div>


                <div className="report-actions">

                  <button
                    className="view-button"
                    onClick={() =>
                      navigate(`/reports/${report.id}`)
                    }
                  >
                    View
                  </button>


                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDelete(report.id)
                    }
                  >
                    Delete
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


export default MedicalReports;