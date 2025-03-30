
import { Briefcase, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-8 w-8 text-white" />
              <span className="text-xl font-bold">JobNexus</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting talent with opportunity. Find your dream job or the perfect candidate with JobNexus.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li><Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">Browse Jobs</Link></li>
              <li><Link to="/companies" className="text-gray-400 hover:text-white transition-colors">Browse Companies</Link></li>
              <li><Link to="/salary-guide" className="text-gray-400 hover:text-white transition-colors">Salary Guide</Link></li>
              <li><Link to="/resume-builder" className="text-gray-400 hover:text-white transition-colors">Resume Builder</Link></li>
              <li><Link to="/career-advice" className="text-gray-400 hover:text-white transition-colors">Career Advice</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Post a Job</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Browse Candidates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing Plans</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Recruitment Solutions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Employer Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">About JobNexus</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} JobNexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
