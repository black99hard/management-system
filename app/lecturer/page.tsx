'use client'

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
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { toast } from "@/hooks/use-toast"

export default function LecturerDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedCourse, setSelectedCourse] = useState('CS301')

  // Mock data
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
    { id: 12, title: "Algorithms", time: "9:00 AM - 10:30 AM", room: "CS-301" },
    { id: 13, title: "Database Systems", time: "10:00 AM - 11:30 AM", room: "CS-201" },
    { id: 14, title: "Operating Systems", time: "1:00 PM - 2:30 PM", room: "CS-402" },
    { id: 15, title: "Artificial Intelligence", time: "3:00 PM - 4:30 PM", room: "CS-201" },
    { id: 16, title: "Software Engineering", time: "9:00 AM - 10:30 AM", room: "CS-301" },
    { id: 17, title: "Mobile App Development", time: "2:00 PM - 3:30 PM", room: "CS-201" },
    { id: 18, title: "Machine Learning", time: "8:00 AM - 9:30 AM", room: "CS-101" },
    { id: 19, title: "Cloud Computing", time: "10:00 AM - 11:30 AM", room: "CS-402" },
    { id: 20, title: "Operating Systems", time: "1:00 PM - 2:30 PM", room: "CS-202" },
    { id: 21, title: "Mobile App Development", time: "8:00 AM - 9:30 AM", room: "CS-302" },
    { id: 22, title: "Artificial Intelligence", time: "4:00 PM - 5:30 PM", room: "CS-201" },
    { id: 23, title: "Computer Networks", time: "4:00 PM - 5:30 PM", room: "CS-202" },
    { id: 24, title: "Mobile App Development", time: "11:00 AM - 12:30 PM", room: "CS-401" },
    { id: 25, title: "Information Retrieval", time: "9:00 AM - 10:30 AM", room: "CS-102" },
    { id: 26, title: "Database Systems", time: "3:00 PM - 4:30 PM", room: "CS-101" },
    { id: 27, title: "Cloud Computing", time: "11:00 AM - 12:30 PM", room: "CS-401" },
    { id: 28, title: "Information Retrieval", time: "9:00 AM - 10:30 AM", room: "CS-202" },
    { id: 29, title: "Machine Learning", time: "11:00 AM - 12:30 PM", room: "CS-301" },
    { id: 30, title: "Cybersecurity", time: "9:00 AM - 10:30 AM", room: "CS-301" }
  ];
  

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
    { id: "CS403", name: "Artificial Intelligence", students: 25 },
    { id: "CS404", name: "Human-Computer Interaction", students: 32 },
    { id: "CS405", name: "Data Science", students: 37 },
    { id: "CS406", name: "Information Retrieval", students: 29 },
    { id: "CS407", name: "Cybersecurity", students: 60 },
    { id: "CS408", name: "Game Development", students: 33 },
    { id: "CS409", name: "Big Data", students: 24 },
    { id: "CS410", name: "Blockchain Technology", students: 22 },
    { id: "CS411", name: "Robotics", students: 26 },
    { id: "CS412", name: "Network Security", students: 31 },
    { id: "CS413", name: "Embedded Systems", students: 20 },
    { id: "CS414", name: "Computer Graphics", students: 27 },
    { id: "CS415", name: "Digital Forensics", students: 18 },
    { id: "CS416", name: "Data Visualization", students: 25 },
    { id: "CS417", name: "Ethical Hacking", students: 19 },
    { id: "CS418", name: "Natural Language Processing", students: 15 },
    { id: "CS419", name: "Augmented Reality", students: 21 },
    { id: "CS420", name: "Software Testing", students: 44 },
    { id: "CS421", name: "Advanced Web Development", students: 43 },
    { id: "CS422", name: "Information Systems", students: 39 },
    { id: "CS423", name: "System Analysis", students: 46 },
    { id: "CS424", name: "Wireless Communication", students: 34 },
    { id: "CS425", name: "Parallel Computing", students: 23 },
    { id: "CS426", name: "Digital Image Processing", students: 30 },
  ];
  
  const recentAssignments = [
    { id: 1, title: "Introduction to Programming Assignment", course: "CS101", submitted: 45, total: 50 },
    { id: 2, title: "Data Structures Project", course: "CS102", submitted: 40, total: 45 },
    { id: 3, title: "Web Development Quiz", course: "CS103", submitted: 55, total: 60 },
    { id: 4, title: "Computer Networks Lab Report", course: "CS201", submitted: 30, total: 35 },
    { id: 5, title: "Operating Systems Project", course: "CS202", submitted: 38, total: 40 },
    { id: 6, title: "Software Engineering Group Project", course: "CS205", submitted: 42, total: 48 },
    { id: 7, title: "Database Systems Midterm Exam", course: "CS301", submitted: 45, total: 50 },
    { id: 8, title: "Mobile App Development Proposal", course: "CS302", submitted: 25, total: 30 },
    { id: 9, title: "Cloud Computing Presentation", course: "CS303", submitted: 20, total: 25 },
    { id: 10, title: "Algorithms Research Paper", course: "CS401", submitted: 28, total: 35 },
    { id: 11, title: "Machine Learning Case Study", course: "CS402", submitted: 22, total: 30 },
    { id: 12, title: "Artificial Intelligence Assignment", course: "CS403", submitted: 27, total: 30 },
    { id: 13, title: "Human-Computer Interaction Survey", course: "CS404", submitted: 33, total: 35 },
    { id: 14, title: "Data Science Project Report", course: "CS405", submitted: 38, total: 40 },
    { id: 15, title: "Information Retrieval Quiz", course: "CS406", submitted: 30, total: 35 },
    { id: 16, title: "Cybersecurity Assessment", course: "CS407", submitted: 29, total: 35 },
    { id: 17, title: "Game Development Assignment", course: "CS408", submitted: 18, total: 20 },
    { id: 18, title: "Big Data Analysis Project", course: "CS409", submitted: 24, total: 30 },
    { id: 19, title: "Blockchain Technology Report", course: "CS410", submitted: 20, total: 25 },
    { id: 20, title: "Robotics Project Presentation", course: "CS411", submitted: 15, total: 20 },
    { id: 21, title: "Network Security Assessment", course: "CS412", submitted: 34, total: 40 },
    { id: 22, title: "Embedded Systems Lab Work", course: "CS413", submitted: 28, total: 30 },
    { id: 23, title: "Computer Graphics Assignment", course: "CS414", submitted: 19, total: 25 },
    { id: 24, title: "Digital Forensics Case Analysis", course: "CS415", submitted: 17, total: 20 },
    { id: 25, title: "Data Visualization Project", course: "CS416", submitted: 30, total: 35 },
    { id: 26, title: "Ethical Hacking Report", course: "CS417", submitted: 20, total: 25 },
    { id: 27, title: "Natural Language Processing Assignment", course: "CS418", submitted: 10, total: 15 },
    { id: 28, title: "Augmented Reality Project", course: "CS419", submitted: 15, total: 20 },
    { id: 29, title: "Software Testing Report", course: "CS420", submitted: 28, total: 30 },
    { id: 30, title: "Advanced Web Development Project", course: "CS421", submitted: 40, total: 45 },
  ];
  
  // Updated mock data for student information
  const studentInfo = [
    { id: "STU001", name: "Alice Johnson", cgp: 4.0, classification: "First Class" },
    { id: "STU002", name: "Bob Smith", cgp: 3.3, classification: "Second Class Upper" },
    { id: "STU003", name: "Charlie Brown", cgp: 1.0, classification: "Pass" },
    { id: "STU004", name: "Diana Ross", cgp: 3.0, classification: "Second Class Upper" },
    { id: "STU005", name: "Ethan Hunt", cgp: 2.0, classification: "Third Class" },
    { id: "STU006", name: "Fiona Green", cgp: 3.7, classification: "First Class" },
    { id: "STU007", name: "George White", cgp: 3.1, classification: "Second Class Upper" },
    { id: "STU008", name: "Hannah Brown", cgp: 2.5, classification: "Second Class Lower" },
    { id: "STU009", name: "Ian Black", cgp: 3.8, classification: "First Class" },
    { id: "STU010", name: "Jackie Blue", cgp: 2.2, classification: "Third Class" },
    { id: "STU011", name: "Kevin Red", cgp: 3.4, classification: "Second Class Upper" },
    { id: "STU012", name: "Laura Yellow", cgp: 3.6, classification: "First Class" },
    { id: "STU013", name: "Michael Orange", cgp: 1.5, classification: "Pass" },
    { id: "STU014", name: "Nina Pink", cgp: 3.0, classification: "Second Class Upper" },
    { id: "STU015", name: "Oscar Grey", cgp: 2.8, classification: "Second Class Lower" },
    { id: "STU016", name: "Paula Violet", cgp: 4.0, classification: "First Class" },
    { id: "STU017", name: "Quincy Cyan", cgp: 2.3, classification: "Third Class" },
    { id: "STU018", name: "Rita Indigo", cgp: 3.2, classification: "Second Class Upper" },
    { id: "STU019", name: "Sam Green", cgp: 3.9, classification: "First Class" },
    { id: "STU020", name: "Tina Magenta", cgp: 2.1, classification: "Third Class" },
    { id: "STU021", name: "Ursula Brown", cgp: 3.5, classification: "Second Class Upper" },
    { id: "STU022", name: "Victor Black", cgp: 1.8, classification: "Pass" },
    { id: "STU023", name: "Wendy White", cgp: 3.3, classification: "Second Class Upper" },
    { id: "STU024", name: "Xander Gold", cgp: 3.0, classification: "Second Class Lower" },
    { id: "STU025", name: "Yara Silver", cgp: 2.6, classification: "Third Class" },
    { id: "STU026", name: "Zane Bronze", cgp: 4.0, classification: "First Class" },
    { id: "STU027", name: "Amy Silver", cgp: 3.2, classification: "Second Class Upper" },
    { id: "STU028", name: "Brian Steel", cgp: 2.7, classification: "Second Class Lower" },
    { id: "STU029", name: "Clara Pearl", cgp: 1.9, classification: "Pass" },
    { id: "STU030", name: "David Diamond", cgp: 3.8, classification: "First Class" },
  ];
  

  // Course details
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
    { courseCode: "CS301", courseTitle: "Algorithms", unit: 4 },
    { courseCode: "CS302", courseTitle: "Mobile App Development", unit: 3 },
    { courseCode: "CS303", courseTitle: "Cloud Computing", unit: 4 },
    { courseCode: "CS304", courseTitle: "Cybersecurity", unit: 3 },
    { courseCode: "CS305", courseTitle: "Human-Computer Interaction", unit: 3 },
    { courseCode: "CS401", courseTitle: "Machine Learning", unit: 4 },
    { courseCode: "CS402", courseTitle: "Data Mining", unit: 3 },
    { courseCode: "CS403", courseTitle: "Game Development", unit: 4 },
    { courseCode: "CS404", courseTitle: "Digital Signal Processing", unit: 3 },
    { courseCode: "CS405", courseTitle: "Distributed Systems", unit: 4 },
    { courseCode: "CS501", courseTitle: "Big Data Analytics", unit: 3 },
    { courseCode: "CS502", courseTitle: "Blockchain Technology", unit: 3 },
    { courseCode: "CS503", courseTitle: "Advanced Web Development", unit: 4 },
    { courseCode: "CS504", courseTitle: "Virtual Reality", unit: 3 },
    { courseCode: "CS505", courseTitle: "Digital Forensics", unit: 4 },
    { courseCode: "CS601", courseTitle: "Ethical Hacking", unit: 3 },
    { courseCode: "CS602", courseTitle: "Internet of Things", unit: 4 },
    { courseCode: "CS603", courseTitle: "Quantum Computing", unit: 3 },
    { courseCode: "CS604", courseTitle: "Augmented Reality", unit: 4 },
    { courseCode: "CS605", courseTitle: "Computer Graphics", unit: 3 },
    { courseCode: "CS606", courseTitle: "Natural Language Processing", unit: 4 },
    { courseCode: "CS607", courseTitle: "Robotics", unit: 3 },
    { courseCode: "CS608", courseTitle: "Systems Programming", unit: 4 },
    { courseCode: "CS609", courseTitle: "Compiler Design", unit: 3 },
    { courseCode: "CS610", courseTitle: "Software Testing", unit: 4 },
  ];
  

  // Performance metrics
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
    { studentId: "STU010", courseCode: "CS301", caTest: 19, attendance: 95, exam: 68, total: 80, grade: "B" },
    { studentId: "STU011", courseCode: "CS302", caTest: 24, attendance: 90, exam: 80, total: 90, grade: "A" },
    { studentId: "STU012", courseCode: "CS303", caTest: 12, attendance: 60, exam: 45, total: 55, grade: "D" },
    { studentId: "STU013", courseCode: "CS401", caTest: 20, attendance: 78, exam: 60, total: 80, grade: "B" },
    { studentId: "STU014", courseCode: "CS402", caTest: 15, attendance: 65, exam: 50, total: 60, grade: "C" },
    { studentId: "STU015", courseCode: "CS403", caTest: 23, attendance: 90, exam: 85, total: 95, grade: "A" },
    { studentId: "STU016", courseCode: "CS404", caTest: 18, attendance: 80, exam: 70, total: 80, grade: "B" },
    { studentId: "STU017", courseCode: "CS405", caTest: 14, attendance: 75, exam: 35, total: 55, grade: "D" },
    { studentId: "STU018", courseCode: "CS501", caTest: 19, attendance: 85, exam: 60, total: 75, grade: "C" },
    { studentId: "STU019", courseCode: "CS502", caTest: 22, attendance: 95, exam: 90, total: 95, grade: "A" },
    { studentId: "STU020", courseCode: "CS503", caTest: 20, attendance: 70, exam: 55, total: 70, grade: "B" },
    { studentId: "STU021", courseCode: "CS504", caTest: 13, attendance: 60, exam: 40, total: 53, grade: "F" },
    { studentId: "STU022", courseCode: "CS505", caTest: 15, attendance: 80, exam: 50, total: 65, grade: "C" },
    { studentId: "STU023", courseCode: "CS601", caTest: 21, attendance: 90, exam: 70, total: 85, grade: "B" },
    { studentId: "STU024", courseCode: "CS602", caTest: 24, attendance: 92, exam: 82, total: 95, grade: "A" },
    { studentId: "STU025", courseCode: "CS603", caTest: 10, attendance: 55, exam: 35, total: 45, grade: "F" },
    { studentId: "STU026", courseCode: "CS604", caTest: 18, attendance: 70, exam: 50, total: 68, grade: "C" },
    { studentId: "STU027", courseCode: "CS605", caTest: 22, attendance: 90, exam: 75, total: 90, grade: "A" },
    { studentId: "STU028", courseCode: "CS606", caTest: 20, attendance: 85, exam: 60, total: 80, grade: "B" },
    { studentId: "STU029", courseCode: "CS607", caTest: 15, attendance: 65, exam: 40, total: 50, grade: "D" },
    { studentId: "STU030", courseCode: "CS608", caTest: 19, attendance: 78, exam: 68, total: 85, grade: "B" },
];


  // Function to generate realistic student data
  const generateStudentData = (numStudents: number) => {
    const courses = ['CS301', 'CS205', 'CS401']
    return Array.from({ length: numStudents }, (_, i) => ({
      id: `STU${(i + 1).toString().padStart(3, '0')}`,
      CS301: Math.floor(Math.random() * 41) + 60, // Grades between 60 and 100
      CS205: Math.floor(Math.random() * 41) + 60,
      CS401: Math.floor(Math.random() * 41) + 60,
    }))
  }

  const studentData = generateStudentData(100)

  const chartData = studentData.map((student) => ({
    x: student[selectedCourse as keyof typeof student],
    y: student[selectedCourse === 'CS301' ? 'CS205' : selectedCourse === 'CS205' ? 'CS401' : 'CS301'] as number,
    z: student.id,
  }))

  const courseNames = {
    CS301: "Database Systems",
    CS205: "Web Development",
    CS401: "Algorithms"
  }

  // Function to determine remark based on performance
  const getRemark = (attendance: number, total: number, grade: string) => {
    if (attendance < 75) return "Boost attendance level"
    if (total < 60) return "Consider reducing credit units next semester"
    if (grade === "A" || grade === "B") return "Keep it up"
    return "Average performance, can improve"
  }

  // Mock function to send notification to student
  const sendNotification = (studentId: string, message: string) => {
    console.log(`Sending notification to student ${studentId}: ${message}`)
    toast({
      title: "Notification Sent",
      description: `Message sent to student ${studentId}`,
    })
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {lecturer.name}</h1>
          <p className="text-muted-foreground">Lecturer ID: {lecturer.id} | Department: {lecturer.department}</p>
        </div>
        <Avatar className="h-12 w-12 mt-4 sm:mt-0">
          <AvatarImage src="/placeholder.svg?height=48&width=48" alt={lecturer.name} />
          <AvatarFallback>{lecturer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-4">
                {upcomingClasses.map((class_) => (
                  <li key={class_.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{class_.title}</p>
                      <p className="text-sm text-muted-foreground">{class_.room}</p>
                    </div>
                    <Badge>{class_.time}</Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Courses Taught</CardTitle>
            <CardDescription>Your current semester courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-4">
                {coursesTaught.map((course) => (
                  <li key={course.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{course.name}</p>
                      <p className="text-sm text-muted-foreground">{course.id}</p>
                    </div>
                    <Badge variant="secondary">{course.students} students</Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Schedule and important dates</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Student Information and Performance</CardTitle>
          <CardDescription>Detailed view of student data and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="students">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="students">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>CGP</TableHead>
                    <TableHead>Classification</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentInfo.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.cgp.toFixed(2)}</TableCell>
                      <TableCell>{student.classification}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => sendNotification(student.id, "Keep up the good work!")}
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Notify
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="courses">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Title</TableHead>
                    <TableHead>Unit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courseDetails.map((course) => (
                    <TableRow key={course.courseCode}>
                      <TableCell>{course.courseCode}</TableCell>
                      <TableCell>{course.courseTitle}</TableCell>
                      <TableCell>{course.unit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="performance">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Course Code</TableHead>
                    <TableHead>CA Test</TableHead>
                    <TableHead>Attendance (%)</TableHead>
                    <TableHead>Exam</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceMetrics.map((metric, index) => (
                    <TableRow key={index}>
                      <TableCell>{metric.studentId}</TableCell>
                      <TableCell>{metric.courseCode}</TableCell>
                      <TableCell>{metric.caTest}</TableCell>
                      <TableCell>{metric.attendance}</TableCell>
                      <TableCell>{metric.exam}</TableCell>
                      <TableCell>{metric.total}</TableCell>
                      <TableCell>{metric.grade}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => sendNotification(metric.studentId, getRemark(metric.attendance, metric.total, metric.grade))}
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Boost
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mt-6 overflow-hidden">
        <CardHeader>
          <CardTitle>Student Performance Overview (100 Students)</CardTitle>
          <CardDescription>Comparison of student grades across courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={setSelectedCourse} defaultValue={selectedCourse}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CS301">CS301: Database Systems</SelectItem>
                <SelectItem value="CS205">CS205: Web Development</SelectItem>
                <SelectItem value="CS401">CS401: Algorithms</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ChartContainer
            config={{
              x: {
                label: courseNames[selectedCourse as keyof typeof courseNames],
                color: "hsl(var(--chart-1))",
              },
              y: {
                label: courseNames[selectedCourse === 'CS301' ? 'CS205' : selectedCourse === 'CS205'   ? 'CS401' : 'CS301'],
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name={courseNames[selectedCourse as keyof typeof courseNames]} unit="%" />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name={courseNames[selectedCourse === 'CS301' ? 'CS205' : selectedCourse === 'CS205' ? 'CS401' : 'CS301']} 
                  unit="%" 
                />
                <ZAxis type="category" dataKey="z" name="Student ID" />
                <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                <Scatter name="Students" data={chartData} fill="var(--color-x)" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Assignments</CardTitle>
          <CardDescription>Status of recently posted assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <ul className="space-y-4">
              {recentAssignments.map((assignment) => (
                <li key={assignment.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">{assignment.course}</p>
                  </div>
                  <Badge variant="outline">
                    {assignment.submitted}/{assignment.total} submitted
                  </Badge>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Assignment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                  <DialogDescription>Fill in the details for the new assignment.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="course" className="text-right">Course</Label>
                    <Input id="course" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                    <Input id="dueDate" type="date" className="col-span-3" />
                  </div>
                </div>
                <Button type="submit">Create Assignment</Button>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Users className="mr-2 h-4 w-4" /> Manage Students
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Manage Students</DialogTitle>
                  <DialogDescription>View and manage student information.</DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>CGP</TableHead>
                      <TableHead>Classification</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentInfo.map((student) => (
                      <TableRow key={student.id}>
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
                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" /> Grade Submissions
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Grade Submissions</DialogTitle>
                  <DialogDescription>Review and grade student submissions.</DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
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
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{courseDetails[index % courseDetails.length].courseCode}</TableCell>
                        <TableCell>Assignment {index + 1}</TableCell>
                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button size="sm">Grade</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Clock className="mr-2 h-4 w-4" /> Set Office Hours
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Set Office Hours</DialogTitle>
                  <DialogDescription>Schedule your office hours for students.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="day" className="text-right">Day</Label>
                    <Input id="day" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4  items-center gap-4">
                    <Label htmlFor="startTime" className="text-right">Start Time</Label>
                    <Input id="startTime" type="time" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endTime" className="text-right">End Time</Label>
                    <Input id="endTime" type="time" className="col-span-3" />
                  </div>
                </div>
                <Button type="submit">Set Office Hours</Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}