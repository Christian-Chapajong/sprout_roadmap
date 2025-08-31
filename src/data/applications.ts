export type Application = {
  id: number;
  company: string;
  stage: string;        // e.g. "Online application"
  progress: number;     // e.g. 3
  total: number;        // e.g. 6
  logo: string;         // company logo URL
  progressWidth?: string; // kept optional for backward-compat
  isLarge?: boolean;
};

// Default applications data
const DEFAULT_APPLICATIONS: Application[] = [
  {
    id: 1,
    company: "Amazon",
    stage: "Online application",
    progress: 3,
    total: 6,
    progressWidth: "w-40",
    logo: "https://c.animaapp.com/rpS1h8ci/img/image-4@2x.png",
  },
  {
    id: 2,
    company: "EY",
    stage: "Assessment centre",
    progress: 5,
    total: 6,
    progressWidth: "w-[257px]",
    logo: "https://c.animaapp.com/rpS1h8ci/img/image-3@2x.png",
  },
  {
    id: 3,
    company: "Goldman Sachs",
    stage: "Offer received",
    progress: 6,
    total: 6,
    progressWidth: "w-[302px]",
    logo: "https://c.animaapp.com/rpS1h8ci/img/image-1@2x.png",
  },
  {
    id: 4,
    company: "BT",
    stage: "Online assessments",
    progress: 4,
    total: 6,
    progressWidth: "w-[200px]",
    logo: "https://c.animaapp.com/rpS1h8ci/img/image-2@2x.png",
  },
  {
    id: 5,
    company: "Jaguar Land Rover",
    stage: "Assessment centre",
    progress: 5,
    total: 6,
    progressWidth: "w-64",
    logo: "https://c.animaapp.com/rpS1h8ci/img/image-7@2x.png",
  },
  {
    id: 6,
    company: "Accenture",
    stage: "Video Interview",
    progress: 4,
    total: 6,
    progressWidth: "w-[201px]",
    logo: "https://c.animaapp.com/rpS1h8ci/img/image-5@2x.png",
  },
  {
    id: 7,
    company: "A&O Shearman",
    stage: "Online application",
    progress: 3,
    total: 6,
    progressWidth: "w-[158px]",
    logo: "https://c.animaapp.com/rpS1h8ci/img/image-8@2x.png",
    isLarge: true,
  },
  {
    id: 8,
    company: "Rolls Royce",
    stage: "Offer received",
    progress: 6,
    total: 6,
    progressWidth: "w-[301px]",
    logo: "https://c.animaapp.com/rpS1h8ci/img/image-6@2x.png",
  },
];

// Helper function to get applications from localStorage or default
export const getApplications = (): Application[] => {
  if (typeof window === 'undefined') return DEFAULT_APPLICATIONS;
  
  try {
    const stored = localStorage.getItem('sprout_applications');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load applications from localStorage:', error);
  }
  
  return DEFAULT_APPLICATIONS;
};

// Helper function to save applications to localStorage
export const saveApplications = (applications: Application[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('sprout_applications', JSON.stringify(applications));
  } catch (error) {
    console.warn('Failed to save applications to localStorage:', error);
  }
};

// Helper function to add a new application
export const addApplication = (newApp: Omit<Application, "id">): Application => {
  const applications = getApplications();
  const maxId = applications.length > 0 ? Math.max(...applications.map(app => app.id)) : 0;
  const application: Application = {
    ...newApp,
    id: maxId + 1,
  };
  
  const updatedApplications = [...applications, application];
  saveApplications(updatedApplications);
  
  return application;
};

// Export for backward compatibility
export const APPLICATIONS = getApplications();
