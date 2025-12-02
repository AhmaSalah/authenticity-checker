"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface User {
    username: string
    email: string
    role: "admin" | "user"
}

interface AuthContextType {
    user: User | null
    login: (username: string, email?: string) => void
    register: (username: string, email: string, password: string) => void
    resetPassword: (email: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null)
    const router = useRouter()

    React.useEffect(() => {
        // Check local storage for persisted session
        const storedUser = localStorage.getItem("mock_user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = (username: string, email: string = "admin@example.com") => {
        const newUser: User = { username, email, role: "admin" } // Mock admin role for everyone
        setUser(newUser)
        localStorage.setItem("mock_user", JSON.stringify(newUser))
        toast.success(`Welcome back, ${username}!`)
        router.push("/admin")
    }

    const register = (username: string, email: string, password: string) => {
        // Simulate registration delay
        setTimeout(() => {
            const newUser: User = { username, email, role: "user" }
            setUser(newUser)
            localStorage.setItem("mock_user", JSON.stringify(newUser))
            toast.success("Account created successfully!")
            router.push("/profile")
        }, 1000)
    }

    const resetPassword = async (email: string) => {
        // Simulate API call
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                toast.success(`Password reset link sent to ${email}`)
                resolve()
            }, 1000)
        })
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("mock_user")
        toast.info("Logged out successfully")
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{ user, login, register, resetPassword, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
