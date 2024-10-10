'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { GraduationCap } from 'lucide-react'
export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold mb-4 sm:mb-0">
        <GraduationCap className="h-8 w-8" />
        <span className="">SAS</span>
        </div>
          
        {session ? (
          <div className="flex items-center gap-4">
            <span>Welcome, {session.user.name}</span>
            <Button onClick={() => signOut({ callbackUrl: '/login' })}>
              Sign out
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </header>
  )
}


