const OCR_API_URL = "http://localhost:8000";

export async function processReportWithOCR(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${OCR_API_URL}/ocr`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData =
      await response.json().catch(() => null);

    throw new Error(
      errorData?.detail ||
      "Report processing failed."
    );
  }

  return response.json();
}