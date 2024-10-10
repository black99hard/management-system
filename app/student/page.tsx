'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Calendar as CalendarIcon, FileText, GraduationCap } from 'lucide-react';
import withAuth from '@/lib/withAuth';

export default function StudentDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data - in a real application, this would come from an API
  const student = {
    name: "SALAHUDEEN RIDWAN",
    id: "BASUG/UG/SCI/CSC/20/10474",
    course: "Computer Science"
  };

  const upcomingAssessments = [
    { id: 1, title: "Database Systems Mid-term", date: "2023-05-15", course: "CS301" },
    { id: 2, title: "Web Development Project", date: "2023-05-20", course: "CS205" },
    { id: 3, title: "Algorithms Quiz", date: "2023-05-25", course: "CS401" },
  ];

  const recentGrades = [
    { id: 1, title: "Operating Systems Final", grade: "A", course: "CS302" },
    { id: 2, title: "Data Structures Project", grade: "B+", course: "CS201" },
    { id: 3, title: "Computer Networks Quiz", grade: "A-", course: "CS304" },
  ];

  const enrolledCourses = [
    { id: "CS301", name: "Database Systems", instructor: "Dr. Smith" },
    { id: "CS205", name: "Web Development", instructor: "Prof. Johnson" },
    { id: "CS401", name: "Algorithms", instructor: "Dr. Brown" },
    { id: "CS302", name: "Operating Systems", instructor: "Prof. Davis" },
  ];

  const allAssessments = [
    ...upcomingAssessments,
    { id: 4, title: "Computer Architecture Essay", date: "2023-06-05", course: "CS303" },
    { id: 5, title: "Software Engineering Group Project", date: "2023-06-15", course: "CS405" },
  ];

  const allGrades = [
    ...recentGrades,
    { id: 4, title: "Artificial Intelligence Midterm", grade: "B", course: "CS405" },
    { id: 5, title: "Computer Graphics Project", grade: "A", course: "CS406" },
  ];

  const courseMaterials = [
    { id: 1, title: "Introduction to Databases", course: "CS301", type: "Lecture Notes" },
    { id: 2, title: "HTML & CSS Basics", course: "CS205", type: "Tutorial" },
    { id: 3, title: "Big O Notation", course: "CS401", type: "Lecture Slides" },
    { id: 4, title: "Process Management in OS", course: "CS302", type: "Textbook Chapter" },
  ];

  const scheduleEvents = [
    { id: 1, title: "Database Systems Lecture", date: "2023-05-10", time: "10:00 AM - 11:30 AM" },
    { id: 2, title: "Web Development Lab", date: "2023-05-11", time: "2:00 PM - 4:00 PM" },
    { id: 3, title: "Algorithms Tutorial", date: "2023-05-12", time: "11:00 AM - 12:30 PM" },
    { id: 4, title: "Operating Systems Lecture", date: "2023-05-13", time: "9:00 AM - 10:30 AM" },
  ];

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {student.name}</h1>
          <p className="text-muted-foreground">Student ID: {student.id} | Course: {student.course}</p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder.svg?height=48&width=48" alt={student.name} />
          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </header>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
            <CardDescription>Your next deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-4">
                {upcomingAssessments.map((assessment) => (
                  <li key={assessment.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{assessment.title}</p>
                      <p className="text-sm text-muted-foreground">{assessment.course}</p>
                    </div>
                    <Badge>{assessment.date}</Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
            <CardDescription>Your latest results</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-4">
                {recentGrades.map((grade) => (
                  <li key={grade.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{grade.title}</p>
                      <p className="text-sm text-muted-foreground">{grade.course}</p>
                    </div>
                    <Badge variant="secondary">{grade.grade}</Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Important dates</CardDescription>
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
          <CardTitle>Enrolled Courses</CardTitle>
          <CardDescription>Your current semester courses</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>{course.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" /> View All Assessments
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>All Assessments</DialogTitle>
                  <DialogDescription>Overview of all your upcoming and past assessments</DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allAssessments.map((assessment) => (
                      <TableRow key={assessment.id}>
                        <TableCell>{assessment.title}</TableCell>
                        <TableCell>{assessment.course}</TableCell>
                        <TableCell>{assessment.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <GraduationCap className="mr-2 h-4 w-4" /> Check Grades
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>All Grades</DialogTitle>
                  <DialogDescription>Overview of all your grades</DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allGrades.map((grade) => (
                      <TableRow key={grade.id}>
                        <TableCell>{grade.title}</TableCell>
                        <TableCell>{grade.course}</TableCell>
                        <TableCell>{grade.grade}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" /> Course Materials
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Course Materials</DialogTitle>
                  <DialogDescription>Access your course materials</DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell>{material.title}</TableCell>
                        <TableCell>{material.course}</TableCell>
                        <TableCell>{material.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <CalendarIcon className="mr-2 h-4 w-4" /> Schedule
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Class Schedule</DialogTitle>
                  <DialogDescription>Your upcoming classes and events</DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduleEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

