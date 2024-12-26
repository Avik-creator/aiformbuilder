import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col md:flex-row items-center justify-between py-4 space-y-2 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Link 
            href="/terms-of-service"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>
          <Separator orientation="vertical" className="h-4 hidden md:block" />
          <Link 
            href="/privacy-policy"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} FormCraft AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;