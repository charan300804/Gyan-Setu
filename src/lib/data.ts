import type { Course, Student, Quiz, ChatContact, Conversation, Teacher } from './types';

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

export const teachers: Teacher[] = [
  { id: 'teacher-1', name: 'Mrs. Verma', role: 'Class Teacher', assignment: '6th A', avatarId: 'avatar-teacher' },
  { id: 'teacher-2', name: 'Mr. Kumar', role: 'Class Teacher', assignment: '6th B', avatarId: 'avatar-teacher-male' },
  { id: 'teacher-3', name: 'Ms. Reddy', role: 'Subject Teacher', assignment: 'Mathematics', avatarId: 'avatar-teacher' },
  { id: 'teacher-4', name: 'Mr. Khan', role: 'Subject Teacher', assignment: 'Science', avatarId: 'avatar-teacher-male' },
  { id: 'teacher-5', name: 'Mrs. Das', role: 'Subject Teacher', assignment: 'English', avatarId: 'avatar-teacher' },
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

export const chatContacts: ChatContact[] = [
    {
        id: 'contact-1',
        name: 'Mr. Sharma (Principal)',
        role: 'Principal',
        avatarId: 'avatar-teacher',
        lastMessage: "Yes, I'll look into it right away.",
        lastMessageTime: '10:42 AM',
        unreadCount: 0,
    },
    {
        id: 'contact-2',
        name: 'Mrs. Gill (Parent)',
        role: 'Parent of Simranjeet Gill',
        avatarId: 'avatar-parent',
        lastMessage: "Thank you for letting me know!",
        lastMessageTime: 'Yesterday',
        unreadCount: 2,
    },
    {
        id: 'contact-3',
        name: 'Amit Sharma',
        role: 'Class Teacher, 6th B',
        avatarId: 'avatar-male-1',
        lastMessage: "Did you get the new schedule?",
        lastMessageTime: '3 days ago',
        unreadCount: 0,
    },
];

export const conversations: Conversation[] = [
    {
        contactId: 'contact-1',
        messages: [
            { id: 'msg-1-1', sender: 'me', text: 'Good morning, Mr. Sharma. I wanted to follow up on the budget for the new computer lab.', timestamp: '10:40 AM' },
            { id: 'msg-1-2', sender: 'other', text: "Yes, I'll look into it right away.", timestamp: '10:42 AM' },
        ]
    },
    {
        contactId: 'contact-2',
        messages: [
            { id: 'msg-2-1', sender: 'me', text: "Hello Mrs. Gill, I'm writing to inform you about Simranjeet's excellent performance in the recent science quiz.", timestamp: 'Yesterday' },
            { id: 'msg-2-2', sender: 'other', text: "That's wonderful news! I'm so proud.", timestamp: 'Yesterday' },
            { id: 'msg-2-3', sender: 'other', text: "Thank you for letting me know!", timestamp: 'Yesterday' },
        ]
    },
    {
        contactId: 'contact-3',
        messages: [
             { id: 'msg-3-1', sender: 'other', text: "Did you get the new schedule?", timestamp: '3 days ago' },
        ]
    }
];