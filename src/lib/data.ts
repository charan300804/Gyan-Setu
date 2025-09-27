import type { Course, Student, Quiz } from './types';

export const courses: Course[] = [
  {
    id: 'diglit-1',
    title: 'Basic Computer Use',
    language: 'English',
    description: 'Learn the fundamentals of using a computer, from turning it on to managing files.',
    modules: 5,
    imageId: 'course-computer',
    progress: 75,
  },
  {
    id: 'diglit-2',
    title: 'Safe Internet Practices',
    language: 'Punjabi',
    description: 'Understand how to stay safe online, identify risks, and protect your information.',
    modules: 4,
    imageId: 'course-internet',
    progress: 50,
  },
  {
    id: 'diglit-3',
    title: 'Typing Skills',
    language: 'English',
    description: 'Improve your typing speed and accuracy with engaging exercises.',
    modules: 10,
    imageId: 'course-typing',
    progress: 20,
  },
  {
    id: 'core-1',
    title: 'Mathematics Grade 6',
    language: 'Hindi',
    description: 'Covering topics from basic arithmetic to introductory geometry for 6th grade.',
    modules: 12,
    imageId: 'course-math',
    progress: 90,
  },
  {
    id: 'core-2',
    title: 'English Grade 6',
    language: 'English',
    description: 'Enhance your reading, writing, and comprehension skills.',
    modules: 15,
    imageId: 'course-english',
    progress: 0,
  },
  {
    id: 'core-3',
    title: 'Science Grade 6',
    language: 'Punjabi',
    description: 'Explore the wonders of biology, chemistry, and physics.',
    modules: 10,
    imageId: 'course-science',
    progress: 0,
  },
];

export const students: Student[] = [
  { id: '1', name: 'Rohan Singh', class: '6th A', avatarId: 'avatar-male-1', overallScore: 82, attendance: 95, completedCourses: 3 },
  { id: '2', name: 'Priya Kaur', class: '6th A', avatarId: 'avatar-female-1', overallScore: 75, attendance: 88, completedCourses: 2 },
  { id: '3', name: 'Amit Sharma', class: '6th B', avatarId: 'avatar-male-1', overallScore: 91, attendance: 98, completedCourses: 5 },
  { id: '4', name: 'Simranjeet Gill', class: '6th B', avatarId: 'avatar-female-1', overallScore: 68, attendance: 85, completedCourses: 1 },
];

export const sampleQuiz: Quiz = {
  id: 'quiz-1',
  title: 'Basic Computer Use - Module 1 Quiz',
  courseId: 'diglit-1',
  questions: [
    {
      question: "What does 'CPU' stand for?",
      options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Power Unit', 'Control Processing Unit'],
      correctAnswer: 'Central Processing Unit',
    },
    {
      question: "Which of these is an example of an operating system?",
      options: ['Microsoft Word', 'Google Chrome', 'Windows', 'Adobe Photoshop'],
      correctAnswer: 'Windows',
    },
    {
      question: "What is the function of a mouse?",
      options: ['To type text', 'To point and click on items on the screen', 'To play audio', 'To print documents'],
      correctAnswer: 'To point and click on items on the screen',
    },
    {
        question: "Which device is used to input sound into a computer?",
        options: ['Monitor', 'Keyboard', 'Mouse', 'Microphone'],
        correctAnswer: 'Microphone',
    },
    {
        question: "What is RAM short for?",
        options: ['Read-Only Memory', 'Random-Access Memory', 'Real-time Access Memory', 'Remote-Access Memory'],
        correctAnswer: 'Random-access Memory',
    }
  ],
};
