import { useEffect, useRef, useState } from "react";
import { useInterview } from "../hooks/useInterview";
import "../interview.scss";
import { useNavigate } from "react-router";

function Home() {
    const { reports, loading, generateReport, getAllReports } = useInterview();
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [resumeFile, setResumeFile] = useState(null)
    const [isDragging, setIsDragging] = useState(false)

    const resumeRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchReports = getAllReports;
        if (fetchReports) {
            fetchReports();
        }
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setResumeFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.name.endsWith('.pdf') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
                setResumeFile(file);
            }
        }
    };

    const handleGenerateReport = async () => {
        const fileToUpload = resumeFile || resumeRef.current?.files[0];
        if (!jobDescription || !selfDescription || !fileToUpload) return;
        
        const data = await generateReport({ jobDescription, selfDescription, resume: fileToUpload })
        if (data && data._id) {
            navigate(`/interview/${data._id}`)
        }
    }

    const getScoreClass = (score) => {
        if (!score) return 'low';
        if (score >= 80) return 'high';
        if (score >= 60) return 'medium';
        return 'low';
    };

    const isFormValid = jobDescription.trim() && selfDescription.trim() && resumeFile;

    return (
        <main className="home">
            {/* Overlay Loader */}
            {loading && (
                <div className="full-page-loader">
                    <div className="loader-content">
                        <div className="spinner"></div>
                        <p>Processing request...</p>
                    </div>
                </div>
            )}

            <div className="hero">
                <div className="hero-badge">✨ AI-Powered Analysis</div>
                <h1>Generate an Interview Report</h1>
                <p>
                    Provide a role, upload your resume and describe yourself.
                </p>
            </div>

            <section className="workspace">
                <div className="job-panel">
                    <div className="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        <span className="section-label">Job Description</span>
                    </div>

                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the complete job description..."
                    />
                </div>

                <div className="bottom-section">
                    <label 
                        className={`resume-upload ${isDragging ? 'dragging' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input ref={resumeRef} onChange={handleFileChange} accept=".pdf,.docx" type="file" hidden />

                        {resumeFile ? (
                            <div className="upload-inner has-file">
                                <div className="upload-icon file-selected">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
                                </div>
                                <span className="file-name" title={resumeFile.name}>{resumeFile.name}</span>
                                <p>{(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Click to replace</p>
                            </div>
                        ) : (
                            <div className="upload-inner">
                                <div className="upload-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                </div>
                                <span>Upload Resume</span>
                                <p>PDF or DOCX up to 5MB</p>
                            </div>
                        )}
                    </label>

                    <div className="about-panel">
                        <div className="section-header">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span className="section-label">Self Description</span>
                        </div>

                        <textarea
                            value={selfDescription}
                            onChange={(e) => setSelfDescription(e.target.value)}
                            placeholder="Describe your background, strengths, projects and goals..."
                        />
                    </div>
                </div>
            </section>

            <button onClick={handleGenerateReport} className="generate-btn" disabled={!isFormValid || loading}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                Generate Report
            </button>

            {reports && reports.length > 0 && (
                <section className="recent-reports-section">
                    <h2>Recent Analyses</h2>
                    <div className="reports-grid">
                        {reports.map((r) => (
                            <div key={r._id} className="report-card" onClick={() => navigate(`/interview/${r._id}`)}>
                                <div className="card-header">
                                    <h3>{r.title || 'Software Engineer Intern'}</h3>
                                    <span className="date">
                                        {new Date(r.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <div className={`score-badge ${getScoreClass(r.matchScore)}`}>
                                        {r.matchScore || 0}%
                                    </div>
                                    <div className="score-details">
                                        <span className="score-label">Match Score</span>
                                        <span className="score-subtext">View detailed report &rarr;</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

export default Home;