
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  Briefcase, 
  ChevronDown, 
  LogIn, 
  Menu, 
  Search, 
  User, 
  UserPlus, 
  X 
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Simulated logged in state - this would come from auth context in a real app
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="border-b sticky top-0 bg-white z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-job-blue" />
            <span className="text-xl font-bold text-job-blue">JobNexus</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/jobs" className="font-medium hover:text-job-blue">Find Jobs</Link>
            <Link to="/companies" className="font-medium hover:text-job-blue">Companies</Link>
            <Link to="/freelance" className="font-medium hover:text-job-blue">Freelance</Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 font-medium hover:text-job-blue">
                  <span>Resources</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Link to="/resume-builder" className="w-full">Resume Builder</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/career-advice" className="w-full">Career Advice</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/salary-guide" className="w-full">Salary Guide</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          
          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-job-danger rounded-full"></span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-10 w-10 rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/saved-jobs" className="w-full">Saved Jobs</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/applications" className="w-full">My Applications</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="outline" className="gap-2" onClick={() => setIsLoggedIn(true)}>
                  <LogIn className="h-4 w-4" />
                  <span>Log in</span>
                </Button>
                <Button className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Sign up</span>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-white z-20 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for jobs" 
                className="flex-1 bg-transparent border-none focus:outline-none"
              />
            </div>
            
            <nav className="space-y-4">
              <Link to="/jobs" className="block font-medium py-2" onClick={closeMenu}>Find Jobs</Link>
              <Link to="/companies" className="block font-medium py-2" onClick={closeMenu}>Companies</Link>
              <Link to="/freelance" className="block font-medium py-2" onClick={closeMenu}>Freelance</Link>
              
              <div className="py-2">
                <p className="font-medium mb-2">Resources</p>
                <div className="pl-4 space-y-2">
                  <Link to="/resume-builder" className="block text-gray-600" onClick={closeMenu}>Resume Builder</Link>
                  <Link to="/career-advice" className="block text-gray-600" onClick={closeMenu}>Career Advice</Link>
                  <Link to="/salary-guide" className="block text-gray-600" onClick={closeMenu}>Salary Guide</Link>
                </div>
              </div>
            </nav>
            
            <div className="border-t pt-4 space-y-3">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="block font-medium py-2" onClick={closeMenu}>My Profile</Link>
                  <Link to="/saved-jobs" className="block font-medium py-2" onClick={closeMenu}>Saved Jobs</Link>
                  <Link to="/applications" className="block font-medium py-2" onClick={closeMenu}>My Applications</Link>
                  <button 
                    className="block w-full text-left font-medium py-2 text-red-500"
                    onClick={() => {
                      setIsLoggedIn(false);
                      closeMenu();
                    }}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center gap-2"
                    onClick={() => {
                      setIsLoggedIn(true);
                      closeMenu();
                    }}
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Log in</span>
                  </Button>
                  <Button className="w-full justify-center gap-2" onClick={closeMenu}>
                    <UserPlus className="h-4 w-4" />
                    <span>Sign up</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
