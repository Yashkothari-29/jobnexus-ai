
import { useState } from "react";
import { Job, JobSortOption } from "@/types/job";
import JobCard from "./JobCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface JobListProps {
  jobs: Job[];
  onSaveJob?: (job: Job) => void;
  onApplyJob?: (job: Job) => void;
}

const JobList = ({ jobs, onSaveJob, onApplyJob }: JobListProps) => {
  const [sortOption, setSortOption] = useState<JobSortOption>("relevance");
  const { toast } = useToast();

  // Apply sorting to the job list
  const sortedJobs = [...jobs].sort((a, b) => {
    switch (sortOption) {
      case "latest":
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      case "salary-high":
        // Extract and compare the higher number in the salary range
        const getHighSalary = (salary: string) => {
          const matches = salary.match(/\$(\d+),(\d+)/g);
          if (!matches) return 0;
          return parseInt(matches[matches.length - 1].replace(/\$|,/g, ""));
        };
        return getHighSalary(b.salary) - getHighSalary(a.salary);
      case "salary-low":
        // Extract and compare the lower number in the salary range
        const getLowSalary = (salary: string) => {
          const matches = salary.match(/\$(\d+),(\d+)/g);
          if (!matches) return 0;
          return parseInt(matches[0].replace(/\$|,/g, ""));
        };
        return getLowSalary(a.salary) - getLowSalary(b.salary);
      case "relevance":
      default:
        return 0; // Keep original order for relevance
    }
  });

  const handleSaveJob = (job: Job) => {
    if (onSaveJob) {
      onSaveJob(job);
    }
    
    toast({
      title: job.isSaved ? "Job removed from saved list" : "Job saved for later",
      description: job.isSaved 
        ? "You can add it back anytime" 
        : "You can view it in your saved jobs",
    });
  };

  const handleApplyJob = (job: Job) => {
    if (onApplyJob) {
      onApplyJob(job);
    }
    
    toast({
      title: "Application submitted!",
      description: `Your application for ${job.title} at ${job.company.name} has been submitted.`,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <p className="text-sm text-gray-500">
          {jobs.length} {jobs.length === 1 ? "job" : "jobs"} found
        </p>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
          <Select value={sortOption} onValueChange={(value) => setSortOption(value as JobSortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="latest">Most Recent</SelectItem>
              <SelectItem value="salary-high">Highest Salary</SelectItem>
              <SelectItem value="salary-low">Lowest Salary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {sortedJobs.length > 0 ? (
          sortedJobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job} 
              onSave={handleSaveJob}
              onApply={handleApplyJob}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
