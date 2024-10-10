'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, BookOpen, Settings, AlertCircle, BarChart2, Users, Database } from 'lucide-react'
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AdminDashboard() {
  // Mock data (unchanged)
  const userRoles = ['Student', 'Lecturer', 'Admin']
  const departments = ['Computer Science', 'Engineering', 'Business', 'Arts', 'Sciences']
  const reportTypes = ['User Activity', 'Course Enrollment', 'System Performance', 'Financial Summary']

  const admin = {
    name: "Sarah Thompson",
    id: "ADM001",
    role: "System Administrator"
  }

  const systemStats = {
    totalUsers: 1250,
    activeStudents: 1000,
    activeLecturers: 50,
    totalCourses: 75
  }

  const recentActivities = [
    { id: 1, action: "New user registered", user: "John Doe", time: "2 hours ago" },
    { id: 2, action: "Course added", course: "Advanced Machine Learning", time: "5 hours ago" },
    { id: 3, action: "System backup completed", time: "1 day ago" },
    { id: 4, action: "User role updated", user: "Jane Smith", time: "2 days ago" },
  ]

  const userGrowthData = [
    { month: 'Jan', students: 800, lecturers: 40 },
    { month: 'Feb', students: 850, lecturers: 42 },
    { month: 'Mar', students: 900, lecturers: 45 },
    { month: 'Apr', students: 950, lecturers: 48 },
    { month: 'May', students: 1000, lecturers: 50 },
  ]

  const courseDistributionData = [
    { department: 'Computer Science', courses: 20 },
    { department: 'Engineering', courses: 15 },
    { department: 'Business', courses: 12 },
    { department: 'Arts', courses: 8 },
    { department: 'Sciences', courses: 10 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <header className="flex flex-col items-center mb-8">
        <Avatar className="h-20 w-20 mb-4 ring-4 ring-blue-500">
          <AvatarImage src="/placeholder.svg?height=80&width=80" alt={admin.name} />
          <AvatarFallback className="bg-blue-600 text-white text-2xl">{admin.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold text-center text-blue-300">Welcome, {admin.name}</h1>
        <p className="text-center text-gray-400">Admin ID: {admin.id} | Role: {admin.role}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Users", icon: Users, value: systemStats.totalUsers, subtext: `${systemStats.activeStudents} students, ${systemStats.activeLecturers} lecturers` },
          { title: "Total Courses", icon: BookOpen, value: systemStats.totalCourses, subtext: "Across all departments" },
          { title: "System Status", icon: AlertCircle, value: "Operational", subtext: "All systems running smoothly" },
          { title: "Last Backup", icon: Database, value: "2 hours ago", subtext: "Next backup in 22 hours" },
        ].map((stat, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-300">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <Card className="col-span-4 bg-gray-800 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-blue-300">User Growth</CardTitle>
            <CardDescription className="text-gray-400">Monthly increase in students and lecturers</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                students: {
                  label: "Students",
                  color: "hsl(210, 100%, 60%)",
                },
                lecturers: {
                  label: "Lecturers",
                  color: "hsl(150, 100%, 60%)",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                  <XAxis dataKey="month" stroke="#a0aec0" />
                  <YAxis yAxisId="left" stroke="#a0aec0" />
                  <YAxis yAxisId="right" orientation="right" stroke="#a0aec0" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="students" stroke="var(--color-students)" strokeWidth={2} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="lecturers" stroke="var(--color-lecturers)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-gray-800 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-blue-300">Course Distribution</CardTitle>
            <CardDescription className="text-gray-400">Courses per department</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                courses: {
                  label: "Courses",
                  color: "hsl(280, 100%, 60%)",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                  <XAxis dataKey="department" stroke="#a0aec0" />
                  <YAxis stroke="#a0aec0" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="courses" fill="var(--color-courses)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 bg-gray-800 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-blue-300">Recent Activities</CardTitle>
          <CardDescription className="text-gray-400">Latest system events and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <ul className="space-y-4">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <div>
                    <p className="font-medium text-blue-300">{activity.action}</p>
                    {activity.user && <p className="text-sm text-gray-400">User: {activity.user}</p>}
                    {activity.course && <p className="text-sm text-gray-400">Course: {activity.course}</p>}
                  </div>
                  <Badge variant="outline" className="bg-blue-900 text-blue-300 border-blue-500">{activity.time}</Badge>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}