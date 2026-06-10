import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import "../interview.scss";

function Interview() {
    const { interviewId, id } = useParams();
    const routeId = interviewId || id;
    const navigate = useNavigate();
    const { getReport, report, loading, getResumePdf } = useInterview();

    useEffect(() => {
        if (routeId) {
            getReport(routeId);
        }
    }, [routeId]);

    const handleDownloadResume = async () => {
        if (report && report._id) {
            await getResumePdf({ interviewReportId: report._id });
        }
    };

    if (loading || !report) {
        return (
            <div className="interview-loading">
                <div className="spinner"></div>
                <p>{!report ? "Loading your report..." : "Processing tailored resume (this may take a minute)..."}</p>
            </div>
        );
    }

    return (
        <main className="interview-dashboard">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Back
            </button>

            <header className="dashboard-header">
                <div className="header-info">
                    <div className="badge">AI Analysis Complete</div>
                    <h1>{report.title}</h1>
                    <p>Generated on {new Date(report.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div className="header-actions">
                    <button className="action-btn download-btn" onClick={handleDownloadResume}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        Download Tailored Resume
                    </button>
                </div>
                </div>

                <div className="match-score">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className="circle"
                            strokeDasharray={`${report.matchScore}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                    <div className="score-content">
                        <span className="score-number">{report.matchScore}%</span>
                        <span className="score-label">Match</span>
                    </div>
                </div>
            </header>

            <div className="dashboard-grid">
                <section className="dashboard-card skill-gaps">
                    <div className="card-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        <h2>Identified Skill Gaps</h2>
                    </div>
                    <div className="gaps-list">
                        {report.skillGaps?.map((gap, idx) => (
                            <div className={`gap-item severity-${gap.severity.toLowerCase()}`} key={idx}>
                                <span className="skill-name">{gap.skill}</span>
                                <span className="severity-badge">{gap.severity}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="dashboard-card prep-plan">
                    <div className="card-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
                        <h2>Day-by-Day Preparation Plan</h2>
                    </div>
                    <div className="timeline">
                        {report.preparationPlan?.map((plan, idx) => (
                            <div className="timeline-item" key={idx}>
                                <div className="timeline-marker">Day {plan.day}</div>
                                <div className="timeline-content">
                                    <h3>{plan.focus}</h3>
                                    <ul>
                                        {plan.tasks.map((task, i) => (
                                            <li key={i}>{task}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <section className="qa-section technical-qa">
                <div className="section-title">
                    <h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                        Technical Questions
                    </h2>
                    <p>Anticipated technical challenges based on your gaps and role description.</p>
                </div>
                <div className="qa-grid">
                    {report.technicalQuestions?.map((q, idx) => (
                        <div className="qa-card" key={idx}>
                            <div className="q-number">Q{idx + 1}</div>
                            <h3>{q.question}</h3>
                            <div className="intention">
                                <strong>Intention:</strong> {q.intention}
                            </div>
                            <div className="answer">
                                <strong>Suggested Answer:</strong>
                                <p>{q.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="qa-section behavioral-qa">
                <div className="section-title">
                    <h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        Behavioral Questions
                    </h2>
                    <p>Questions to evaluate your soft skills and team fit.</p>
                </div>
                <div className="qa-grid">
                    {report.behavioralQuestions?.map((q, idx) => (
                        <div className="qa-card" key={idx}>
                            <div className="q-number">Q{idx + 1}</div>
                            <h3>{q.question}</h3>
                            <div className="intention">
                                <strong>Intention:</strong> {q.intention}
                            </div>
                            <div className="answer">
                                <strong>Suggested Answer:</strong>
                                <p>{q.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Interview;