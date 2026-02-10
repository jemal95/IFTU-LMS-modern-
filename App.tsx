import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ExamsPage from './pages/ExamsPage';
import UsersPage from './pages/UsersPage';
import AcademicTranscriptPage from './pages/AcademicTranscriptPage'; // New Import
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { UserRole } from './types';
import { useTranslation } from 'react-i18next';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <div className="flex flex-col items-center p-6 rounded-lg shadow-md bg-white">
          <i className="fas fa-spinner fa-spin text-4xl mb-4"></i>
          <p className="text-lg font-semibold">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700">
        <div className="flex flex-col items-center p-6 rounded-lg shadow-md bg-white">
          <i className="fas fa-ban text-4xl mb-4"></i>
          <p className="text-lg font-semibold">{t('accessDenied')}</p>
          <p className="text-sm mt-2">{t('insufficientPermissions')}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {user && <Sidebar />}
      <div className={`flex-1 flex flex-col ${user ? 'md:ml-64' : ''}`}>
        {user && <Navbar />}
        <main className="flex-grow p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
            <Route path="/courses/:id" element={<ProtectedRoute><CourseDetailPage /></ProtectedRoute>} />
            <Route path="/exams" element={<ProtectedRoute allowedRoles={[UserRole.STUDENT]}><ExamsPage /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><UsersPage /></ProtectedRoute>} />
            <Route path="/academic-transcript" element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><AcademicTranscriptPage /></ProtectedRoute>} /> {/* New Route */}
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;