
import { useState } from "react";
import { Search, MapPin, Filter, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (searchTerm: string, location: string) => void;
  onToggleFilters?: () => void;
  className?: string;
}

const SearchBar = ({ onSearch, onToggleFilters, className }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, location);
  };

  return (
    <div className={cn("w-full", className)}>
      <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border p-1 flex flex-col md:flex-row gap-2"
      >
        <div className="relative flex-1 flex items-center">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Job title, keywords, or company"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative flex-1 flex items-center">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="City, state, or remote"
            className="search-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          {onToggleFilters && (
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={onToggleFilters}
              className="hidden md:flex"
            >
              <Filter className="h-5 w-5" />
            </Button>
          )}
          <Button type="submit" className="flex-1 md:flex-none gap-2">
            <Search className="h-4 w-4" />
            <span>Search Jobs</span>
          </Button>
        </div>
      </form>
      
      {onToggleFilters && (
        <div className="mt-3 md:hidden">
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={onToggleFilters}
          >
            <Filter className="h-4 w-4 mr-2" />
            <span>Filters</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
