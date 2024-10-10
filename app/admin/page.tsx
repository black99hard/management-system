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
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid,  Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AdminDashboard() {  // Mock data


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
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {admin.name}</h1>
          <p className="text-muted-foreground">Admin ID: {admin.id} | Role: {admin.role}</p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder.svg?height=48&width=48" alt={admin.name} />
          <AvatarFallback>{admin.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {systemStats.activeStudents} students, {systemStats.activeLecturers} lecturers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Operational</div>
            <p className="text-xs text-muted-foreground">All systems running smoothly</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 hours ago</div>
            <p className="text-xs text-muted-foreground">Next backup in 22 hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly increase in students and lecturers</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                students: {
                  label: "Students",
                  color: "hsl(var(--chart-1))",
                },
                lecturers: {
                  label: "Lecturers",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="students" stroke="var(--color-students)" name="Students" />
                  <Line yAxisId="right" type="monotone" dataKey="lecturers" stroke="var(--color-lecturers)" name="Lecturers" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Course Distribution</CardTitle>
            <CardDescription>Courses per department</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                courses: {
                  label: "Courses",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="courses" fill="var(--color-courses)" name="Courses" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system events and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <ul className="space-y-4">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      {activity.user && <p className="text-sm text-muted-foreground">User: {activity.user}</p>}
                      {activity.course && <p className="text-sm text-muted-foreground">Course: {activity.course}</p>}
                    </div>
                    <Badge variant="outline">{activity.time}</Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" /> Add New User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Enter the details of the new user here.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <Input id="email" type="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">Role</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {userRoles.map((role) => (
                          <SelectItem key={role} value={role.toLowerCase()}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit">Add User</Button>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" /> Manage Courses
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Manage Courses</DialogTitle>
                  <DialogDescription>View and manage course information.</DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Students</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>CS101</TableCell>
                      <TableCell>Introduction to Programming</TableCell>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>150</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>BUS201</TableCell>
                      <TableCell>Business Ethics</TableCell>
                      <TableCell>Business</TableCell>
                      <TableCell>120</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ENG301</TableCell>
                      <TableCell>Advanced Circuit Design</TableCell>
                      <TableCell>Engineering</TableCell>
                      <TableCell>80</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button className="mt-4">Add New Course</Button>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <BarChart2 className="mr-2 h-4 w-4" /> Generate Reports
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Generate Reports</DialogTitle>
                  <DialogDescription>Select the type of report you want to generate.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="report-type" className="text-right">Report Type</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a report type" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="start-date" className="text-right">Start Date</Label>
                    <Input id="start-date" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="end-date" className="text-right">End Date</Label>
                    <Input id="end-date" type="date" className="col-span-3" />
                  </div>
                </div>
                <Button type="submit">Generate Report</Button>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Settings className="mr-2 h-4 w-4" /> System Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>System Settings</DialogTitle>
                  <DialogDescription>Adjust system-wide settings.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="maintenance-mode" />
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="backup-frequency" className="text-right">Backup Frequency</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="session-timeout" className="text-right">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" className="col-span-3" defaultValue={30} />
                  </div>
                </div>
                <Button type="submit">Save Settings</Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>


      </div>
    </div>
  )
}


