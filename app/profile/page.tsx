"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { HistoryList } from "@/components/HistoryList"
import { toast } from "sonner"
import { User, Settings, History, LogOut, Moon, Sun } from "lucide-react"

export default function ProfilePage() {
    const { user, logout, isAuthenticated, updateUser } = useAuth()
    const { theme, setTheme } = useTheme()
    const router = useRouter()
    const [historyItems, setHistoryItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [bio, setBio] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [notifications, setNotifications] = React.useState(true)
    const [dataRetention, setDataRetention] = React.useState(true)

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login")
            return
        }

        if (!user) return

        // Load user profile data from localStorage and sync with context
        if (typeof window !== "undefined") {
            try {
                const storedUser = localStorage.getItem("mock_user")
                if (storedUser) {
                    const userData = JSON.parse(storedUser)
                    setBio(userData.bio || "")
                    setUsername(userData.username || user.username)
                    setEmail(userData.email || user.email)
                    setNotifications(userData.settings?.notifications ?? true)
                    setDataRetention(userData.settings?.dataRetention ?? true)
                } else {
                    // Fallback to current user object
                    setBio(user.bio || "")
                    setUsername(user.username)
                    setEmail(user.email || "")
                    setNotifications(user.settings?.notifications ?? true)
                    setDataRetention(user.settings?.dataRetention ?? true)
                }
            } catch (error) {
                console.error("Error loading profile from localStorage:", error)
                // Fallback to current user object
                setBio(user.bio || "")
                setUsername(user.username)
                setEmail(user.email || "")
                setNotifications(user.settings?.notifications ?? true)
                setDataRetention(user.settings?.dataRetention ?? true)
            }

            // Load history
            try {
                const storedHistory = localStorage.getItem("history")
                if (storedHistory) {
                    setHistoryItems(JSON.parse(storedHistory))
                }
            } catch (error) {
                console.error("Error loading history from localStorage:", error)
            }
        }
    }, [isAuthenticated, router, user])

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        
        if (user) {
            try {
                // Use centralized updateUser function from AuthContext
                updateUser({
                    username: username || user.username,
                    email: email || user.email,
                    bio: bio,
                })
                
                setTimeout(() => {
                    setIsLoading(false)
                    toast.success("Profile updated successfully")
                }, 300)
            } catch (error) {
                console.error("Error saving profile:", error)
                setIsLoading(false)
                toast.error("Failed to save profile. Please try again.")
            }
        } else {
            setIsLoading(false)
            toast.error("Unable to save profile. Please try again.")
        }
    }

    const handleSettingsChange = React.useCallback((setting: "notifications" | "dataRetention", value: boolean) => {
        if (user) {
            try {
                // Update local state immediately for UI responsiveness
                if (setting === "notifications") {
                    setNotifications(value)
                } else {
                    setDataRetention(value)
                }

                // Use centralized updateUser function to persist
                updateUser({
                    settings: {
                        notifications: setting === "notifications" ? value : notifications,
                        dataRetention: setting === "dataRetention" ? value : dataRetention,
                    }
                })

                toast.success("Settings saved")
            } catch (error) {
                console.error("Error saving settings:", error)
                toast.error("Failed to save settings")
                // Revert local state on error
                if (setting === "notifications") {
                    setNotifications(!value)
                } else {
                    setDataRetention(!value)
                }
            }
        }
    }, [user, notifications, dataRetention, updateUser])

    if (!user) return null

    return (
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
                        <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">{user.username}</h1>
                        <p className="text-muted-foreground text-sm sm:text-base">{user.email || "user@example.com"}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 dark:bg-primary/90">
                                {user.role}
                            </span>
                        </div>
                    </div>
                </div>
                <Button variant="destructive" onClick={logout} className="w-full sm:w-auto">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="history">
                        <History className="mr-2 h-4 w-4" />
                        History
                    </TabsTrigger>
                    <TabsTrigger value="settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Update your personal information and email address.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input 
                                        id="username" 
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        id="email" 
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Input 
                                        id="bio" 
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Tell us about yourself"
                                    />
                                </div>
                                <Button disabled={isLoading} type="submit">
                                    {isLoading ? "Saving..." : "Save Changes"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Analysis History</CardTitle>
                            <CardDescription>
                                View and manage your past content analysis results.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <HistoryList
                                items={historyItems}
                                currentPage={1}
                                totalPages={1}
                                onPageChange={() => { }}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="settings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferences</CardTitle>
                            <CardDescription>
                                Manage your application settings and preferences.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between space-x-2">
                                <div className="flex flex-col space-y-1">
                                    <Label className="text-base">Appearance</Label>
                                    <span className="text-sm text-muted-foreground">
                                        Customize how the application looks on your device.
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 bg-secondary p-1 rounded-lg">
                                    <Button
                                        variant={theme === 'light' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setTheme('light')}
                                        className="h-8"
                                    >
                                        <Sun className="h-4 w-4 mr-2" /> Light
                                    </Button>
                                    <Button
                                        variant={theme === 'dark' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setTheme('dark')}
                                        className="h-8"
                                    >
                                        <Moon className="h-4 w-4 mr-2" /> Dark
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between space-x-2">
                                <div className="flex flex-col space-y-1">
                                    <Label className="text-base">Notifications</Label>
                                    <span className="text-sm text-muted-foreground">
                                        Receive alerts when analysis is complete.
                                    </span>
                                </div>
                                <Switch 
                                    checked={notifications}
                                    onCheckedChange={(checked) => handleSettingsChange("notifications", checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between space-x-2">
                                <div className="flex flex-col space-y-1">
                                    <Label className="text-base">Data Retention</Label>
                                    <span className="text-sm text-muted-foreground">
                                        Automatically delete history after 30 days.
                                    </span>
                                </div>
                                <Switch 
                                    checked={dataRetention}
                                    onCheckedChange={(checked) => handleSettingsChange("dataRetention", checked)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
