'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, UserCircle, ShieldCheck, Briefcase, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type Role = 'Employee' | 'Lecturer' | 'HOD' | 'Admin';

const roles: { name: Role; icon: React.ElementType; color: string }[] = [
  // { name: 'Employee', icon: Briefcase, color: 'bg-emerald-500' },
  // { name: 'Lecturer', icon: GraduationCap, color: 'bg-blue-500' },
  { name: 'HOD', icon: UserCircle, color: 'bg-purple-500' },
  // { name: 'Admin', icon: ShieldCheck, color: 'bg-red-500' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') as Role | null;
    if (storedRole) {
      setSelectedRole(storedRole);
    }
  }, []);

  const handleRoleSelection = (role: Role) => {
    setSelectedRole(role);
    setIsDialogOpen(true);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(null);
  const formData = new FormData(e.currentTarget);
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!selectedRole) {
    setError('Please select a role before logging in.');
    return;
  }

  // Add specific credential check for HOD role
  if (username !== 'hod' || password !== '12345678') {
    setError('Invalid credentials. Please try again.');
    return;
  }

  try {
    const result = await signIn('credentials', {
      username,
      password,
      role: selectedRole,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
      console.error(result.error);
    } else if (result?.ok) {
      // Redirect based on user role
      switch (selectedRole) {
        case 'HOD':
          router.push('/department-head/');
          break;
        default:
          router.push('/');
      }
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  } catch (error) {
    console.error('Login error:', error);
    setError('An unexpected error occurred. Please try again.');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-none shadow-2xl">
        <CardHeader className="text-white">
          <CardTitle className="text-3xl font-bold text-center mb-2">Task Management System</CardTitle>
          <CardDescription className="text-center text-gray-200">Select your role to access the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {roles.map((role) => (
              <motion.div
                key={role.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button
                  variant="outline"
                  className={`w-full h-32 flex flex-col items-center justify-center text-center p-2 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-lg transition-all duration-300 ${
                    selectedRole === role.name ? 'ring-2 ring-white' : ''
                  }`}
                  onClick={() => handleRoleSelection(role.name)}
                >
                  <div className={`absolute inset-0 ${role.color} opacity-10 rounded-lg`}></div>
                  <role.icon className="h-12 w-12 mb-2 text-white" />
                  <span className="text-white font-semibold">{role.name}</span>
                </Button>
              </motion.div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full mt-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/10"
            onClick={() => setIsAboutDialogOpen(true)}
          >
            <Info className="mr-2 h-4 w-4" /> About Me
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-white/10 backdrop-blur-md border-none shadow-2xl text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Login as {selectedRole}</DialogTitle>
                <DialogDescription className="text-gray-200">Enter your credentials to access the system</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-white">Username</Label>
                  <Input id="username" name="username" required className="bg-white/20 border-white/30 text-white placeholder-white/50" />
                </div>
                <div>
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input id="password" name="password" type="password" required className="bg-white/20 border-white/30 text-white placeholder-white/50" />
                </div>
                {error && <p className="text-red-300 text-sm">{error}</p>}
                <Button type="submit" className="w-full bg-white text-indigo-600 hover:bg-indigo-100">Login</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <Dialog open={isAboutDialogOpen} onOpenChange={setIsAboutDialogOpen}>
        <DialogContent className="bg-white/10 backdrop-blur-md border-none shadow-2xl text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">About Me</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Hello! I'm a final year student working on my capstone project.</p>
            <p>This Task Management System is part of my final year project in Computer Science.</p>
            <p>The goal of this project is to create an efficient and user-friendly system for managing tasks across different roles in an educational institution.</p>
            <p>Technologies used:</p>
            <ul className="list-disc list-inside">
              <li>React with Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion for animations</li>
              <li>NextAuth.js for authentication</li>
            </ul>
            <p>Thank you for checking out my project!</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}