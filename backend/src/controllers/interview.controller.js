const pdfParse = require('pdf-parse')
const { generateInterviewReport, generateResumePdf } = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')


/**
 * @desc Generate an interview preparation report based on the user's resume, self-description, and job description
 */

async function generateInterviewReportController(req, res) {
    try {
        const { selfDescription, jobDescription } = req.body
        const resume = req.file
        const pdf = new pdfParse.PDFParse(
            new Uint8Array(req.file.buffer)
        );

        const result = await pdf.getText();

        const report = await generateInterviewReport({ resume: result.text, selfDescription, jobDescription })
        
        const interviewReport = await interviewReportModel.create({
            user: req.user._id,
            resume: result.text,
            selfDescription,
            jobDescription,
            ...report
        })

        res.status(200).json({
            message: "Interview report generated successfully",
            report: interviewReport
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

/**
 * @desc Retrieve a specific interview preparation report
 */

async function getInterviewReportController(req, res) {
    try {
        const { interviewId } = req.params
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user._id })

        if (!interviewReport) {
            return res.status(404).json({ error: 'Interview report not found' })
        }

        res.status(200).json({
            message: "Interview report retrieved successfully",
            report: interviewReport
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

/**
 * @desc Retrieve all interview preparation reports for the authenticated user
 */

async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user._id }).sort({ createdAt: -1 }).select('-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan') // Exclude sensitive content for listing

        res.status(200).json({
            message: "Interview reports retrieved successfully",
            reports: interviewReports
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

/**
 * @desc Generate a PDF version of the user's resume based on their self-description and job description
 */

async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params
        const interviewReport = await interviewReportModel.findOne({ _id: interviewReportId, user: req.user._id })

        if (!interviewReport) {
            return res.status(404).json({ error: 'Interview report not found' })
        }
        const { resume, selfDescription, jobDescription } = interviewReport

        const pdf = await generateResumePdf({ resume: resume, selfDescription, jobDescription })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        })
        res.send(Buffer.from(pdf))
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = {
    generateInterviewReportController,
    getInterviewReportController,
    getAllInterviewReportsController,
    generateResumePdfController
}