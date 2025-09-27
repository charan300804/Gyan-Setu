import type { LucideIcon, LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type IconName = keyof typeof import("lucide-react");

export type NavItem = {
  title: string;
  href: string;
  icon: IconName;
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
