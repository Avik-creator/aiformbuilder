'use client'

import Link from "next/link";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <footer ref={ref} className="w-full border-t bg-background">
      <motion.div
        className="container max-w-7xl mx-auto px-4 py-8 md:py-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center items-start">
          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-3 text-center md:text-left">
            <h3 className="text-lg font-semibold">FormCraft AI</h3>
            <p className="text-sm text-muted-foreground">
              AI-Powered Google Form Generator to help you build forms faster and more efficiently.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-3 text-center md:text-left">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </Link>
            </div>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants} className="space-y-3 text-center md:text-left">
            <h3 className="text-lg font-semibold">Legal</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-3 text-center md:text-left">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link 
                href="https://github.com/Avik-creator/aiformbuilder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/avik-mukherjee-8ab9911bb/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="https://x.com/avikm744"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-center md:justify-between pt-8 mt-8 border-t text-center md:text-left"
        >
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} FormCraft AI. All rights reserved.
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-x-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span>Built with</span>
              <span className="text-primary">♥</span>
              <span>by</span>
            </div>
            <Link 
              href="https://github.com/Avik-creator"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Avik Mukherjee
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;