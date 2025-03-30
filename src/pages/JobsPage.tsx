
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FilterX, SlidersHorizontal } from "lucide-react";

import MainLayout from "@/components/MainLayout";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import JobList from "@/components/JobList";
import { Button } from "@/components/ui/button";
import { Job, JobCategory, JobFilter } from "@/types/job";
import { jobs as jobsData } from "@/data/jobs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const JobsPage = () => {
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Get search params from URL
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('search') || '';
  const locationParam = queryParams.get('location') || '';
  const categoryParam = queryParams.get('category') as JobCategory || 'all';
  
  // Filter state
  const [filters, setFilters] = useState<JobFilter>({
    search: searchParam,
    location: locationParam,
    workMode: [],
    experience: [],
    type: [],
    category: categoryParam,
  });
  
  // Filtered jobs state
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobsData);
  
  // Side filter visibility (for mobile)
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.location) params.set('location', filters.location);
    if (filters.category && filters.category !== 'all') params.set('category', filters.category);
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
    
    // Apply filters to jobs
    let result = [...jobsData];
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchLower) || 
        job.company.name.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by location
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      result = result.filter(job => 
        job.location.toLowerCase().includes(locationLower) || 
        (locationLower === 'remote' && job.workMode === 'remote')
      );
    }
    
    // Filter by work mode
    if (filters.workMode.length > 0) {
      result = result.filter(job => filters.workMode.includes(job.workMode));
    }
    
    // Filter by experience
    if (filters.experience.length > 0) {
      result = result.filter(job => filters.experience.includes(job.experience));
    }
    
    // Filter by job type
    if (filters.type.length > 0) {
      result = result.filter(job => filters.type.includes(job.type));
    }
    
    // Filter by category
    if (filters.category && filters.category !== 'all') {
      result = result.filter(job => job.industry === filters.category);
    }
    
    // Filter by minimum salary
    if (filters.minSalary) {
      result = result.filter(job => {
        // Extract the higher number in the salary range
        const matches = job.salary.match(/\$(\d+),(\d+)/g);
        if (!matches) return false;
        const lowerSalary = parseInt(matches[0].replace(/\$|,/g, ""));
        return lowerSalary >= (filters.minSalary || 0);
      });
    }
    
    setFilteredJobs(result);
  }, [filters]);
  
  // Handle search form submission
  const handleSearch = (searchTerm: string, location: string) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm,
      location: location
    }));
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters: JobFilter) => {
    setFilters(newFilters);
  };
  
  // Handle save job
  const handleSaveJob = (job: Job) => {
    const updatedJobs = filteredJobs.map(j => 
      j.id === job.id ? { ...j, isSaved: !j.isSaved } : j
    );
    setFilteredJobs(updatedJobs);
  };
  
  // Handle apply to job
  const handleApplyJob = (job: Job) => {
    const updatedJobs = filteredJobs.map(j => 
      j.id === job.id ? { ...j, isApplied: true } : j
    );
    setFilteredJobs(updatedJobs);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Find Jobs</h1>
          <SearchBar 
            onSearch={handleSearch} 
            onToggleFilters={() => setFiltersVisible(!filtersVisible)}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="w-full md:w-64 lg:w-72 hidden md:block">
            <FilterSidebar 
              filters={filters} 
              onFilterChange={handleFilterChange}
            />
          </aside>
          
          {/* Mobile Filter Sidebar (Sheet/Drawer) */}
          {isMobile && (
            <Sheet open={filtersVisible} onOpenChange={setFiltersVisible}>
              <SheetContent side="left" className="w-full sm:max-w-md">
                <FilterSidebar 
                  filters={filters} 
                  onFilterChange={handleFilterChange}
                  onClose={() => setFiltersVisible(false)}
                />
              </SheetContent>
            </Sheet>
          )}
          
          {/* Jobs Content */}
          <div className="flex-1">
            {/* Filter Tags (for active filters) */}
            {(filters.workMode.length > 0 || filters.experience.length > 0 || filters.type.length > 0 || filters.minSalary) && (
              <div className="mb-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600">Active filters:</span>
                
                {filters.workMode.map(mode => (
                  <Button
                    key={mode}
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-xs"
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        workMode: prev.workMode.filter(m => m !== mode)
                      }));
                    }}
                  >
                    {mode}
                    <FilterX className="h-3 w-3" />
                  </Button>
                ))}
                
                {filters.experience.map(exp => (
                  <Button
                    key={exp}
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-xs"
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        experience: prev.experience.filter(e => e !== exp)
                      }));
                    }}
                  >
                    {exp}
                    <FilterX className="h-3 w-3" />
                  </Button>
                ))}
                
                {filters.type.map(type => (
                  <Button
                    key={type}
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-xs"
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        type: prev.type.filter(t => t !== type)
                      }));
                    }}
                  >
                    {type}
                    <FilterX className="h-3 w-3" />
                  </Button>
                ))}
                
                {filters.minSalary && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-xs"
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        minSalary: undefined
                      }));
                    }}
                  >
                    ${filters.minSalary / 1000}k+
                    <FilterX className="h-3 w-3" />
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs underline"
                  onClick={() => {
                    setFilters(prev => ({
                      ...prev,
                      workMode: [],
                      experience: [],
                      type: [],
                      minSalary: undefined
                    }));
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
            
            {/* Job List */}
            <JobList 
              jobs={filteredJobs} 
              onSaveJob={handleSaveJob}
              onApplyJob={handleApplyJob}
            />
            
            {/* Show when no jobs match filters */}
            {filteredJobs.length === 0 && (
              <div className="border rounded-lg p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">No jobs match your criteria</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search filters for more results</p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({
                    search: '',
                    location: '',
                    workMode: [],
                    experience: [],
                    type: [],
                    category: 'all'
                  })}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobsPage;
