import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CivicCanvas from '../canvas/CivicCanvas';
import { UserRole } from '../../types/database';
import { SuggestionWithDetails } from '../../types/domain';

interface AppLayoutProps {
  children: React.ReactNode;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  suggestions: SuggestionWithDetails[];
  selectedId: string | null;
  onSelectSuggestion?: (suggestion: SuggestionWithDetails) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  currentRole,
  onRoleChange,
  suggestions,
  selectedId,
  onSelectSuggestion,
}) => {
  const location = useLocation();

  // Show interactive 3D background canvas on home/explore/about pages
  const showFullCanvas = ['/', '/explore', '/about'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
      
      {/* 3D Background Scene Canvas */}
      {showFullCanvas && (
        <div className="fixed inset-0 z-0 pointer-events-auto opacity-70">
          <CivicCanvas
            suggestions={suggestions}
            selectedId={selectedId}
            onSelectSuggestion={onSelectSuggestion}
            activeRoute={location.pathname}
          />
        </div>
      )}

      {/* Top Navbar */}
      <Navbar currentRole={currentRole} onRoleChange={onRoleChange} />

      {/* Main DOM Overlay Content Container */}
      <main className="flex-1 relative z-10 w-full flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;
