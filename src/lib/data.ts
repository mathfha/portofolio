import siteConfigData from "@data/site-config.json";
import experienceData from "@data/experience.json";
import projectsData from "@data/projects.json";
import skillsData from "@data/skills.json";
import certificationsData from "@data/certifications.json";
import educationData from "@data/education.json";

export type Locale = "id" | "en";

export interface SiteConfig {
  name: string;
  role: Record<Locale, string>;
  tagline: Record<Locale, string>;
  status: {
    type: "available" | "busy";
    id: string;
    en: string;
  };
  location: string;
  contact: {
    emailUser: string;
    emailDomain: string;
    email?: string;
    phone?: string;
    linkedin: string;
    github: string;
    instagram?: string;
  };
  cv: {
    enPath: string;
    idPath: string;
  };
}

export function getSiteConfig(): SiteConfig {
  return siteConfigData as SiteConfig;
}

export function getExperience() {
  return experienceData;
}

export function getProjects() {
  return projectsData;
}

export function getSkills() {
  return skillsData;
}

export function getCertifications() {
  return certificationsData;
}

export function getEducation() {
  return educationData;
}
