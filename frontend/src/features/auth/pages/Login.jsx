import { useState } from "react";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

function Login() {

    const { user, loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin(email, password)
        if(user) navigate("/") // Redirect to home page after login
    }

    return (
        <main className="auth-page">
            <section className="auth-side">
                <div className="auth-side-content">
                    <span className="brand">JOBPREP AI</span>

                    <h1>
                        Prepare smarter.
                        <br />
                        Get hired faster.
                    </h1>

                    <p>
                        Your focused workspace for interview preparation,
                        applications and career growth.
                    </p>
                </div>
            </section>

            <section className="auth-panel">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Welcome back</h2>
                        <p>Sign in to continue.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
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
                                placeholder="Enter password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="auth-footer">
                        <span>Don't have an account?</span>
                        <a href="/register">Create account</a>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Login;