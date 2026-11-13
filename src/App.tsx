import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { RequireStudent } from '@/components/layout/RequireStudent';
import { StudentProvider } from '@/context/StudentContext';
import DashboardPage from '@/pages/DashboardPage';
import DrawingPage from '@/pages/topic/DrawingPage';
import ExplorePage from '@/pages/ExplorePage';
import LearningPage from '@/pages/LearningPage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ObservePage from '@/pages/topic/ObservePage';
import ProfilePage from '@/pages/ProfilePage';
import SearchPage from '@/pages/SearchPage';
import TextbookPage from '@/pages/topic/TextbookPage';
import TopicLayout from '@/pages/topic/TopicLayout';

export default function App() {
  return (
    <BrowserRouter>
      <StudentProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            element={
              <RequireStudent>
                <AppShell />
              </RequireStudent>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/topic/:slug" element={<TopicLayout />}>
              <Route index element={<Navigate to="textbook" replace />} />
              <Route path="textbook" element={<TextbookPage />} />
              <Route path="drawing" element={<DrawingPage />} />
              <Route path="observe" element={<ObservePage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </StudentProvider>
    </BrowserRouter>
  );
}
