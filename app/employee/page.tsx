'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Calendar, Clock, FileText, HelpCircle, Library, Mail, MessageSquare, PieChart, Settings, Ticket, Tool, Users } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar
} from 'recharts'

// Mock data
const taskData = [
  { id: 1, title: "Resolve IT Ticket #1234", priority: "High", status: "In Progress" },
  { id: 2, title: "Update Library Catalog", priority: "Medium", status: "Pending" },
  { id: 3, title: "Process Student Enrollment Forms", priority: "Low", status: "Completed" },
  { id: 4, title: "Maintain Campus Network", priority: "High", status: "In Progress" },
  { id: 5, title: "Organize Staff Training Session", priority: "Medium", status: "Scheduled" },
]

const ticketData = [
  { id: 1, issue: "Printer not working", department: "Finance", status: "Open" },
  { id: 2, issue: "Email access problem", department: "HR", status: "In Progress" },
  { id: 3, issue: "Software installation request", department: "IT", status: "Closed" },
  { id: 4, issue: "Network connectivity issue", department: "Marketing", status: "Open" },
  { id: 5, issue: "Account password reset", department: "Student Affairs", status: "Closed" },
]

const performanceData = [
  { month: "Jan", ticketsResolved: 45, tasksCompleted: 30 },
  { month: "Feb", ticketsResolved: 52, tasksCompleted: 35 },
  { month: "Mar", ticketsResolved: 49, tasksCompleted: 32 },
  { month: "Apr", ticketsResolved: 60, tasksCompleted: 40 },
  { month: "May", ticketsResolved: 55, tasksCompleted: 38 },
  { month: "Jun", ticketsResolved: 58, tasksCompleted: 42 },
]

export default function EmployeeSupportStaffDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader className="bg-blue-500 text-white">
          <CardTitle className="text-2xl font-bold">Employee/Support Staff Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks & Tickets</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">25</div>
                    <p className="text-xs text-muted-foreground">+10% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">-5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2.5 hours</div>
                    <p className="text-xs text-muted-foreground">-30 min from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92%</div>
                    <p className="text-xs text-muted-foreground">+2% from last month</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="ticketsResolved" stroke="#8884d8" name="Tickets Resolved" />
                      <Line yAxisId="right" type="monotone" dataKey="tasksCompleted" stroke="#82ca9d" name="Tasks Completed" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tasks" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {taskData.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.priority}</TableCell>
                            <TableCell>{task.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>IT Support Tickets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Issue</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ticketData.map((ticket) => (
                          <TableRow key={ticket.id}>
                            <TableCell>{ticket.issue}</TableCell>
                            <TableCell>{ticket.department}</TableCell>
                            <TableCell>{ticket.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>IT Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Button variant="link" className="p-0">
                          <Tool className="mr-2 h-4 w-4" />
                          Software Installation Guide
                        </Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0">
                          <HelpCircle className="mr-2 h-4 w-4" />
                          Troubleshooting FAQs
                        </Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0">
                          <Settings className="mr-2 h-4 w-4" />
                          Network Configuration
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Library Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Button variant="link" className="p-0">
                          <Library className="mr-2 h-4 w-4" />
                          Catalog Management System
                        </Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0">
                          <Users className="mr-2 h-4 w-4" />
                          Patron Database
                        </Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0">
                          <Calendar className="mr-2 h-4 w-4" />
                          Event Scheduling
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Administrative Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Button variant="link" className="p-0">
                          <FileText className="mr-2 h-4 w-4" />
                          Forms and Templates
                        </Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0">
                          <BarChart className="mr-2 h-4 w-4" />
                          Reporting Tools
                        </Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0">
                          <PieChart className="mr-2 h-4 w-4" />
                          Budget Management
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="communication" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="/avatars/01.png" alt="Avatar" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">Re: IT Support Ticket #1234</p>
                        </div>
                      </li>
                      <li className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="/avatars/02.png" alt="Avatar" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Jane Smith</p>
                          <p className="text-sm text-muted-foreground">Library Event Coordination</p>
                        </div>
                      </li>
                      <li className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="/avatars/03.png" alt="Avatar" />
                          <AvatarFallback>RJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Robert Johnson</p>
                          <p className="text-sm text-muted-foreground">Administrative Task Update</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        Compose Email
                      </Button>
                      <Button className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Start Chat
                      </Button>
                      <Button className="w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Meeting
                      </Button>
                    
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}