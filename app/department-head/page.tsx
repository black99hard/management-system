'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';
import { UserCircle, BookOpen, ListChecks, Users, Calendar, FileText, MessageSquare, DollarSign, Briefcase, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

type DepartmentData = {
  name: string;
  establishedYear: number;
  totalStudents: { undergraduate: number; graduate: number };
  totalFaculty: { lecturers: number; professors: number; [key: string]: number };
  activeCourses: number;
  upcomingEvents: { name: string; date: string }[];
  facultyMembers: { id: string; name: string; designation: string; email: string }[];
  courses: { id: string; code: string; name: string; enrolledStudents: number; lecturer?: string }[];
  studentReports: { id: string; name: string; year: string; gpa: number }[];
  performanceData: { month: string; studentPerformance: number; facultyPerformance: number }[];
  courseEnrollment: { name: string; students: number }[];
  allStudents: { id: string; name: string; year: string; major: string; gpa: number }[];
};


const initialDepartmentData: DepartmentData = {
  name: "Computer Science",
  establishedYear: 1985,
  totalStudents: { undergraduate: 500, graduate: 150 },
  totalFaculty: { lecturers: 15, professors: 10 },
  activeCourses: 30,
  upcomingEvents: [
    { name: "Final Exams", date: "2024-05-15" },
    { name: "Faculty Meeting", date: "2024-04-20" },
    { name: "Research Symposium", date: "2024-06-10" },
    { name: "Orientation Week", date: "2024-08-25" },
  ],
  facultyMembers: [
    { id: "f1", name: "John Doe", designation: "Professor", email: "john.doe@university.edu" },
    { id: "f2", name: "Jane Smith", designation: "Lecturer", email: "jane.smith@university.edu" },
    { id: "f3", name: "Alice Johnson", designation: "Associate Professor", email: "alice.johnson@university.edu" },
    { id: "f4", name: "Bob Williams", designation: "Assistant Professor", email: "bob.williams@university.edu" },
    { id: "f5", name: "Carol Brown", designation: "Lecturer", email: "carol.brown@university.edu" },
  ],
  courses: [
    { id: "c1", code: "CS101", name: "Introduction to Programming", enrolledStudents: 120 },
    { id: "c2", code: "CS201", name: "Data Structures", enrolledStudents: 90 },
    { id: "c3", code: "CS301", name: "Algorithms", enrolledStudents: 75 },
    { id: "c4", code: "CS401", name: "Artificial Intelligence", enrolledStudents: 60 },
    { id: "c5", code: "CS501", name: "Machine Learning", enrolledStudents: 45 },
  ],
  studentReports: [
    { id: "s1", name: "Emma Davis", year: "3rd", gpa: 3.8 },
    { id: "s2", name: "Liam Wilson", year: "2nd", gpa: 3.5 },
    { id: "s3", name: "Olivia Moore", year: "4th", gpa: 3.9 },
    { id: "s4", name: "Noah Taylor", year: "1st", gpa: 3.2 },
    { id: "s5", name: "Ava Anderson", year: "3rd", gpa: 3.7 },
  ],
  performanceData: [
    { month: "Jan", studentPerformance: 75, facultyPerformance: 85 },
    { month: "Feb", studentPerformance: 80, facultyPerformance: 88 },
    { month: "Mar", studentPerformance: 78, facultyPerformance: 87 },
    { month: "Apr", studentPerformance: 82, facultyPerformance: 90 },
    { month: "May", studentPerformance: 85, facultyPerformance: 92 },
    { month: "Jun", studentPerformance: 88, facultyPerformance: 91 },
  ],
  courseEnrollment: [
    { name: "CS101", students: 120 },
    { name: "CS201", students: 90 },
    { name: "CS301", students: 75 },
    { name: "CS401", students: 60 },
    { name: "CS501", students: 45 },
  ],
  allStudents: [
    { id: "s1", name: "Emma Davis", year: "3rd", major: "Computer Science", gpa: 3.8 },
    { id: "s2", name: "Liam Wilson", year: "2nd", major: "Computer Science", gpa: 3.5 },
    { id: "s3", name: "Olivia Moore", year: "4th", major: "Computer Science", gpa: 3.9 },
    { id: "s4", name: "Noah Taylor", year: "1st", major: "Computer Science", gpa: 3.2 },
    { id: "s5", name: "Ava Anderson", year: "3rd", major: "Computer Science", gpa: 3.7 },
    { id: "s6", name: "Ethan Martinez", year: "2nd", major: "Computer Science", gpa: 3.6 },
    { id: "s7", name: "Sophia Lee", year: "4th", major: "Computer Science", gpa: 3.9 },
    { id: "s8", name: "Mason Clark", year: "1st", major: "Computer Science", gpa: 3.3 },
    { id: "s9", name: "Isabella Rodriguez", year: "3rd", major: "Computer Science", gpa: 3.7 },
    { id: "s10", name: "William Turner", year: "2nd", major: "Computer Science", gpa: 3.5 },
  ],
};

const COLORS = ['#FFD700', '#90EE90', '#87CEFA', '#FFA07A'];

export default function EnhancedDepartmentHeadPage() {
  const [departmentData, setDepartmentData] = useState<DepartmentData>(initialDepartmentData);
  const [newLecturer, setNewLecturer] = useState({ name: '', email: '', designation: '' });
  const [selectedLecturer, setSelectedLecturer] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [dutyDescription, setDutyDescription] = useState('');
  const router = useRouter();

  const handleAllocateCourse = () => {
    if (selectedLecturer && selectedCourse) {
      setDepartmentData(prevData => ({
        ...prevData,
        courses: prevData.courses.map(course =>
          course.id === selectedCourse ? { ...course, lecturer: selectedLecturer } : course
        )
      }));
      alert(`Allocated course ${selectedCourse} to lecturer ${selectedLecturer}`);
    }
  };

  const handleAddLecturer = () => {
    if (newLecturer.name && newLecturer.email && newLecturer.designation) {
      const newId = `f${departmentData.facultyMembers.length + 1}`;
      setDepartmentData(prevData => ({
        ...prevData,
        facultyMembers: [...prevData.facultyMembers, { id: newId, ...newLecturer }],
        totalFaculty: {
          ...prevData.totalFaculty,
          [newLecturer.designation.toLowerCase() + 's']: (prevData.totalFaculty[newLecturer.designation.toLowerCase() + 's'] || 0) + 1
        }
      }));
      setNewLecturer({ name: '', email: '', designation: '' });
      alert(`Added new lecturer: ${newLecturer.name}`);
    }
  };

  const handleAssignDuty = () => {
    if (selectedLecturer && dutyDescription) {
      alert(`Assigned duty "${dutyDescription}" to lecturer ${selectedLecturer}`);
      setDutyDescription('');
    }
  };

  const handleMentorLecturer = (mentorId: string, menteeId: string) => {
    alert(`Assigned mentor ${mentorId} to mentee ${menteeId}`);
  };

  const handleAttendCourse = (lecturerId: string, courseId: string) => {
    alert(`Lecturer ${lecturerId} is attending course ${courseId}`);
  };

  const handleAllocateTimeSlot = (courseId: string, timeSlot: string) => {
    alert(`Allocated time slot ${timeSlot} to course ${courseId}`);
  };

  return (
    <div className="min-h-screen bg-green-50 p-4">
      <Card className="w-full max-w-6xl mx-auto bg-white">
        <CardHeader className="bg-yellow-400">
          <CardTitle className="text-3xl font-bold text-center text-green-800">
            {departmentData.name} Department Dashboard
          </CardTitle>
          <p className="text-center text-green-700">Established {departmentData.establishedYear}</p>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Department Overview */}
            <Card className="bg-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Department Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-green-700">
                  <p>Total Students: {departmentData.totalStudents.undergraduate + departmentData.totalStudents.graduate}</p>
                  <p>Total Faculty: {departmentData.totalFaculty.lecturers + departmentData.totalFaculty.professors}</p>
                  <p>Active Courses: {departmentData.activeCourses}</p>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="bg-yellow-100">
              <CardHeader>
                <CardTitle className="text-yellow-800">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-yellow-700">
                  {departmentData.upcomingEvents.map((event, index) => (
                    <li key={index}>{event.name} - {event.date}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-yellow-200 text-green-800 hover:bg-yellow-300">
                        <UserCircle className="mr-2 h-4 w-4" />
                        Faculty
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Faculty Members</DialogTitle>
                      </DialogHeader>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Designation</TableHead>
                            <TableHead>Email</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {departmentData.facultyMembers.map((faculty, index) => (
                            <TableRow key={index}>
                              <TableCell>{faculty.name}</TableCell>
                              <TableCell>{faculty.designation}</TableCell>
                              <TableCell>{faculty.email}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-yellow-200 text-green-800 hover:bg-yellow-300">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Courses
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Active Courses</DialogTitle>
                      </DialogHeader>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Enrolled Students</TableHead>
                            <TableHead>Lecturer</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {departmentData.courses.map((course, index) => (
                            <TableRow key={index}>
                              <TableCell>{course.code}</TableCell>
                              <TableCell>{course.name}</TableCell>
                              <TableCell>{course.enrolledStudents}</TableCell>
                              <TableCell>{course.lecturer || 'Not assigned'}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-yellow-200 text-green-800 hover:bg-yellow-300">
                        <Users className="mr-2 h-4 w-4" />
                        Students
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      
                      <DialogHeader>
                        <DialogTitle>Student Reports</DialogTitle>
                      </DialogHeader>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>GPA</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {departmentData.studentReports.map((report, index) => (
                            <TableRow key={index}>
                              <TableCell>{report.name}</TableCell>
                              <TableCell>{report.year}</TableCell>
                              <TableCell>{report.gpa}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-yellow-200 text-green-800 hover:bg-yellow-300">
                        <ListChecks className="mr-2 h-4 w-4" />
                        Reports
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Department Reports</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2">
                        <p>Total Undergraduate Students: {departmentData.totalStudents.undergraduate}</p>
                        <p>Total Graduate Students: {departmentData.totalStudents.graduate}</p>
                        <p>Total Lecturers: {departmentData.totalFaculty.lecturers}</p>
                        <p>Total Professors: {departmentData.totalFaculty.professors}</p>
                        <p>Active Courses: {departmentData.activeCourses}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card className="col-span-full bg-white">
              <CardHeader>
                <CardTitle className="text-green-800">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={departmentData.performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="studentPerformance" stroke="#FFD700" name="Student Performance" />
                    <Line type="monotone" dataKey="facultyPerformance" stroke="#90EE90" name="Faculty Performance" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Course Enrollment */}
            <Card className="col-span-full md:col-span-1 bg-white">
              <CardHeader>
                <CardTitle className="text-green-800">Course Enrollment</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData.courseEnrollment}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="students"
                    >
                      {departmentData.courseEnrollment.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Student Reports */}
            <Card className="col-span-full md:col-span-1 bg-yellow-100">
              <CardHeader>
                <CardTitle className="text-yellow-800">Recent Student Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-yellow-700">
                  {departmentData.studentReports.map((report, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{report.name} ({report.year} year)</span>
                      <span>GPA: {report.gpa}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Course Allocation */}
            <Card className="bg-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-800">Course Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setSelectedLecturer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Lecturer" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentData.facultyMembers.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id}>{faculty.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentData.courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="mt-2 w-full" onClick={handleAllocateCourse}>
                  Allocate Course
                </Button>
              </CardContent>
            </Card>

            {/* Add Lecturer */}
            <Card className="bg-purple-100">
              <CardHeader>
                <CardTitle className="text-purple-800">Add New Lecturer</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  className="mb-2"
                  placeholder="Lecturer Name"
                  value={newLecturer.name}
                  onChange={(e) => setNewLecturer({ ...newLecturer, name: e.target.value })}
                />
                <Input
                  className="mb-2"
                  placeholder="Email"
                  value={newLecturer.email}
                  onChange={(e) => setNewLecturer({ ...newLecturer, email: e.target.value })}
                />
                <Select
                  onValueChange={(value) => setNewLecturer({ ...newLecturer, designation: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lecturer">Lecturer</SelectItem>
                    <SelectItem value="Professor">Professor</SelectItem>
                    <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                    <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="mt-2 w-full" onClick={handleAddLecturer}>
                  Add Lecturer
                </Button>
              </CardContent>
            </Card>

            {/* Assign Duties */}
            <Card className="bg-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Assign Duties</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setSelectedLecturer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Lecturer" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentData.facultyMembers.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id}>{faculty.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  className="my-2"
                  placeholder="Duty Description"
                  value={dutyDescription}
                  onChange={(e) => setDutyDescription(e.target.value)}
                />
                <Button className="w-full" onClick={handleAssignDuty}>
                  Assign Duty
                </Button>
              </CardContent>
            </Card>

            {/* Lecturer Performance */}
            <Card className="col-span-full bg-yellow-100">
              <CardHeader>
                <CardTitle className="text-yellow-800">Lecturer Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData.facultyMembers.map(f => ({ name: f.name, performance: Math.random() * 100 }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="performance" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Mentoring Program */}
            <Card className="bg-indigo-100">
              <CardHeader>
                <CardTitle className="text-indigo-800">Mentoring Program</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={(mentorId) => handleMentorLecturer(mentorId, 'selectedMenteeId')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Mentor" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentData.facultyMembers.filter(f => f.designation === 'Professor').map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id}>{faculty.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(menteeId) => handleMentorLecturer('selectedMentorId', menteeId)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Mentee" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentData.facultyMembers.filter(f => f.designation === 'Lecturer').map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id}>{faculty.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="mt-2 w-full" onClick={() => handleMentorLecturer('selectedMentorId', 'selectedMenteeId')}>
                  Assign Mentor
                </Button>
              </CardContent>
            </Card>

            {/* Course Attendance */}
            <Card className="bg-red-100">
              <CardHeader>
                <CardTitle className="text-red-800">Course Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={(lecturerId) => handleAttendCourse(lecturerId, 'selectedCourseId')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Lecturer" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentData.facultyMembers.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id}>{faculty.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(courseId) => handleAttendCourse('selectedLecturerId', courseId)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentData.courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="mt-2 w-full" onClick={() => handleAttendCourse('selectedLecturerId', 'selectedCourseId')}>
                  Record Attendance
                </Button>
              </CardContent>
            </Card>

            {/* Timetable Allocation */}
            <Card className="bg-pink-100">
              <CardHeader>
                <CardTitle className="text-pink-800">Timetable Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={(courseId) => handleAllocateTimeSlot(courseId, 'selectedTimeSlot')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentData.courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(timeSlot) => handleAllocateTimeSlot('selectedCourseId', timeSlot)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Time Slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday-9am">Monday 9:00 AM</SelectItem>
                    <SelectItem value="tuesday-2pm">Tuesday 2:00 PM</SelectItem>
                    <SelectItem value="wednesday-11am">Wednesday 11:00 AM</SelectItem>
                    {/* Add more time slots as needed */}
                  </SelectContent>
                </Select>
                <Button className="mt-2 w-full" onClick={() => handleAllocateTimeSlot('selectedCourseId', 'selectedTimeSlot')}>
                  Allocate Time Slot
                </Button>
              </CardContent>
            </Card>

            {/* New: All Lecturers Table */}
            <Card className="col-span-full bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">All Lecturers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentData.facultyMembers.map((faculty) => (
                      <TableRow key={faculty.id}>
                        <TableCell>{faculty.name}</TableCell>
                        <TableCell>{faculty.designation}</TableCell>
                        <TableCell>{faculty.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* New: All Students Table */}
            <Card className="col-span-full bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">All Students</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Major</TableHead>
                      <TableHead>GPA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentData.allStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.year}</TableCell>
                        <TableCell>{student.major}</TableCell>
                        <TableCell>{student.gpa}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Additional Features */}
            <Card className="col-span-full bg-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Additional Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-yellow-200 text-green-800 hover:bg-yellow-300">
                        <Calendar className="mr-2 h-4 w-4" />
                        Calendar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Department Calendar</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2">
                        <p>April 15, 2024: Mid-term Exams Begin</p>
                        <p>April 20, 2024: Faculty Meeting</p>
                        <p>May 1, 2024: Research Proposal Deadline</p>
                        <p>May 15, 2024: Final Exams Begin</p>
                        <p>June 10, 2024: Research Symposium</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-yellow-200 text-green-800 hover:bg-yellow-300">
                        <BarChart className="mr-2 h-4 w-4" />
                        Analytics
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Department Analytics</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2">
                        <p>Average GPA: 3.6</p>
                        <p>Graduation Rate: 92%</p>
                        <p>Research Publications: 45</p>
                        <p>Faculty to Student Ratio: 1:20</p>
                        <p>Course Satisfaction Rate: 88%</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-yellow-200 text-green-800 hover:bg-yellow-300">
                        <FileText className="mr-2 h-4 w-4" />
                        Documents
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Department Documents</DialogTitle>
                      </DialogHeader>
                      <ul className="space-y-2">
                        <li>Department Handbook</li>
                        <li>Course Syllabi</li>
                        <li>Research Guidelines</li>
                        <li>Faculty Evaluation Forms</li>
                        <li>Student Internship Agreements</li>
                      </ul>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-yellow-200 text-green-800 hover:bg-yellow-300">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Communication
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Department Communication</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2">
                        <p>Unread Messages: 5</p>
                        <p>Upcoming Meetings: 3</p>
                        <p>Recent Announcements: 2</p>
                        <Button className="w-full mt-4">Compose New Message</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}