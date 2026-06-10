import { generateInterviewReport, fetchInterviewReport, fetchAllInterviewReports, generateResumePdf } from "../services/interview.api"
import { useState, useContext } from "react"
import { InterviewContext } from "../interview.context"

export const useInterview = () => {
    const context = useContext(InterviewContext)
    const { report, setReport, loading, setLoading, reports, setReports } = context
   
    if(!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const generateReport = async ({ jobDescription, resume, selfDescription }) => {
        setLoading(true)
        try {
            const data = await generateInterviewReport({ jobDescription, resume, selfDescription })
            return data.report
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getReport = async (interviewId) => {
        setLoading(true)
        try {
            const data = await fetchInterviewReport(interviewId)
            setReport(data.report)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getAllReports = async () => {
        setLoading(true)
        try {
            const data = await fetchAllInterviewReports()
            setReports(data.reports)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getResumePdf = async ({ interviewReportId }) => {
        setLoading(true)
        try {
            const response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return { report, loading, generateReport, getReport, getAllReports, reports, getResumePdf }
}