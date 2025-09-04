import { useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Shield,
  FolderOpen,
  Plus,
  Settings,
  LogOut
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'All Passwords', url: '/dashboard/passwords', icon: Shield },
  { title: 'Categories', url: '/dashboard/categories', icon: FolderOpen },
  { title: 'Add New', url: '/dashboard/add', icon: Plus },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { signOut } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard';
    }
    return currentPath.startsWith(path);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="glass-sidebar">
      <div className="p-4 border-b border-white/30">
        <div className="flex items-center gap-2">
          <div className="p-2 backdrop-blur-md bg-white/20 rounded-lg border border-white/30">
            <Shield className="h-6 w-6 text-white drop-shadow-md" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-lg text-glass-white">
                SecureVault
              </h2>
            </div>
          )}
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-glass-white">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className="hover:bg-white/10 transition-colors text-glass-white data-[active=true]:bg-white/20 data-[active=true]:text-glass-white"
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start hover:bg-red-400/20 text-glass-white hover:text-red-200 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Sign Out</span>}
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}