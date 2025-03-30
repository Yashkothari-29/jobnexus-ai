
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Building, MapPin, Calendar, FileText } from "lucide-react";
import MainLayout from "@/components/MainLayout";

// Demo application data
const applicationData = [
  {
    id: 1,
    jobTitle: "Senior React Developer",
    company: {
      name: "TechNova Solutions",
      logo: "https://placehold.co/80x80?text=TN"
    },
    location: "San Francisco, CA (Remote)",
    appliedDate: "2023-09-10",
    status: "In Progress",
    stage: "Technical Interview",
    upcomingInterviews: [
      {
        date: "2023-10-05",
        time: "11:00 AM PST",
        interviewers: ["John Smith", "Sarah Johnson"],
        type: "Technical"
      }
    ]
  },
  {
    id: 2,
    jobTitle: "UX Designer",
    company: {
      name: "Creative Designs Inc",
      logo: "https://placehold.co/80x80?text=CD"
    },
    location: "Los Angeles, CA (Hybrid)",
    appliedDate: "2023-09-15",
    status: "In Progress",
    stage: "Design Challenge",
    upcomingInterviews: []
  },
  {
    id: 3,
    jobTitle: "Data Analyst",
    company: {
      name: "Financial Insights",
      logo: "https://placehold.co/80x80?text=FI"
    },
    location: "New York, NY (On-site)",
    appliedDate: "2023-09-05",
    status: "Rejected",
    stage: "Final Round",
    upcomingInterviews: []
  },
  {
    id: 4,
    jobTitle: "Product Manager",
    company: {
      name: "Cloud Networx",
      logo: "https://placehold.co/80x80?text=CN"
    },
    location: "Seattle, WA (Remote)",
    appliedDate: "2023-09-20",
    status: "Offered",
    stage: "Offer Extended",
    upcomingInterviews: []
  },
  {
    id: 5,
    jobTitle: "Marketing Specialist",
    company: {
      name: "GreenEco Solutions",
      logo: "https://placehold.co/80x80?text=GE"
    },
    location: "Portland, OR (Hybrid)",
    appliedDate: "2023-09-12",
    status: "In Progress",
    stage: "HR Screening",
    upcomingInterviews: [
      {
        date: "2023-10-02",
        time: "2:00 PM PST",
        interviewers: ["Lisa Greenwood"],
        type: "HR"
      }
    ]
  },
  {
    id: 6,
    jobTitle: "Frontend Developer",
    company: {
      name: "EduLearn Academy",
      logo: "https://placehold.co/80x80?text=EL"
    },
    location: "Chicago, IL (Remote)",
    appliedDate: "2023-09-18",
    status: "In Progress",
    stage: "Application Review",
    upcomingInterviews: []
  }
];

// Saved jobs data
const savedJobsData = [
  {
    id: 101,
    jobTitle: "Full Stack Developer",
    company: {
      name: "TechNova Solutions",
      logo: "https://placehold.co/80x80?text=TN"
    },
    location: "San Francisco, CA (Remote)",
    postedDate: "2023-09-22",
    salary: "$120,000 - $150,000",
    isActive: true
  },
  {
    id: 102,
    jobTitle: "UI/UX Designer",
    company: {
      name: "Creative Designs Inc",
      logo: "https://placehold.co/80x80?text=CD"
    },
    location: "Los Angeles, CA (Hybrid)",
    postedDate: "2023-09-20",
    salary: "$90,000 - $110,000",
    isActive: true
  },
  {
    id: 103,
    jobTitle: "Data Scientist",
    company: {
      name: "Financial Insights",
      logo: "https://placehold.co/80x80?text=FI"
    },
    location: "New York, NY (On-site)",
    postedDate: "2023-09-15",
    salary: "$130,000 - $160,000",
    isActive: false
  },
  {
    id: 104,
    jobTitle: "DevOps Engineer",
    company: {
      name: "Cloud Networx",
      logo: "https://placehold.co/80x80?text=CN"
    },
    location: "Seattle, WA (Remote)",
    postedDate: "2023-09-18",
    salary: "$115,000 - $140,000",
    isActive: true
  }
];

const ApplicationsPage = () => {
  const [activeApplications, setActiveApplications] = useState(
    applicationData.filter(app => app.status !== "Rejected")
  );
  const [archivedApplications, setArchivedApplications] = useState(
    applicationData.filter(app => app.status === "Rejected")
  );
  const [savedJobs, setSavedJobs] = useState(savedJobsData);

  // Handle removing a saved job
  const handleRemoveSavedJob = (jobId) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
  };

  // Handle archiving an application
  const handleArchiveApplication = (appId) => {
    const appToArchive = activeApplications.find(app => app.id === appId);
    if (appToArchive) {
      setActiveApplications(activeApplications.filter(app => app.id !== appId));
      setArchivedApplications([...archivedApplications, {...appToArchive, status: "Archived"}]);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">My Applications</h1>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active Applications</TabsTrigger>
            <TabsTrigger value="archived">Archived Applications</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="space-y-4">
              {activeApplications.length > 0 ? (
                activeApplications.map(application => (
                  <ApplicationCard 
                    key={application.id} 
                    application={application} 
                    onArchive={() => handleArchiveApplication(application.id)}
                  />
                ))
              ) : (
                <EmptyState 
                  icon={<FileText className="h-12 w-12 text-gray-400" />}
                  title="No active applications"
                  description="You haven't applied to any jobs yet. Start exploring available jobs and apply today!"
                  actionLabel="Browse Jobs"
                  actionLink="/jobs"
                  actionHref={null}
                />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="archived">
            <div className="space-y-4">
              {archivedApplications.length > 0 ? (
                archivedApplications.map(application => (
                  <ApplicationCard 
                    key={application.id} 
                    application={application} 
                    archived
                    onArchive={() => {}} // Empty function to satisfy the prop requirement
                  />
                ))
              ) : (
                <EmptyState 
                  icon={<FileText className="h-12 w-12 text-gray-400" />}
                  title="No archived applications"
                  description="You don't have any archived job applications. Applications that are rejected or that you archive will appear here."
                  actionLabel="View Active Applications"
                  actionHref="#active"
                  actionLink={null}
                />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="saved">
            <div className="space-y-4">
              {savedJobs.length > 0 ? (
                savedJobs.map(job => (
                  <SavedJobCard 
                    key={job.id} 
                    job={job} 
                    onRemove={() => handleRemoveSavedJob(job.id)}
                  />
                ))
              ) : (
                <EmptyState 
                  icon={<FileText className="h-12 w-12 text-gray-400" />}
                  title="No saved jobs"
                  description="You haven't saved any jobs yet. Browse jobs and save the ones that interest you for later application."
                  actionLabel="Browse Jobs"
                  actionLink="/jobs"
                  actionHref={null}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Application Card Component
const ApplicationCard = ({ application, onArchive, archived = false }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "In Progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "Offered":
        return <Badge className="bg-green-500">Offered</Badge>;
      case "Rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      case "Archived":
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center gap-3 mb-3 md:mb-0">
            <img 
              src={application.company.logo} 
              alt={`${application.company.name} logo`} 
              className="w-12 h-12 rounded" 
            />
            <div>
              <h3 className="font-semibold text-lg">{application.jobTitle}</h3>
              <div className="flex items-center text-gray-500 text-sm">
                <Building className="h-3.5 w-3.5 mr-1" />
                <span>{application.company.name}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            {getStatusBadge(application.status)}
            {!archived && application.status !== "Rejected" && (
              <Button variant="outline" size="sm" onClick={onArchive}>
                Archive
              </Button>
            )}
            <Button size="sm">View Details</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span>{application.location}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>Applied on {formatDate(application.appliedDate)}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <span>Stage: {application.stage}</span>
          </div>
        </div>
        
        {application.upcomingInterviews && application.upcomingInterviews.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
            <h4 className="font-medium text-sm mb-2 text-blue-700">Upcoming Interview</h4>
            {application.upcomingInterviews.map((interview, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm">
                  <span className="font-medium">{interview.type} Interview</span>
                  <span className="text-gray-600"> with </span>
                  <span>{interview.interviewers.join(", ")}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1 sm:mt-0">
                  {interview.date} at {interview.time}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Saved Job Card Component
const SavedJobCard = ({ job, onRemove }) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center gap-3 mb-3 md:mb-0">
            <img 
              src={job.company.logo} 
              alt={`${job.company.name} logo`} 
              className="w-12 h-12 rounded" 
            />
            <div>
              <h3 className="font-semibold text-lg">{job.jobTitle}</h3>
              <div className="flex items-center text-gray-500 text-sm">
                <Building className="h-3.5 w-3.5 mr-1" />
                <span>{job.company.name}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            {job.isActive ? (
              <Badge className="bg-green-500">Active</Badge>
            ) : (
              <Badge variant="outline">No longer active</Badge>
            )}
            <Button variant="outline" size="sm" onClick={onRemove}>
              Unsave
            </Button>
            <Button size="sm">Apply Now</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>Posted on {formatDate(job.postedDate)}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
            <span>{job.salary}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ icon, title, description, actionLabel, actionLink, actionHref }) => {
  return (
    <div className="text-center py-10 border rounded-lg bg-white">
      <div className="mx-auto mb-3">{icon}</div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      {actionLink ? (
        <Button asChild>
          <a href={actionLink}>{actionLabel}</a>
        </Button>
      ) : (
        <Button asChild>
          <a href={actionHref}>{actionLabel}</a>
        </Button>
      )}
    </div>
  );
};

// Helper function to format dates
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Component imports missing in the original code
const DollarSign = ({ className }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
};

export default ApplicationsPage;
