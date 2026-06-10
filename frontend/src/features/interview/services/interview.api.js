import axios from "axios";

const api = axios.create({
    baseURL: "/api/interview",
    withCredentials: true, // Include cookies for authentication
});

/**
 * @desc Generate an interview preparation report based on the user's resume, self-description, and job description
 */

export const generateInterviewReport = async ({jobDescription, resume, selfDescription}) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resume);

    const response = await api.post("/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

/**
 * @desc Retrieve a specific interview preparation report
 */


export const fetchInterviewReport = async (interviewId) => {
    const response = await api.get(`/report/${interviewId}`);
    return response.data;
}

/**
 * @desc Retrieve all interview preparation reports for the authenticated user
 */

export const fetchAllInterviewReports = async () => {
    const response = await api.get("/reports");
    return response.data;
}

/**
 * @desc Generate resume pdf based on the user's profile and job description
 */

export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.get(`/resume/${interviewReportId}`, {
        responseType: "blob", // Important for handling binary data
    });
    return response.data;
}