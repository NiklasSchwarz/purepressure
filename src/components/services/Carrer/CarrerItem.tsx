export interface Job {
    job_title: string;
    description: string;
    tasks: string[];
    skills: string[];
    benefits: string[];
  }
  
  export interface JobsData {
    jobs: Job[];
  }
  