const REPORTS_KEY = "medicalReports";

const defaultReports = [
  {
    id: "1",
    title: "Complete Blood Count",
    type: "Blood Test",
    date: "20 August 2026",
    fileName: "cbc-report.pdf",
    fileType: "application/pdf",
    fileData: "",
    aiSummary:
      "This report has been uploaded successfully. AI analysis will be available after report processing.",
  },
  {
    id: "2",
    title: "Lipid Profile",
    type: "Blood Test",
    date: "18 August 2026",
    fileName: "lipid-profile.pdf",
    fileType: "application/pdf",
    fileData: "",
    aiSummary:
      "This report is ready for analysis. Upload processing will generate a simplified health summary.",
  },
];

export function getReports() {
  const savedReports = localStorage.getItem(REPORTS_KEY);

  if (savedReports) {
    return JSON.parse(savedReports);
  }

  localStorage.setItem(
    REPORTS_KEY,
    JSON.stringify(defaultReports)
  );

  return defaultReports;
}

export function saveReports(reports) {
  localStorage.setItem(
    REPORTS_KEY,
    JSON.stringify(reports)
  );
}

export function addReport(report) {
  const reports = getReports();

  reports.unshift(report);

  saveReports(reports);

  return report;
}

export function deleteReport(reportId) {
  const reports = getReports();

  const updatedReports = reports.filter(
    (report) => report.id !== reportId
  );

  saveReports(updatedReports);
}

export function getReportById(reportId) {
  const reports = getReports();

  return reports.find(
    (report) => report.id === reportId
  );
}