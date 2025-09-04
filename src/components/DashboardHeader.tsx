import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';

export function DashboardHeader() {
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = async () => {
    await signOut();
  };

  const userInitials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <header className="glass-header h-16 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-white/10 text-glass-white" />
        
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
          <Input
            type="search"
            placeholder="Search passwords..."
            className="glass-input pl-10 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 hover:bg-white/10 transition-colors text-glass-white"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-white/30 text-glass-dark font-medium border border-white/50">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-glass-white">
                  {user?.user_metadata?.full_name || 'User'}
                </p>
                <p className="text-xs text-glass-white opacity-80">
                  {user?.email}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-glass-white opacity-80" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-panel w-56 border-white/30">
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings" className="flex items-center gap-2 text-gray-900">
                <User className="h-4 w-4" />
                Profile Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleSignOut}
              className="text-red-600 focus:text-red-600"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}