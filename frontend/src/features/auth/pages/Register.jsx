import { useState } from "react";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

function Register() {

  const { loading, handleRegister } = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    await handleRegister(username, email, password)
    if(user) navigate("/") // Redirect to home page after registration
  }

  return (
    <main className="auth-page">
      <section className="auth-side">
        <div className="auth-side-content">
          <span className="brand">JOBPREP AI</span>

          <h1>
            Start your
            <br />
            preparation journey.
          </h1>

          <p>
            Organize your interview preparation,
            track progress and stay focused on what matters.
          </p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create account</h2>
            <p>Get started in a few seconds.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="John Doe"
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@example.com"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Create password"
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm password"
              />
            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            <span>Already have an account?</span>
            <a href="/login">Sign in</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;