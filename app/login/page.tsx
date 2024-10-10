'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, UserCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type Role = 'Student' | 'Lecturer' | 'Admin';

const roles: { name: Role; icon: React.ElementType }[] = [
  { name: 'Student', icon: GraduationCap },
  { name: 'Lecturer', icon: UserCircle },
  { name: 'Admin', icon: ShieldCheck },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
          case 'Student':
            router.push('/student/');
            break;
          case 'Lecturer':
            router.push('/lecturer/');
            break;
          case 'Admin':
            router.push('/admin/');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Student Assessment System</CardTitle>
          <CardDescription className="text-center">Choose your role to log in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {roles.map((role) => (
              <motion.div key={role.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className={`w-full h-24 flex flex-col items-center justify-center text-center p-2 ${
                    selectedRole === role.name ? 'border-primary border-2' : ''
                  }`}
                  onClick={() => handleRoleSelection(role.name)}
                >
                  <role.icon className="h-8 w-8 mb-2" />
                  {role.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login as {selectedRole}</DialogTitle>
            <DialogDescription>Enter your credentials to log in</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}