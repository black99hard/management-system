'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { GraduationCap } from 'lucide-react'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <GraduationCap className="h-6 w-6" />
          <span>Management System</span>
        </Link>
        
        {session ? (
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Welcome, {session.user.name}</span>
            <Button 
              variant="secondary" 
              className="bg-white text-green-600 hover:bg-green-100"
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              Sign out
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button variant="secondary" className="bg-white text-green-600 hover:bg-green-100">
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}