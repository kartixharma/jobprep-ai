const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const uploadMiddleware = require("../middlewares/file.middleware")

const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @desc Generate an interview preparation report based on the user's resume, self-description, and job description
 * @access Private
 */

interviewRouter.post('/', authMiddleware.authUser, uploadMiddleware.single('resume'), interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @desc Retrieve a specific interview preparation report
 * @access Private
 */

interviewRouter.get('/report/:interviewId', authMiddleware.authUser, interviewController.getInterviewReportController)

/**
 * @route GET /api/interview/reports
 * @desc Retrieve all interview preparation reports for the authenticated user
 * @access Private
 */

interviewRouter.get('/reports', authMiddleware.authUser, interviewController.getAllInterviewReportsController)

/**
 * @route GET /api/interview/resume/:interviewReportId
 * @desc Generate a PDF version of the user's resume based on their self-description and job description
 * @access Private
 */ 

interviewRouter.get('/resume/:interviewReportId', authMiddleware.authUser, interviewController.generateResumePdfController)

module.exports = interviewRouter