export enum UserRole {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  description: string;
  instructorId: string;
  instructorName: string;
  credits: number;
  imageUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  courseId: string;
}

export interface Exam {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  durationMinutes: number;
  questions: Question[];
  status: 'pending' | 'active' | 'completed';
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[]; // For multiple-choice
  correctAnswer?: string | string[]; // Single string for true-false/short-answer, array for multi-select MC
}

export interface Submission {
  examId: string;
  studentId: string;
  answers: {
    questionId: string;
    answer: string | string[];
  }[];
  submittedAt: Date;
  score?: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  // FIX: Changed signature to match implementation in AuthContext
  login: (email: string, password: string) => Promise<{ token: string; user: User }>;
  // FIX: Changed signature to match implementation in AuthContext
  register: (username: string, email: string, password: string, role: UserRole) => Promise<{ token: string; user: User }>;
  logout: () => Promise<void>;
  loading: boolean;
}

export interface TranslationKeys {
  [key: string]: string | TranslationKeys;
}

export interface GradeEntry {
  semI: number | string;
  semII: number | string;
  avg: number | string;
}

export interface SemesterGrades {
  grade9: GradeEntry[];
  grade10: GradeEntry[];
  grade11: GradeEntry[];
  grade12: GradeEntry[];
}

export interface AcademicTranscript {
  studentName: string;
  studentId: string;
  gender: string;
  dob: string;
  admission: string;
  stream: string;
  semesters: SemesterGrades;
  overallPercentage: {
    grade9: string;
    grade10: string;
    grade11: string;
    grade12: string;
  };
  overallGrade: {
    grade9: string;
    grade10: string;
    grade11: string;
    grade12: string;
  };
  overallOutOf: {
    grade9: string;
    grade10: string;
    grade11: string;
    grade12: string;
  };
  status: {
    grade9: string;
    grade10: string;
    grade11: string;
    grade12: string;
  };
  principalSignature: string; // Base64 or URL for image
  homeroomTeacher: string;
  dateOfIssue: string;
}
