import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async (email, password) => {
        setLoading(true)
        try {
            const data = await login(email, password)
            setUser(data.user)
        } catch (error) {
            alert("Login failed. Please check your credentials.")
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true)
        try {
            const data = await register(username, email, password)
            setUser(data.user)
        } catch (error) {
            alert("Registration failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } catch (error) {
            alert("Logout failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

      useEffect(() => {
        const fetchUser = async () => {
        try {
            const userData = await getMe()
            setUser(userData.user)
        } catch (error) {
            console.error("Failed to fetch user:", error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

        fetchUser()
    }, [])

    return { user, loading, handleLogin, handleRegister, handleLogout }
}