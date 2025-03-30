
import { useState } from "react";
import { Search, Filter, Clock, DollarSign, MapPin, Briefcase, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MainLayout from "@/components/MainLayout";

// Demo freelance projects data
const freelanceProjectsData = [
  {
    id: 1,
    title: "Website Redesign for E-commerce Platform",
    description: "Looking for an experienced web designer to revamp our e-commerce website with a modern, user-friendly interface that enhances customer experience and increases conversion rates.",
    category: "Web Design",
    budget: "$2000-$3000",
    duration: "4-6 weeks",
    skills: ["UI/UX Design", "HTML", "CSS", "JavaScript", "Responsive Design"],
    location: "Remote",
    postedDate: "2023-09-15",
    clientRating: 4.8,
    clientReviews: 12,
    featured: true
  },
  {
    id: 2,
    title: "Mobile App Development for Fitness Tracking",
    description: "Need a skilled mobile developer to create a fitness tracking app for iOS and Android platforms. The app should track workouts, nutrition, and provide personalized recommendations.",
    category: "Mobile Development",
    budget: "$5000-$8000",
    duration: "2-3 months",
    skills: ["React Native", "iOS", "Android", "API Integration", "UI Design"],
    location: "Remote",
    postedDate: "2023-09-18",
    clientRating: 4.5,
    clientReviews: 8,
    featured: true
  },
  {
    id: 3,
    title: "Content Writing for Technology Blog",
    description: "Seeking a content writer with expertise in technology to create engaging blog posts about emerging tech trends, AI developments, and digital transformation.",
    category: "Content Writing",
    budget: "$50-$100 per article",
    duration: "Ongoing",
    skills: ["Technology Writing", "SEO", "Blog Writing", "Research"],
    location: "Remote",
    postedDate: "2023-09-20",
    clientRating: 4.7,
    clientReviews: 15,
    featured: false
  },
  {
    id: 4,
    title: "Logo Design for New Startup",
    description: "Looking for a creative graphic designer to create a modern, memorable logo for our tech startup. The logo should reflect innovation and reliability.",
    category: "Graphic Design",
    budget: "$500-$800",
    duration: "1-2 weeks",
    skills: ["Logo Design", "Adobe Illustrator", "Brand Identity", "Creativity"],
    location: "Remote",
    postedDate: "2023-09-22",
    clientRating: 4.2,
    clientReviews: 6,
    featured: false
  },
  {
    id: 5,
    title: "Social Media Marketing Campaign",
    description: "Need a social media marketing expert to develop and execute a comprehensive marketing campaign across multiple platforms to increase brand awareness and engagement.",
    category: "Digital Marketing",
    budget: "$1500-$2500",
    duration: "1 month",
    skills: ["Social Media Marketing", "Content Creation", "Analytics", "Campaign Management"],
    location: "Remote",
    postedDate: "2023-09-25",
    clientRating: 4.9,
    clientReviews: 20,
    featured: true
  },
  {
    id: 6,
    title: "Data Analysis for E-commerce Sales",
    description: "Seeking a data analyst to analyze our e-commerce sales data, identify trends, and provide actionable insights to improve business performance.",
    category: "Data Analysis",
    budget: "$1000-$1500",
    duration: "2-3 weeks",
    skills: ["Data Analysis", "Excel", "Python", "Visualization", "Statistical Analysis"],
    location: "Remote",
    postedDate: "2023-09-28",
    clientRating: 4.6,
    clientReviews: 10,
    featured: false
  }
];

// Categories for filtering
const categories = [
  "All Categories",
  "Web Design",
  "Mobile Development",
  "Content Writing",
  "Graphic Design",
  "Digital Marketing",
  "Data Analysis"
];

const FreelancePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filteredProjects, setFilteredProjects] = useState(freelanceProjectsData);

  // Filter projects based on search term and category
  const handleSearch = () => {
    let results = [...freelanceProjectsData];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(project => 
        project.title.toLowerCase().includes(term) || 
        project.description.toLowerCase().includes(term) ||
        project.skills.some(skill => skill.toLowerCase().includes(term))
      );
    }
    
    if (selectedCategory !== "All Categories") {
      results = results.filter(project => project.category === selectedCategory);
    }
    
    setFilteredProjects(results);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Freelance Projects</h1>
        
        {/* Search and filter section */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                placeholder="Search projects, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <select 
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <Button onClick={handleSearch} className="h-10">
              <Filter className="mr-2 h-4 w-4" />
              Filter Projects
            </Button>
          </div>
        </div>
        
        {/* Featured projects section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects
              .filter(project => project.featured)
              .map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </div>
        
        {/* All projects section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects
              .filter(project => !project.featured)
              .map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12 border rounded-lg">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All Categories");
                  setFilteredProjects(freelanceProjectsData);
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

// Project Card Component
const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <Badge variant={project.featured ? "default" : "outline"} className="text-xs">
            {project.category}
          </Badge>
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{project.clientRating}</span>
            <span className="text-xs text-gray-500 ml-1">({project.clientReviews} reviews)</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs font-normal">
              {skill}
            </Badge>
          ))}
          {project.skills.length > 4 && (
            <Badge variant="secondary" className="text-xs font-normal">
              +{project.skills.length - 4} more
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>{project.budget}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>{project.duration}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>Posted {formatDate(project.postedDate)}</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button className="flex-1">Apply Now</Button>
          <Button variant="outline" className="flex-1">Save Project</Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return "1 day ago";
  } else if (diffDays < 30) {
    return `${diffDays} days ago`;
  } else {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  }
};

export default FreelancePage;
