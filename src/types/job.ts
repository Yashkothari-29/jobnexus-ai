
export interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
  };
  location: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  experience: 'entry' | 'mid' | 'senior' | 'executive';
  workMode: 'remote' | 'on-site' | 'hybrid';
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedAt: string;
  applicationDeadline?: string;
  industry: string;
  isSaved?: boolean;
  isApplied?: boolean;
}

export type JobCategory = 
  | 'all'
  | 'technology'
  | 'healthcare'
  | 'finance'
  | 'education'
  | 'marketing'
  | 'engineering'
  | 'government'
  | 'retail'
  | 'hospitality';

export type JobSortOption = 
  | 'relevance'
  | 'latest'
  | 'salary-high'
  | 'salary-low';

export interface JobFilter {
  search: string;
  location: string;
  workMode: string[];
  experience: string[];
  type: string[];
  category: JobCategory;
  minSalary?: number;
}
