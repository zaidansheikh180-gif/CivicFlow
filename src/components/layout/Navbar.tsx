import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserRole } from '../../types/database';
import { 
  Building2, 
  Compass, 
  PlusCircle, 
  BarChart3, 
  HelpCircle, 
  ShieldAlert, 
  UserCheck, 
  LayoutDashboard 
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRole, onRoleChange }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 backdrop-blur-xl bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold font-display text-white tracking-tight">
              Civic<span className="text-gradient">Flow</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              3D Governance
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/explore"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/explore')
                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Explore</span>
          </Link>

          <Link
            to="/suggest"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/suggest')
                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Share Idea</span>
          </Link>

          <Link
            to="/insights"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/insights')
                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Insights</span>
          </Link>

          {currentRole !== 'resident' && (
            <Link
              to="/staff"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/staff')
                  ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-purple-400" />
              <span>Staff Queue</span>
            </Link>
          )}

          <Link
            to="/about"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/about')
                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Process</span>
          </Link>
        </nav>

        {/* Role Switcher & Action Button */}
        <div className="flex items-center gap-3">
          {/* Live Role Switcher Selector for Testing */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs">
            <UserCheck className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="bg-transparent text-slate-200 font-medium focus:outline-none pr-1 cursor-pointer"
              title="Switch user role for testing permissions"
            >
              <option value="resident" className="bg-slate-900 text-white">Role: Resident</option>
              <option value="staff" className="bg-slate-900 text-white">Role: Staff</option>
              <option value="moderator" className="bg-slate-900 text-white">Role: Moderator</option>
              <option value="admin" className="bg-slate-900 text-white">Role: Admin</option>
            </select>
          </div>

          <Link to="/dashboard" className="btn btn-sm btn-secondary">
            <span>Dashboard</span>
          </Link>

          <Link to="/suggest" className="btn btn-sm btn-primary">
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">New Proposal</span>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
