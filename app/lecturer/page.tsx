"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Calendar as CalendarIcon, FileText, Users, PlusCircle, Clock, Bell } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { toast } from "@/hooks/use-toast"

export default function LecturerDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedCourse, setSelectedCourse] = useState('CS301')

  // Mock data (unchanged)
  const lecturer = {
    name: "Dr. Emily Parker",
    id: "LEC001",
    department: "Computer Science"
  }

  const upcomingClasses = [
    { id: 1, title: "Artificial Intelligence", time: "1:00 PM - 2:30 PM", room: "CS-401" },
    { id: 2, title: "Algorithms", time: "2:00 PM - 3:30 PM", room: "CS-201" },
    { id: 3, title: "Cloud Computing", time: "9:00 AM - 10:30 AM", room: "CS-301" },
    { id: 4, title: "Machine Learning", time: "8:00 AM - 9:30 AM", room: "CS-301" },
    { id: 5, title: "Algorithms", time: "4:00 PM - 5:30 PM", room: "CS-401" },
    { id: 6, title: "Software Engineering", time: "9:00 AM - 10:30 AM", room: "CS-301" },
    { id: 7, title: "Cybersecurity", time: "1:00 PM - 2:30 PM", room: "CS-202" },
    { id: 8, title: "Computer Networks", time: "1:00 PM - 2:30 PM", room: "CS-201" },
    { id: 9, title: "Computer Networks", time: "11:00 AM - 12:30 PM", room: "CS-101" },
    { id: 10, title: "Algorithms", time: "2:00 PM - 3:30 PM", room: "CS-102" },
    { id: 11, title: "Cloud Computing", time: "3:00 PM - 4:30 PM", room: "CS-201" },
  ]

  const coursesTaught = [
    { id: "CS101", name: "Introduction to Programming", students: 50 },
    { id: "CS102", name: "Data Structures", students: 40 },
    { id: "CS103", name: "Web Development", students: 60 },
    { id: "CS201", name: "Computer Networks", students: 55 },
    { id: "CS202", name: "Operating Systems", students: 48 },
    { id: "CS205", name: "Software Engineering", students: 42 },
    { id: "CS301", name: "Database Systems", students: 45 },
    { id: "CS302", name: "Mobile App Development", students: 38 },
    { id: "CS303", name: "Cloud Computing", students: 30 },
    { id: "CS401", name: "Algorithms", students: 35 },
    { id: "CS402", name: "Machine Learning", students: 28 },
  ]

  const recentAssignments = [
    { id: 1, title: "Introduction to Programming Assignment", course: "CS101", submitted: 45, total: 50 },
    { id: 2, title: "Data Structures Project", course: "CS102", submitted: 40, total: 45 },
    { id: 3, title: "Web Development Quiz", course: "CS103", submitted: 55, total: 60 },
    { id: 4, title: "Computer Networks Lab Report", course: "CS201", submitted: 30, total: 35 },
    { id: 5, title: "Operating Systems Project", course: "CS202", submitted: 38, total: 40 },
    { id: 6, title: "Software Engineering Group Project", course: "CS205", submitted: 42, total: 48 },
    { id: 7, title: "Database Systems Midterm Exam", course: "CS301", submitted: 45, total: 50 },
    { id: 8, title: "Mobile App Development Proposal", course: "CS302", submitted: 25, total: 30 },
  ]

  const studentInfo = [
    { id: "STU001", name: "Alice Johnson", cgp: 4.0, classification: "First Class" },
    { id: "STU002", name: "Bob Smith", cgp: 3.3, classification: "Second Class Upper" },
    { id: "STU003", name: "Charlie Brown", cgp: 1.0, classification: "Pass" },
    { id: "STU004", name: "Diana Ross", cgp: 3.0, classification: "Second Class Upper" },
    { id: "STU005", name: "Ethan Hunt", cgp: 2.0, classification: "Third Class" },
    { id: "STU006", name: "Fiona Green", cgp: 3.7, classification: "First Class" },
    { id: "STU007", name: "George White", cgp: 3.1, classification: "Second Class Upper" },
    { id: "STU008", name: "Hannah Brown", cgp: 2.5, classification: "Second Class Lower" },
  ]

  const courseDetails = [
    { courseCode: "CS101", courseTitle: "Introduction to Programming", unit: 3 },
    { courseCode: "CS102", courseTitle: "Computer Architecture", unit: 4 },
    { courseCode: "CS103", courseTitle: "Data Structures", unit: 3 },
    { courseCode: "CS104", courseTitle: "Operating Systems", unit: 4 },
    { courseCode: "CS105", courseTitle: "Web Technologies", unit: 3 },
    { courseCode: "CS201", courseTitle: "Software Engineering", unit: 3 },
    { courseCode: "CS202", courseTitle: "Database Systems", unit: 3 },
    { courseCode: "CS203", courseTitle: "Artificial Intelligence", unit: 4 },
    { courseCode: "CS204", courseTitle: "Computer Networks", unit: 3 },
  ]

  const performanceMetrics = [
    { studentId: "STU001", courseCode: "CS101", caTest: 20, attendance: 92, exam: 75, total: 95, grade: "A" },
    { studentId: "STU002", courseCode: "CS102", caTest: 18, attendance: 85, exam: 70, total: 86, grade: "B" },
    { studentId: "STU003", courseCode: "CS103", caTest: 16, attendance: 60, exam: 45, total: 65, grade: "D" },
    { studentId: "STU004", courseCode: "CS104", caTest: 22, attendance: 78, exam: 58, total: 80, grade: "B" },
    { studentId: "STU005", courseCode: "CS105", caTest: 19, attendance: 90, exam: 40, total: 65, grade: "C" },
    { studentId: "STU006", courseCode: "CS201", caTest: 25, attendance: 95, exam: 85, total: 95, grade: "A" },
    { studentId: "STU007", courseCode: "CS202", caTest: 15, attendance: 70, exam: 30, total: 50, grade: "F" },
    { studentId: "STU008", courseCode: "CS203", caTest: 20, attendance: 88, exam: 75, total: 85, grade: "A" },
    { studentId: "STU009", courseCode: "CS204", caTest: 21, attendance: 80, exam: 50, total: 70, grade: "C" },
  ]

  const generateStudentData = (numStudents: number) => {
    const courses = ['CS301', 'CS205', 'CS401']
    return Array.from({ length: numStudents }, (_, i) => ({
      id: `STU${(i + 1).toString().padStart(3, '0')}`,
      CS301: Math.floor(Math.random() * 41) + 60,
      CS205: Math.floor(Math.random() * 41) + 60,
      CS401: Math.floor(Math.random() * 41) + 60,
    }))
  }

  const studentData = generateStudentData(100)

  const chartData = studentData.map((student) => ({
    name: student.id,
    [selectedCourse]: student[selectedCourse as keyof typeof student],
  }))

  const courseNames = {
    CS301: "Database Systems",
    CS205: "Web Development",
    CS401: "Algorithms"
  }

  const getRemark = (attendance: number, total: number, grade: string) => {
    if (attendance < 75) return "Boost attendance level"
    if (total < 60) return "Consider reducing credit units next semester"
    if (grade === "A" || grade === "B") return "Keep it up"
    return "Average performance, can improve"
  }

  const sendNotification = (studentId: string, message: string) => {
    console.log(`Sending notification to student ${studentId}: ${message}`)
    toast({
      title: "Notification Sent",
      description: `Message sent to student ${studentId}`,
    })
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white rounded-lg shadow-md p-4">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">Welcome, {lecturer.name}</h1>
          <p className="text-indigo-600">Lecturer ID: {lecturer.id} | Department: {lecturer.department}</p>
        </div>
        <Avatar className="h-16 w-16 mt-4 sm:mt-0 border-4 border-purple-300">
          <AvatarImage src="/placeholder.svg?height=64&width=64" alt={lecturer.name} />
          <AvatarFallback className="bg-purple-200 text-purple-700">{lecturer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-purple-100">
            <CardTitle className="text-purple-700">Upcoming Classes</CardTitle>
            <CardDescription className="text-indigo-600">Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-4">
                {upcomingClasses.map((class_) => (
                  <li key={class_.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium text-purple-700">{class_.title}</p>
                      <p className="text-sm text-indigo-600">{class_.room}</p>
                    </div>
                    <Badge className="bg-indigo-100 text-indigo-700">{class_.time}</Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-indigo-100">
            <CardTitle className="text-indigo-700">Courses Taught</CardTitle>
            <CardDescription className="text-purple-600">Your current semester courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-4">
                {coursesTaught.map((course) => (
                  <li key={course.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium text-indigo-700">{course.name}</p>
                      <p className="text-sm text-purple-600">{course.id}</p>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">{course.students} students</Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-purple-100">
            <CardTitle className="text-purple-700">Calendar</CardTitle>
            <CardDescription className="text-indigo-600">Schedule and important dates</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-purple-200"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 bg-white shadow-lg">
        <CardHeader className="bg-indigo-100">
          <CardTitle className="text-indigo-700">Student Information and Performance</CardTitle>
          <CardDescription className="text-purple-600">Detailed view of student data and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="students">
            <TabsList className="grid w-full grid-cols-3 bg-purple-100">
              <TabsTrigger value="students" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Students</TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Courses</TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="students">
              <Table>
                <TableHeader>
                  <TableRow className="bg-purple-50">
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>CGP</TableHead>
                    <TableHead>Classification</TableHead>
                    
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentInfo.map((student) => (
                    <TableRow key={student.id} className="hover:bg-purple-50">
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.cgp.toFixed(2)}</TableCell>
                      <TableCell>{student.classification}</TableCell>
                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="courses">
              <Table>
                <TableHeader>
                  <TableRow className="bg-purple-50">
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Title</TableHead>
                    <TableHead>Unit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courseDetails.map((course) => (
                    <TableRow key={course?.courseCode} className="hover:bg-purple-50">
                      <TableCell>{course?.courseCode}</TableCell>
                      <TableCell>{course?.courseTitle}</TableCell>
                      <TableCell>{course?.unit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="performance">
              <Table>
                <TableHeader>
                  <TableRow className="bg-purple-50">
                    <TableHead>Student ID</TableHead>
                    <TableHead>Course Code</TableHead>
                    <TableHead>CA Test</TableHead>
                    <TableHead>Attendance (%)</TableHead>
                    <TableHead>Exam</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceMetrics.map((metric, index) => (
                    <TableRow key={index} className="hover:bg-purple-50">
                      <TableCell>{metric.studentId}</TableCell>
                      <TableCell>{metric.courseCode}</TableCell>
                      <TableCell>{metric.caTest}</TableCell>
                      <TableCell>{metric.attendance}</TableCell>
                      <TableCell>{metric.exam}</TableCell>
                      <TableCell>{metric.total}</TableCell>
                      <TableCell>{metric.grade}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mt-6 overflow-hidden bg-white shadow-lg">
        <CardHeader className="bg-purple-100">
          <CardTitle className="text-purple-700">Student Performance Overview (100 Students)</CardTitle>
          <CardDescription className="text-indigo-600">Performance in {courseNames[selectedCourse as keyof typeof courseNames]}</CardDescription>
        </CardHeader>
        <CardContent>

          <ChartContainer
            config={{
              [selectedCourse]: {
                label: courseNames[selectedCourse as keyof typeof courseNames],
                color: "hsl(270, 70%, 50%)",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#6b46c1" />
                <YAxis domain={[0, 100]} stroke="#6b46c1" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey={selectedCourse} 
                  stroke="hsl(270, 70%, 50%)" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-white shadow-lg">
        <CardHeader className="bg-indigo-100">
          <CardTitle className="text-indigo-700">Recent Assignments</CardTitle>
          <CardDescription className="text-purple-600">Status of recently posted assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <ul className="space-y-4">
              {recentAssignments.map((assignment) => (
                <li key={assignment.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium text-indigo-700">{assignment.title}</p>
                    <p className="text-sm text-purple-600">{assignment.course}</p>
                  </div>
                  <Badge variant="outline" className="border-purple-300 text-purple-700">
                    {assignment.submitted}/{assignment.total} submitted
                  </Badge>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-white shadow-lg">
        <CardHeader className="bg-purple-100">
          <CardTitle className="text-purple-700">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Assignment
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-purple-700">Create New Assignment</DialogTitle>
                  <DialogDescription className="text-indigo-600">Fill in the details for the new assignment.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right text-purple-700">Title</Label>
                    <Input id="title" className="col-span-3 border-purple-300" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="course" className="text-right text-purple-700">Course</Label>
                    <Input id="course" className="col-span-3 border-purple-300" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dueDate" className="text-right text-purple-700">Due Date</Label>
                    <Input id="dueDate" type="date" className="col-span-3 border-purple-300" />
                  </div>
                </div>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">Create Assignment</Button>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Users className="mr-2 h-4 w-4" /> Manage Students
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl bg-white">
                <DialogHeader>
                  <DialogTitle className="text-purple-700">Manage Students</DialogTitle>
                  <DialogDescription className="text-indigo-600">View and manage student information.</DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-purple-50">
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>CGP</TableHead>
                      <TableHead>Classification</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentInfo.map((student) => (
                      <TableRow key={student.id} className="hover:bg-purple-50">
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.cgp.toFixed(2)}</TableCell>
                        <TableCell>{student.classification}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <FileText className="mr-2 h-4 w-4" /> Grade Submissions
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl bg-white">
                <DialogHeader>
                  <DialogTitle className="text-purple-700">Grade Submissions</DialogTitle>
                  <DialogDescription className="text-indigo-600">Review and grade student submissions.</DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-purple-50">
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentInfo.map((student, index) => (
                      <TableRow key={student.id} className="hover:bg-purple-50">
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{courseDetails[index % courseDetails.length].courseCode}</TableCell>
                        <TableCell>Assignment {index + 1}</TableCell>
                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Grade</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Clock className="mr-2 h-4 w-4" /> Set Office Hours
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-purple-700">Set Office Hours</DialogTitle>
                  <DialogDescription className="text-indigo-600">Schedule your office hours for students.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="day" className="text-right text-purple-700">Day</Label>
                    <Input id="day" className="col-span-3 border-purple-300" />
                  </div>
                  <div className="grid grid-cols-4  items-center gap-4">
                    <Label htmlFor="startTime" className="text-right text-purple-700">Start Time</Label>
                    <Input id="startTime" type="time" className="col-span-3 border-purple-300" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endTime" className="text-right text-purple-700">End Time</Label>
                    <Input id="endTime" type="time" className="col-span-3 border-purple-300" />
                  </div>
                </div>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Set Office Hours</Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}