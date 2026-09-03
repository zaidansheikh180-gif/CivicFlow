import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import CustomCursor from './components/ui/CustomCursor';
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import SuggestPage from './pages/SuggestPage';
import SuggestionDetailPage from './pages/SuggestionDetailPage';
import DashboardPage from './pages/DashboardPage';
import StaffDashboardPage from './pages/StaffDashboardPage';
import InsightsPage from './pages/InsightsPage';
import AboutPage from './pages/AboutPage';
import { UserRole } from './types/database';
import { SuggestionWithDetails } from './types/domain';
import { mockStorage } from './lib/supabase';

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('resident');
  const [suggestions, setSuggestions] = useState<SuggestionWithDetails[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<SuggestionWithDetails | null>(null);

  const refreshData = async () => {
    const data = await mockStorage.getSuggestions();
    setSuggestions(data);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <BrowserRouter>
      {/* Smooth Custom 3D Cursor Ring & Glow */}
      <CustomCursor />

      <AppLayout
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        suggestions={suggestions}
        selectedId={selectedSuggestion?.id || null}
        onSelectSuggestion={(sug) => setSelectedSuggestion(sug)}
      >
        <Routes>
          <Route path="/" element={<LandingPage suggestions={suggestions} />} />
          <Route
            path="/explore"
            element={
              <ExplorePage
                suggestions={suggestions}
                selectedId={selectedSuggestion?.id || null}
                onSelectSuggestion={(sug) => setSelectedSuggestion(sug)}
              />
            }
          />
          <Route path="/suggest" element={<SuggestPage />} />
          <Route
            path="/suggestions/:id"
            element={
              <SuggestionDetailPage
                currentRole={currentRole}
                onRefreshData={refreshData}
              />
            }
          />
          <Route
            path="/dashboard"
            element={<DashboardPage suggestions={suggestions} currentRole={currentRole} />}
          />
          <Route
            path="/staff"
            element={<StaffDashboardPage suggestions={suggestions} onRefreshData={refreshData} />}
          />
          <Route path="/insights" element={<InsightsPage suggestions={suggestions} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
