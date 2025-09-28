import type { Course, Student, Quiz, ChatContact, Conversation, Teacher } from './types';

// Most mock data is now removed and will be fetched from Firestore.
// We keep sampleQuiz, chatContacts, and conversations as they are not part of the core DB migration yet.

export const courses: Course[] = [];
export const students: Student[] = [];
export const teachers: Teacher[] = [];


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
