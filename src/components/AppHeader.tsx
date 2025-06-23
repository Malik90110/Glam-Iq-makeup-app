
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, HelpCircle, User, LogOut, LogIn, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  user: any;
  onShowOnboarding: () => void;
  onSignOut: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ user, onShowOnboarding, onSignOut }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/60 backdrop-blur-lg border-b border-white/40 sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 p-3 rounded-2xl shadow-lg">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Glam IQ
              </h1>
              <p className="text-gray-600 text-sm font-medium">
                ✨ Discover your perfect makeup with AI-powered beauty analysis ✨
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onShowOnboarding}
              className="border-rose-300 text-rose-600 hover:bg-rose-50 bg-white/80 backdrop-blur-sm shadow-lg"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Tutorial
            </Button>
            
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-gray-700 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40 shadow-lg">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onSignOut}
                  className="border-rose-300 text-rose-600 hover:bg-rose-50 bg-white/80 backdrop-blur-sm shadow-lg"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg border border-white/30"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
