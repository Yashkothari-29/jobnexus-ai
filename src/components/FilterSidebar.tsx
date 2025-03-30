
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { JobFilter } from "@/types/job";
import { X } from "lucide-react";

interface FilterSidebarProps {
  filters: JobFilter;
  onFilterChange: (filters: JobFilter) => void;
  onClose?: () => void;
  className?: string;
}

const workModeOptions = [
  { id: "remote", label: "Remote" },
  { id: "hybrid", label: "Hybrid" },
  { id: "on-site", label: "On-site" },
];

const experienceLevelOptions = [
  { id: "entry", label: "Entry Level" },
  { id: "mid", label: "Mid Level" },
  { id: "senior", label: "Senior Level" },
  { id: "executive", label: "Executive" },
];

const jobTypeOptions = [
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "contract", label: "Contract" },
  { id: "internship", label: "Internship" },
  { id: "freelance", label: "Freelance" },
];

const categoryOptions = [
  { id: "all", label: "All Categories" },
  { id: "technology", label: "Technology" },
  { id: "healthcare", label: "Healthcare" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
  { id: "marketing", label: "Marketing" },
  { id: "engineering", label: "Engineering" },
  { id: "government", label: "Government" },
];

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClose,
  className 
}: FilterSidebarProps) => {
  const [salaryRange, setSalaryRange] = useState<number[]>([50]);

  const toggleArrayFilter = (
    filterName: "workMode" | "experience" | "type",
    value: string
  ) => {
    const currentValues = filters[filterName];
    let newValues;
    
    if (Array.isArray(currentValues)) {
      if (currentValues.includes(value)) {
        newValues = currentValues.filter((item) => item !== value);
      } else {
        newValues = [...currentValues, value];
      }
    } else {
      newValues = [value];
    }
    
    onFilterChange({
      ...filters,
      [filterName]: newValues,
    });
  };

  const handleCategoryChange = (value: string) => {
    onFilterChange({
      ...filters,
      category: value as any,
    });
  };

  const handleMinSalaryChange = (values: number[]) => {
    setSalaryRange(values);
    onFilterChange({
      ...filters,
      minSalary: values[0] * 1000,
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      search: "",
      location: "",
      workMode: [],
      experience: [],
      type: [],
      category: "all",
    });
    setSalaryRange([50]);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <div className="space-y-6">
        <Accordion type="multiple" defaultValue={["workMode", "experience", "type", "category", "salary"]}>
          <AccordionItem value="workMode">
            <AccordionTrigger>Work Mode</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {workModeOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`workMode-${option.id}`}
                      checked={filters.workMode.includes(option.id)}
                      onCheckedChange={() =>
                        toggleArrayFilter("workMode", option.id)
                      }
                    />
                    <Label htmlFor={`workMode-${option.id}`} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="experience">
            <AccordionTrigger>Experience Level</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {experienceLevelOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`experience-${option.id}`}
                      checked={filters.experience.includes(option.id)}
                      onCheckedChange={() =>
                        toggleArrayFilter("experience", option.id)
                      }
                    />
                    <Label htmlFor={`experience-${option.id}`} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="type">
            <AccordionTrigger>Job Type</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {jobTypeOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${option.id}`}
                      checked={filters.type.includes(option.id)}
                      onCheckedChange={() =>
                        toggleArrayFilter("type", option.id)
                      }
                    />
                    <Label htmlFor={`type-${option.id}`} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categoryOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${option.id}`}
                      checked={filters.category === option.id}
                      onCheckedChange={() => handleCategoryChange(option.id)}
                    />
                    <Label htmlFor={`category-${option.id}`} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="salary">
            <AccordionTrigger>Minimum Salary</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider
                  value={salaryRange}
                  onValueChange={handleMinSalaryChange}
                  max={200}
                  step={10}
                  className="my-4"
                />
                <div className="flex justify-between">
                  <span>$0k</span>
                  <span className="font-medium">${salaryRange[0]}k+</span>
                  <span>$200k+</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
