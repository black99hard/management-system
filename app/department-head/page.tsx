'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from 'next/navigation';
import { UserCircle, BookOpen, ListChecks, Users, Calendar, BarChart, FileText, MessageSquare, DollarSign } from 'lucide-react';
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
  Cell
} from 'recharts';

type DepartmentData = {
  name: string;
  establishedYear: number;
  totalStudents: { undergraduate: number; graduate: number };
  totalFaculty: { lecturers: number; professors: number };
  activeCourses: number;
  upcomingEvents: { name: string; date: string }[];
  facultyMembers: { name: string; designation: string; email: string }[];
  courses: { code: string; name: string; enrolledStudents: number }[];
  studentReports: { name: string; year: string; gpa: number }[];
  performanceData: { month: string; studentPerformance: number; facultyPerformance: number }[];
  courseEnrollment: { name: string; students: number }[];
};

const mockDepartmentData: DepartmentData = {
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
    { name: "John Doe", designation: "Professor", email: "john.doe@university.edu" },
    { name: "Jane Smith", designation: "Lecturer", email: "jane.smith@university.edu" },
    { name: "Alice Johnson", designation: "Associate Professor", email: "alice.johnson@university.edu" },
    { name: "Bob Williams", designation: "Assistant Professor", email: "bob.williams@university.edu" },
    { name: "Carol Brown", designation: "Lecturer", email: "carol.brown@university.edu" },
  ],
  courses: [
    { code: "CS101", name: "Introduction to Programming", enrolledStudents: 120 },
    { code: "CS201", name: "Data Structures", enrolledStudents: 90 },
    { code: "CS301", name: "Algorithms", enrolledStudents: 75 },
    { code: "CS401", name: "Artificial Intelligence", enrolledStudents: 60 },
    { code: "CS501", name: "Machine Learning", enrolledStudents: 45 },
  ],
  studentReports: [
    { name: "Emma Davis", year: "3rd", gpa: 3.8 },
    { name: "Liam Wilson", year: "2nd", gpa: 3.5 },
    { name: "Olivia Moore", year: "4th", gpa: 3.9 },
    { name: "Noah Taylor", year: "1st", gpa: 3.2 },
    { name: "Ava Anderson", year: "3rd", gpa: 3.7 },
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
};

const COLORS = ['#FFD700', '#90EE90', '#87CEFA', '#FFA07A'];

export default function EnhancedDepartmentHeadPage() {
  const [departmentData, setDepartmentData] = useState<DepartmentData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Here you would fetch department data from your API or backend
    setDepartmentData(mockDepartmentData);
  }, []);

  if (!departmentData) {
    return <div>Loading...</div>;
  }

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
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {departmentData.courses.map((course, index) => (
                            <TableRow key={index}>
                              <TableCell>{course.code}</TableCell>
                              <TableCell>{course.name}</TableCell>
                              <TableCell>{course.enrolledStudents}</TableCell>
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
                        <Cell key={`cell-₦{index}`} fill={COLORS[index % COLORS.length]} />
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
                  <Dialog>
                    <DialogTrigger asChild>
                      {/* <Button variant="outline" className="bg-yellow-200 text-green-800 hover:bg-yellow-300">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Budget
                      </Button> */}
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Department Budget</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2">
                        <p>Total Budget: ₦1,500,000</p>
                        <p>Spent: ₦750,000</p>
                        <p>Remaining: ₦750,000</p>
                        <p>Major Expenses:</p>
                        <ul className="list-disc list-inside">
                          <li>Faculty Salaries: ₦500,000</li>
                          <li>Research Grants: ₦200,000</li>
                          <li>Equipment: ₦50,000</li>
                        </ul>
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