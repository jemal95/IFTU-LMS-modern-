import { Exam, Question, UserRole } from './types'; // FIX: Imported Exam and Question for explicit typing

export const API_BASE_URL = '/api'; // Placeholder for backend API base URL

export const ROLE_NAMES: Record<UserRole, string> = {
  [UserRole.STUDENT]: 'Student',
  [UserRole.INSTRUCTOR]: 'Instructor',
  [UserRole.ADMIN]: 'Admin',
};

export const NAVIGATION_ITEMS = {
  student: [
    { name: 'Dashboard', path: '/', icon: 'fas fa-tachometer-alt' },
    { name: 'Courses', path: '/courses', icon: 'fas fa-book' },
    { name: 'Exams', path: '/exams', icon: 'fas fa-pen-fancy' },
  ],
  instructor: [
    { name: 'Dashboard', path: '/', icon: 'fas fa-tachometer-alt' },
    { name: 'My Courses', path: '/courses', icon: 'fas fa-chalkboard-teacher' },
    { name: 'Exams', path: '/exams', icon: 'fas fa-pen-ruler' },
  ],
  admin: [
    { name: 'Dashboard', path: '/', icon: 'fas fa-tachometer-alt' },
    { name: 'Courses', path: '/courses', icon: 'fas fa-book' },
    { name: 'Users', path: '/users', icon: 'fas fa-users' },
    { name: 'Academic Transcript', path: '/academic-transcript', icon: 'fas fa-scroll' }, // New Admin Nav Item
  ],
};

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'om', name: 'Afan Oromo' },
];

// Default values for new entities (for mock purposes)
export const DEFAULT_NEW_COURSE = {
  id: '', // Will be generated
  title: 'New Course Title',
  code: 'CSC101',
  description: 'A default description for a new course.',
  instructorId: 'mock-instructor-id-1',
  instructorName: 'Dr. Alice Smith',
  credits: 3,
  imageUrl: 'https://picsum.photos/400/200?random=course'
};

// FIX: Removed 'id' from DEFAULT_NEW_EXAM to match the Omit<Exam, 'id'> type.
export const DEFAULT_NEW_EXAM: Omit<Exam, 'id'> = {
  title: 'New Exam',
  courseId: 'mock-course-id-1', // Needs to be linked to an historical course
  courseTitle: 'Introduction to Programming',
  durationMinutes: 60,
  questions: [
    { id: 'q1', text: 'What is React?', type: 'short-answer', correctAnswer: '' },
    { id: 'q2', text: 'React is a JavaScript library for building user interfaces.', type: 'true-false', options: ['True', 'False'], correctAnswer: 'True' },
  ],
  status: 'pending' as 'pending',
};