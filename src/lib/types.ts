import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
};

export type Course = {
  id: string;
  title: string;
  language: 'Punjabi' | 'Hindi' | 'English';
  description: string;
  modules: number;
  imageId: string;
  progress: number;
};

export type Student = {
  id: string;
  name: string;
  class: string;
  avatarId: string;
  overallScore: number;
  attendance: number;
  completedCourses: number;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Quiz = {
  id: string;
  title: string;
  courseId: string;
  questions: QuizQuestion[];
};
