export interface NavLink {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  initials: string;
  accentFrom: string;
  accentTo: string;
  image?: string;
}

export interface Experience {
  id: number;
  period: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
}

export interface Interest {
  id: number;
  label: string;
  icon: string;
  description: string;
}
