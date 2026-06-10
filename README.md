<div align="center">
  
# 🎯 JobPrep AI

> An intelligent, full-stack AI application that analyzes your resume against target job descriptions to generate personalized, highly-actionable interview preparation reports.

</div>

<img height="300" alt="image" src="https://github.com/user-attachments/assets/da0cc702-257f-4484-be67-9ec4cdc68aba" />
<img height="300" alt="image" src="https://github.com/user-attachments/assets/3659ac77-2299-4c26-9784-a755e3e41619" />

<br />

## ✨ Key Features

- **🧠 AI-Powered Analysis**: Utilizes **Google Gemini / Vertex AI** to deeply understand the context between a candidate's background and a job's requirements.
- **📊 Smart Match Scoring**: Calculates a dynamic "Match Score" giving candidates immediate feedback on their current fit for the role.
- **🔍 Skill Gap Identification**: Automatically highlights missing or weak skills and categorizes them by severity (High, Medium, Low).
- **📅 Day-by-Day Prep Plan**: Generates a structured, multi-day preparation timeline focused heavily on bridging identified knowledge gaps.
- **🗣️ Anticipated Q&A**: Predicts customized Technical and Behavioral interview questions, complete with underlying interviewer intentions and suggested answers.
- **📄 Tailored Resume Generation**: Dynamically crafts and allows downloading of a PDF resume perfectly tailored for the specific job description.
- **✨ Premium UI/UX**: Built with a stunning, glassmorphism-inspired interface featuring drag-and-drop file uploads, smooth micro-interactions, and visual data representation (like SVG progress rings).

<br/>

## 💻 Tech Stack

### Frontend
- **React & Vite**: Extremely fast development environment and optimized production builds.
- **React Router DOM**: Client-side routing for seamless dashboard navigation.
- **SCSS**: Custom, modular styling leveraging CSS Grid, Flexbox, and complex gradients/glassmorphism without relying on heavy UI libraries.
- **Custom Hooks**: Abstracted API logic (`useInterview`) using React Context for clean component architecture.

### Backend
- **Node.js & Express**: Fast and scalable RESTful API architecture.
- **MongoDB & Mongoose**: Flexible NoSQL database schema for storing users, historical reports, and parsed resume data.
- **Google Gen AI SDK**: Direct integration with Google's large language models for complex text extraction and reasoning.
- **Multer**: Robust handling of `.pdf` and `.docx` multipart/form-data file uploads.

<br/>

## 🏗️ Architecture & Code Quality

As a developer, I focused heavily on writing **clean, maintainable, and scalable** code:

1. **Separation of Concerns**: The frontend is divided into modular `features/` (e.g., `features/interview`) containing their own pages, custom hooks, services, and context providers.
2. **State Management**: Avoiding prop-drilling by utilizing the React Context API natively where it makes sense.
3. **Error Handling & Resilience**: The backend handles API timeouts, invalid file types, and AI-generation failures gracefully, propagating meaningful errors to the frontend UI.
4. **UI/UX Polish**: Implemented advanced CSS techniques including `:focus-within` styling, custom SVG assets, animated loaders, and fully responsive layouts that adapt perfectly to mobile devices.

<br/>

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (Local or Atlas)
- Google Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/jobprep-ai.git
cd jobprep-ai
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

<br/>

## 📸 Screenshots

*(Add screenshots of your gorgeous UI here)*

- **Home Dashboard**: Drag-and-drop resume upload and job description inputs.
- **Loading State**: The blurred glassmorphism overlay while AI processes the request.
- **Report View**: The highly-styled grid layout showcasing the Match Score ring, Skill Gaps, and Q&A Cards.

<br/>

## 👨‍💻 Author

**Kartik Sharma**
- LinkedIn
- GitHub
- Portfolio

*If you are a recruiter reviewing this, I would love to connect and discuss how my skills can bring value to your team!*
