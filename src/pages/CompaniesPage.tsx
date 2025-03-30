
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Building, Users, Briefcase } from "lucide-react";
import MainLayout from "@/components/MainLayout";

// Demo company data
const companiesData = [
  {
    id: 1,
    name: "TechNova Solutions",
    logo: "https://placehold.co/80x80?text=TN",
    industry: "Technology",
    location: "San Francisco, CA",
    size: "1000-5000 employees",
    description: "Leading provider of innovative software solutions focusing on AI and machine learning technologies.",
    openPositions: 12,
    rating: 4.5,
    featured: true
  },
  {
    id: 2,
    name: "HealthCare Plus",
    logo: "https://placehold.co/80x80?text=HC+",
    industry: "Healthcare",
    location: "Boston, MA",
    size: "5000-10000 employees",
    description: "A healthcare company dedicated to improving patient outcomes through innovative medical technologies.",
    openPositions: 8,
    rating: 4.2,
    featured: true
  },
  {
    id: 3,
    name: "Financial Insights",
    logo: "https://placehold.co/80x80?text=FI",
    industry: "Finance",
    location: "New York, NY",
    size: "500-1000 employees",
    description: "Providing financial analysis and investment strategies for businesses and individuals.",
    openPositions: 5,
    rating: 4.0,
    featured: false
  },
  {
    id: 4,
    name: "EduLearn Academy",
    logo: "https://placehold.co/80x80?text=EL",
    industry: "Education",
    location: "Chicago, IL",
    size: "100-500 employees",
    description: "An educational institution focused on online learning and professional development programs.",
    openPositions: 3,
    rating: 4.3,
    featured: false
  },
  {
    id: 5,
    name: "GreenEco Solutions",
    logo: "https://placehold.co/80x80?text=GE",
    industry: "Environmental Services",
    location: "Portland, OR",
    size: "100-500 employees",
    description: "Developing sustainable solutions for environmental challenges and promoting eco-friendly practices.",
    openPositions: 6,
    rating: 4.1,
    featured: false
  },
  {
    id: 6,
    name: "Creative Designs Inc",
    logo: "https://placehold.co/80x80?text=CD",
    industry: "Marketing & Design",
    location: "Los Angeles, CA",
    size: "50-100 employees",
    description: "A creative agency specializing in branding, marketing, and web design services.",
    openPositions: 4,
    rating: 4.4,
    featured: true
  },
  {
    id: 7,
    name: "Cloud Networx",
    logo: "https://placehold.co/80x80?text=CN",
    industry: "Technology",
    location: "Seattle, WA",
    size: "1000-5000 employees",
    description: "Providing cloud infrastructure and networking solutions for businesses of all sizes.",
    openPositions: 15,
    rating: 4.6,
    featured: true
  },
  {
    id: 8,
    name: "Global Logistics Partners",
    logo: "https://placehold.co/80x80?text=GLP",
    industry: "Transportation & Logistics",
    location: "Miami, FL",
    size: "1000-5000 employees",
    description: "Specializing in global supply chain management and logistics solutions.",
    openPositions: 7,
    rating: 3.9,
    featured: false
  }
];

// Industries for filtering
const industries = [
  "All Industries",
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Marketing & Design",
  "Environmental Services",
  "Transportation & Logistics"
];

const CompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [filteredCompanies, setFilteredCompanies] = useState(companiesData);

  // Filter companies based on search term and industry
  const handleSearch = () => {
    let results = [...companiesData];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(company => 
        company.name.toLowerCase().includes(term) || 
        company.description.toLowerCase().includes(term) ||
        company.location.toLowerCase().includes(term)
      );
    }
    
    if (selectedIndustry !== "All Industries") {
      results = results.filter(company => company.industry === selectedIndustry);
    }
    
    setFilteredCompanies(results);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Explore Companies</h1>
        
        {/* Search and filter section */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <select 
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
            
            <Button onClick={handleSearch} className="h-10">
              <Search className="mr-2 h-4 w-4" />
              Search Companies
            </Button>
          </div>
        </div>
        
        {/* Featured companies section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Featured Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies
              .filter(company => company.featured)
              .map(company => (
                <CompanyCard key={company.id} company={company} />
              ))}
          </div>
        </div>
        
        {/* All companies section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies
              .filter(company => !company.featured)
              .map(company => (
                <CompanyCard key={company.id} company={company} />
              ))}
          </div>
          
          {filteredCompanies.length === 0 && (
            <div className="text-center py-12 border rounded-lg">
              <Building className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium mb-2">No companies found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedIndustry("All Industries");
                  setFilteredCompanies(companiesData);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

// Company Card Component
const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-4 flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img 
            src={company.logo} 
            alt={`${company.name} logo`} 
            className="w-16 h-16 rounded" 
          />
        </div>
        <div>
          <h3 className="font-medium text-lg">{company.name}</h3>
          <div className="flex items-center text-gray-500 text-sm mb-1">
            <Building className="h-3.5 w-3.5 mr-1" />
            <span>{company.industry}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{company.location}</span>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-3">
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {company.description}
        </p>
        
        <div className="flex justify-between items-center border-t pt-3">
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span>{company.size}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm font-medium">
            <Briefcase className="h-3.5 w-3.5 mr-1 text-blue-600" />
            <span className="text-blue-600">{company.openPositions} open jobs</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-4 py-3 border-t">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => window.location.href = `/jobs?company=${company.name}`}
        >
          View Company
        </Button>
      </div>
    </div>
  );
};

export default CompaniesPage;
