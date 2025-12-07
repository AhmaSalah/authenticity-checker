"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface UserSettings {
    notifications: boolean
    dataRetention: boolean
}

interface User {
    username: string
    email: string
    role: "admin" | "user"
    bio?: string
    settings?: UserSettings
}

interface AuthContextType {
    user: User | null
    login: (username: string, email?: string) => void
    register: (username: string, email: string, password: string) => void
    resetPassword: (email: string) => Promise<void>
    logout: () => void
    updateUser: (updates: Partial<User>) => void
    isAuthenticated: boolean
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null)
    const router = useRouter()

    React.useEffect(() => {
        // Check local storage for persisted session
        if (typeof window !== "undefined") {
            try {
                const storedUser = localStorage.getItem("mock_user")
                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                }
            } catch (error) {
                console.error("Error loading user from localStorage:", error)
                localStorage.removeItem("mock_user")
            }
        }

        // Listen for storage changes to update user when profile is updated from other tabs
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "mock_user" && typeof window !== "undefined") {
                try {
                    const storedUser = localStorage.getItem("mock_user")
                    if (storedUser) {
                        setUser(JSON.parse(storedUser))
                    }
                } catch (error) {
                    console.error("Error loading user from localStorage:", error)
                }
            }
        }

        window.addEventListener("storage", handleStorageChange)
        return () => {
            window.removeEventListener("storage", handleStorageChange)
        }
    }, [])

    const login = (username: string, email: string = "admin@example.com") => {
        // Try to load existing user data to preserve settings
        let existingUser: User | null = null
        if (typeof window !== "undefined") {
            try {
                const stored = localStorage.getItem("mock_user")
                if (stored) {
                    existingUser = JSON.parse(stored)
                }
            } catch (error) {
                console.error("Error loading existing user:", error)
            }
        }

        const newUser: User = {
            username,
            email,
            role: "admin",
            bio: existingUser?.bio,
            settings: existingUser?.settings || {
                notifications: true,
                dataRetention: true,
            }
        }
        setUser(newUser)
        if (typeof window !== "undefined") {
            try {
                localStorage.setItem("mock_user", JSON.stringify(newUser))
            } catch (error) {
                console.error("Error saving user to localStorage:", error)
            }
        }
        toast.success(`Welcome back, ${username}!`)
        router.push("/admin")
    }

    const register = (username: string, email: string, password: string) => {
        // Simulate registration delay
        setTimeout(() => {
            const newUser: User = {
                username,
                email,
                role: "user",
                settings: {
                    notifications: true,
                    dataRetention: true,
                }
            }
            setUser(newUser)
            if (typeof window !== "undefined") {
                try {
                    localStorage.setItem("mock_user", JSON.stringify(newUser))
                } catch (error) {
                    console.error("Error saving user to localStorage:", error)
                }
            }
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

    const updateUser = React.useCallback((updates: Partial<User>) => {
        setUser((prevUser) => {
            if (!prevUser) return prevUser
            
            // Merge settings if they exist
            let updatedUser: User
            if (updates.settings && prevUser.settings) {
                updatedUser = {
                    ...prevUser,
                    ...updates,
                    settings: {
                        ...prevUser.settings,
                        ...updates.settings,
                    }
                }
            } else {
                updatedUser = { ...prevUser, ...updates }
            }
            
            // Persist to localStorage
            if (typeof window !== "undefined") {
                try {
                    localStorage.setItem("mock_user", JSON.stringify(updatedUser))
                } catch (error) {
                    console.error("Error saving user to localStorage:", error)
                }
            }
            
            return updatedUser
        })
    }, [])

    const logout = () => {
        setUser(null)
        if (typeof window !== "undefined") {
            try {
                localStorage.removeItem("mock_user")
            } catch (error) {
                console.error("Error removing user from localStorage:", error)
            }
        }
        toast.info("Logged out successfully")
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{ user, login, register, resetPassword, logout, updateUser, isAuthenticated: !!user }}>
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
