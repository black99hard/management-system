'use client'; // Ensures this file runs on the client-side

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Use NextAuth's session

// Extend the WithAuthProps to include the wrapped component's props
export interface WithAuthProps {
  allowedRoles: string[];
  children?: React.ReactNode;
}

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) => {
  return function ProtectedRoute(props: P & WithAuthProps) {
    const { data: session, status } = useSession(); // Get session data from NextAuth
    const router = useRouter();

    useEffect(() => {
      // If the session is loading, wait for it to resolve
      if (status === 'loading') return;

      // If no session exists (user not authenticated)
      if (!session) {
        router.push('/login'); // Redirect to login page
      }
      // Check if user's role is allowed
      else if (session && session.user && !allowedRoles.includes(session.user.role)) {
        router.push('/unauthorized'); // Redirect if role is not allowed
      }
    }, [session, status, router, allowedRoles]);

    // Show nothing until the role and session are verified
    if (status === 'loading' || !session) {
      return null; // Optionally, render a loading spinner here
    }

    // If role is authorized, render the wrapped component
    return <WrappedComponent {...(props as P)} />;
  };
};

export default withAuth;
