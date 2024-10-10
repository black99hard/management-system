'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    // Redirect to login if no session exists
    if (!session) {
      router.push('/login');
    }

    // Redirect if role is not student
    if (session?.user?.role !== 'student') {
      router.push('/unauthorized');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session || session.user.role !== 'student') {
    return null; // Optionally, render a loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default StudentLayout;
