
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, 
  Building2, 
  CheckCircle, 
  Clock, 
  Database, 
  FileText, 
  Laptop, 
  LineChart, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Users 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import MainLayout from "@/components/MainLayout";
import SearchBar from "@/components/SearchBar";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (term: string, loc: string) => {
    // Store search params for jobs page
    setSearchTerm(term);
    setLocation(loc);
    
    // Navigate to jobs page with search params
    navigate(`/jobs?search=${encodeURIComponent(term)}&location=${encodeURIComponent(loc)}`);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-10 animate-fade-in">
              Discover thousands of job opportunities with the perfect companies
            </p>
            
            <div className="animate-fade-in">
              <SearchBar onSearch={handleSearch} className="max-w-4xl mx-auto" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-6 animate-fade-in">
              <Button 
                variant="outline" 
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => navigate("/jobs?category=technology")}
              >
                Technology
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => navigate("/jobs?category=healthcare")}
              >
                Healthcare
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => navigate("/jobs?category=finance")}
              >
                Finance
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => navigate("/jobs?category=government")}
              >
                Government
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2">10K+</p>
              <p className="text-gray-500">Job Listings</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2">5K+</p>
              <p className="text-gray-500">Companies</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2">15M+</p>
              <p className="text-gray-500">Job Seekers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2">95%</p>
              <p className="text-gray-500">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Job Seekers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers everything you need to find and land your dream job
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-job-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Job Search</h3>
              <p className="text-gray-600">
                Find relevant jobs with our AI-powered search that understands your skills and experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-job-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Resume Builder</h3>
              <p className="text-gray-600">
                Create professional, ATS-friendly resumes tailored to your target jobs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-job-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Company Insights</h3>
              <p className="text-gray-600">
                Research potential employers with reviews, salary data, and culture information.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-job-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">One-Click Apply</h3>
              <p className="text-gray-600">
                Apply to jobs quickly and easily with your saved profile and resume.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-job-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Alerts</h3>
              <p className="text-gray-600">
                Get notified instantly when new jobs matching your preferences are posted.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-job-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Insights</h3>
              <p className="text-gray-600">
                Make informed decisions with salary data and career path recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Job Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse jobs by industry to find the perfect role for your skills and experience
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              className="border rounded-lg p-6 text-center hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate("/jobs?category=technology")}
            >
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Laptop className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-1">Technology</h3>
              <p className="text-sm text-gray-500">2,500+ jobs</p>
            </div>
            
            <div 
              className="border rounded-lg p-6 text-center hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate("/jobs?category=healthcare")}
            >
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold mb-1">Healthcare</h3>
              <p className="text-sm text-gray-500">1,800+ jobs</p>
            </div>
            
            <div 
              className="border rounded-lg p-6 text-center hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate("/jobs?category=finance")}
            >
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-1">Finance</h3>
              <p className="text-sm text-gray-500">1,200+ jobs</p>
            </div>
            
            <div 
              className="border rounded-lg p-6 text-center hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate("/jobs?category=marketing")}
            >
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">Marketing</h3>
              <p className="text-sm text-gray-500">950+ jobs</p>
            </div>
            
            <div 
              className="border rounded-lg p-6 text-center hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate("/jobs?category=education")}
            >
              <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-1">Education</h3>
              <p className="text-sm text-gray-500">800+ jobs</p>
            </div>
            
            <div 
              className="border rounded-lg p-6 text-center hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate("/jobs?category=engineering")}
            >
              <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold mb-1">Engineering</h3>
              <p className="text-sm text-gray-500">1,400+ jobs</p>
            </div>
            
            <div 
              className="border rounded-lg p-6 text-center hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate("/jobs?category=government")}
            >
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="font-semibold mb-1">Government</h3>
              <p className="text-sm text-gray-500">600+ jobs</p>
            </div>
            
            <div 
              className="border rounded-lg p-6 text-center hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate("/jobs")}
            >
              <div className="mx-auto w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="font-semibold mb-1">All Categories</h3>
              <p className="text-sm text-gray-500">10,000+ jobs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Dream Job?</h2>
            <p className="text-xl opacity-90 mb-8">
              Create an account to unlock all features and start applying to jobs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                Sign Up Now
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Browse Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
