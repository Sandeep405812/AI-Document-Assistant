
import { useState } from "react";

function UploadDocuments() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleUpload() {
        // Check whether a file is selected
        if (!file) {
            setError("Please select a PDF or TXT file first.");
            setMessage("");
            setPreview("");
            return;
        }

        // Allow only PDF and TXT files
        const fileName = file.name.toLowerCase();

        if (!fileName.endsWith(".pdf") && !fileName.endsWith(".txt")) {
            setError("Only PDF and TXT files are allowed.");
            setMessage("");
            setPreview("");
            return;
        }

        // Prepare file for upload
        const formData = new FormData();
        formData.append("myFile", file);

        try {
            setLoading(true);
            setError("");
            setMessage("");
            setPreview("");

            // Send the file to the Express backend
            const response = await fetch(
                "http://localhost:5000/api/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            // Read the backend response
            const data = await response.json();

            // Handle upload errors
            if (!response.ok) {
                throw new Error(
                    data.detail || data.error || "Document upload failed."
                );
            }

            // Show success message and extracted text
            setMessage(data.message || "Document uploaded successfully!");

            setPreview(
                data.text_preview || "No extracted text preview was received."
            );

            // Clear selected file after successful upload
            setFile(null);

        } catch (err) {
            console.error("Upload error:", err);
            setError(
                err.message || "Something went wrong while uploading."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <h1 className="mb-2 text-2xl font-bold text-slate-800">
                Upload Documents
            </h1>

            <p className="mb-6 text-slate-500">
                Upload your PDF or TXT document to extract its text.
            </p>

            <div className="max-w-2xl rounded-xl border border-dashed border-slate-400 bg-white p-8">

                {/* File selection */}
                <input
                    type="file"
                    accept=".pdf,.txt"
                    onChange={(e) => {
                        setFile(e.target.files?.[0] || null);
                        setMessage("");
                        setPreview("");
                        setError("");
                    }}
                    className="mb-4 block w-full text-sm text-slate-700"
                />

                {/* Selected file information */}
                {file && (
                    <p className="mb-4 break-words text-sm text-slate-600">
                        Selected file: {file.name}
                    </p>
                )}

                {/* Upload button */}
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Uploading..." : "Upload Document"}
                </button>

                {/* Error message */}
                {error && (
                    <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Success message */}
                {message && (
                    <div className="mt-6 rounded-lg bg-green-50 p-4">
                        <h2 className="mb-2 font-semibold text-green-800">
                            Upload Successful
                        </h2>

                        <p className="text-sm text-green-700">
                            {message}
                        </p>
                    </div>
                )}

                {/* Extracted text preview */}
                {preview && (
                    <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <h2 className="mb-3 font-semibold text-slate-800">
                            Extracted Text Preview
                        </h2>

                        <div className="max-h-96 overflow-y-auto whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                            {preview}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UploadDocuments;
