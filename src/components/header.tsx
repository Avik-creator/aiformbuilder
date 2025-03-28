"use client"
import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { LayoutDashboard, LogOut, X, Menu, User, Plus, Star } from "lucide-react"
import { motion } from "framer-motion"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"

function SignOut() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        signOut()
      }}
    >
      <Button type="submit">
        <LogOut className="md:hidden" />
        <span className="hidden md:block">Sign out</span>
      </Button>
    </form>
  )
}

const Header = () => {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <>
      <header className="border-b">
        <nav className="px-4 py-3">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/" className="flex items-center">
              <motion.div initial="hidden" animate="visible" variants={logoVariants} className="flex items-center">
                <Image src="/logo.png" width={40} height={40} alt="FormCraftAI Logo" className="mr-2" />
                <h1 className="ml-2 text-2xl font-extrabold">FormCraftAI</h1>
              </motion.div>
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-gray-400 hover:text-primary bg-white/5 hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? 
                <X className="h-4 w-4" /> : 
                <Menu className="h-4 w-4" />
              }
            </button>

            <div className="hidden md:flex">
              {session?.user ? (
                <div className="flex items-center gap-8 md:gap-1 lg:gap-4">

                  <Link href="/forms">
                    <Button variant="outline"  className={`flex items-center gap-2 p-2 rounded-lg transition-all ${pathname === '/forms' 
                    ? 'bg-primary/20 text-primary' 
                    : 'hover:bg-white/5 text-gray-300'}`}>
                      <span className="hidden md:inline">Forms</span> <LayoutDashboard className="md:hidden" />
                    </Button>
                  </Link>

                  <Link href="/form-generation">
                    <Button variant="outline" className={`flex items-center gap-2 p-2 rounded-lg transition-all ${pathname === '/form-generation' 
                    ? 'bg-primary/20 text-primary' 
                    : 'hover:bg-white/5 text-gray-300'}`}
                    
                    >
                      <span className="hidden md:inline">Create Form</span> <Plus className="md:hidden" />
                    </Button>
                  </Link>
                  {session.user.name && session.user.image && (
                    <Image
                      src={session.user.image || "/placeholder.svg"}
                      alt={session.user.name}
                      width={32}
                      height={32}
                      className="rounded-full hidden md:block"
                    />
                  )}
                  <SignOut />
                </div>
              ) : (
                <div className="flex gap-4">

                  <Link href="/signin">
                    <Button variant="default" className="relative text-base rounded-md 
                 bg-gray-800 border-gray-700 text-white 
                 hover:bg-gray-700 
                 focus:outline-none 
                 animate-pulse-glow">
                      Sign in
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden max-w-xs mx-auto mt-2 glass-card rounded-xl overflow-hidden"
        >
          <div className="px-4 py-3 flex flex-col gap-2">
            {session?.user ? (
              <>
                <Link 
                  href="/forms" 
                  className={`flex items-center gap-2 p-2 rounded-lg transition-all ${pathname === '/forms' 
                    ? 'bg-primary/20 text-primary' 
                    : 'hover:bg-white/5 text-gray-300'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="font-medium text-sm">Forms</span>
                </Link>

                <Link 
                  href="/form-generation" 
                 className={`flex items-center gap-2 p-2 rounded-lg transition-all ${pathname === '/form-generation' 
                    ? 'bg-primary/20 text-primary' 
                    : 'hover:bg-white/5 text-gray-300'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="font-medium text-sm">Create Form</span>
                </Link>
                
                <div className="border-t border-white/10 my-2 pt-2">
                  <button 
                    onClick={() => {
                      signOut()
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center justify-center gap-2 p-2 w-full text-left mt-2 
                      text-red-400 hover:bg-red-950/30 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="font-medium text-sm">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2 mb-2">
                <Link 
                  href="/signin" 
                  className="flex items-center gap-2 p-2 hover:bg-white/5 text-gray-300 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Sign In</span>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  )
}

export default Header