'use client'

import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, LogOut } from 'lucide-react';
import { ModeToggle } from "./ui/dark-mode-toggle";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import logo from "@/../public/logo.png";

function SignOut() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signOut();
      }}
    >
      <Button type="submit">
        <LogOut className="md:hidden" />
        <span className="hidden md:block">Sign out</span>
      </Button>
    </form>
  );
}

const Header = () => {
  const { data: session } = useSession();

  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  return (
    <header className="border-b">
      <nav className="px-4 py-3">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={logoVariants}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-600 flex items-center justify-center" aria-label="logo">
                <Image src={logo} width={100} height={100} alt="Logo"/>
              </div>
            </motion.div>
            <motion.h1 
              className="ml-2 text-2xl font-extrabold"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              FormCraftAI

            </motion.h1>
          </Link>
          <div>
            {session?.user ? (
              <div className="flex items-center gap-8 md:gap-1 lg:gap-4">
                <ModeToggle/>
                <Link href="/forms">
                  <Button variant="outline">
                    <span className="hidden md:inline">Dashboard</span>{" "}
                    <LayoutDashboard className="md:hidden" />
                  </Button>
                </Link>
                {session.user.name && session.user.image && (
                  <Image
                    src={session.user.image}
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
                <ModeToggle/>
                <Link href="/signin">
                  <Button variant="default" className="text-md gap-4">
                    Sign in
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

