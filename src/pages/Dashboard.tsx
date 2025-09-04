import { Navigate, Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { useAuth } from '@/hooks/useAuth';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingBubbles } from '@/components/FloatingBubbles';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative">
        <AnimatedBackground />
        <FloatingBubbles />
        <AppSidebar />
        <div className="flex-1 flex flex-col relative z-10">
          <DashboardHeader />
          <main className="flex-1 p-3 md:p-6">
            <div className="glass-panel p-4 md:p-6 rounded-lg">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;