export type HeardAboutUsOption = 
  | 'linkedin'
  | 'friend_referral'
  | 'employee_referral'
  | 'other_social'
  | 'google_search'
  | 'other';

export interface Application {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  heardAboutUs: HeardAboutUsOption;
  heardAboutUsOther?: string;
  cvUrl?: string;
  cvFileName?: string;
  motivation: string;
  proudProject: string;
  dreamProject: string;
  technologies: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  submittedAt: Date;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
}

export interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  heardAboutUs: HeardAboutUsOption;
  heardAboutUsOther?: string;
  cvUrl?: string;
  cvFileName?: string;
  motivation: string;
  proudProject: string;
  dreamProject: string;
  technologies: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}