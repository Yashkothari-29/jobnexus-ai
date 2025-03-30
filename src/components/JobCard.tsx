
import { Job } from "@/types/job";
import { BookmarkIcon, Briefcase, Clock, DollarSign, Globe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface JobCardProps {
  job: Job;
  onSave?: (job: Job) => void;
  onApply?: (job: Job) => void;
}

const JobCard = ({ job, onSave, onApply }: JobCardProps) => {
  const [isSaved, setIsSaved] = useState(job.isSaved || false);
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    if (onSave) onSave(job);
  };

  const workModeIcon = () => {
    switch (job.workMode) {
      case 'remote':
        return <Globe className="h-4 w-4" />;
      case 'hybrid':
        return <Globe className="h-4 w-4" />;
      case 'on-site':
        return <MapPin className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
  };

  return (
    <div className="job-card group animate-fade-in">
      <div className="absolute right-4 top-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full" 
          onClick={handleSave}
          aria-label={isSaved ? "Unsave job" : "Save job"}
        >
          <BookmarkIcon 
            className={cn(
              "h-5 w-5", 
              isSaved ? "fill-job-blue text-job-blue" : "text-gray-400"
            )} 
          />
        </Button>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded flex-shrink-0 bg-gray-100 flex items-center justify-center">
          {job.company.logo ? (
            <img 
              src={job.company.logo} 
              alt={`${job.company.name} logo`} 
              className="h-8 w-8 object-contain"
            />
          ) : (
            <Briefcase className="h-6 w-6 text-gray-400" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="job-card-title">{job.title}</h3>
          <p className="job-card-company">
            <span>{job.company.name}</span>
          </p>
          
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4">
            <div className="job-card-detail">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="job-card-detail">
              {workModeIcon()}
              <span>{job.workMode}</span>
            </div>
            <div className="job-card-detail">
              <DollarSign className="h-4 w-4" />
              <span>{job.salary}</span>
            </div>
            <div className="job-card-detail">
              <Clock className="h-4 w-4" />
              <span>Posted {formatDate(job.postedAt)}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="job-tag job-tag-primary">
              {job.type}
            </Badge>
            <Badge variant="outline" className="job-tag job-tag-success">
              {job.experience}
            </Badge>
            <Badge variant="outline" className="job-tag">
              {job.industry}
            </Badge>
          </div>
          
          <div className="flex gap-3 mt-4">
            <Button 
              variant="default" 
              className="flex-1"
              onClick={() => onApply && onApply(job)}
              disabled={job.isApplied}
            >
              {job.isApplied ? "Applied" : "Apply Now"}
            </Button>
            <Button variant="outline" className="flex-1">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
