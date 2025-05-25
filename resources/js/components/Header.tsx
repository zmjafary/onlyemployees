
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/providers/AuthProvider';
import { logout } from '@/services/authService';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, HelpCircle, Home, LogOut, Menu, PenSquare, Search, User, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was a problem logging you out.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/uploads/logo.png" 
              alt="OnlyEmployees" 
              className="h-8"
            />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link href="/" className="flex items-center gap-1.5 lg:text-sm md:text-xs font-medium transition-colors hover:text-primary">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link href="/how-it-works" className="flex items-center gap-1.5 lg:text-sm md:text-xs font-medium transition-colors hover:text-primary">
            <HelpCircle size={18} />
            <span>How It Works</span>
          </Link>
          <Link href="/explore" className="flex items-center gap-1.5 lg:text-sm md:text-xs font-medium transition-colors hover:text-primary">
            <Search size={18} />
            <span>Explore Companies</span>
          </Link>
          <Link href="/review" className="flex items-center gap-1.5 lg:text-sm md:text-xs font-medium transition-colors hover:text-primary">
            <PenSquare size={18} />
            <span>Submit a Review</span>
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 lg:text-sm md:text-xs font-medium transition-colors hover:text-primary"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User size={18} />
                  <span className="hidden lg:inline">
                    {user?.email?.split('@')[0] || 'User'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="bg-primary text-white">
              <Link href="/auth">Join Oe.</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 md:hidden z-50"
            >
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="flex items-center gap-2.5 text-base font-medium transition-colors hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home size={20} />
                  <span>Home</span>
                </Link>
                <Link 
                  href="/how-it-works" 
                  className="flex items-center gap-2.5 text-base font-medium transition-colors hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HelpCircle size={20} />
                  <span>How It Works</span>
                </Link>
                <Link 
                  href="/explore" 
                  className="flex items-center gap-2.5 text-base font-medium transition-colors hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Search size={20} />
                  <span>Explore Companies</span>
                </Link>
                <Link 
                  href="/review" 
                  className="flex items-center gap-2.5 text-base font-medium transition-colors hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PenSquare size={20} />
                  <span>Submit a Review</span>
                </Link>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2.5 text-base font-medium transition-colors hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                
                {isAuthenticated ? (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full mt-2 flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    Sign out
                  </Button>
                ) : (
                  <Button 
                    asChild 
                    className="bg-primary text-white w-full mt-2" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/auth">Join Oe.</Link>
                  </Button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
