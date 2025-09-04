import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

const Settings = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-semibold text-white drop-shadow-md">Settings</h1>
      <Card className="glass-card shadow-lg border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-white/80">
            Logged in as <span className="font-medium text-white">{user?.email}</span>
          </div>
          <Button 
            variant="destructive" 
            onClick={() => signOut()}
            className="bg-red-500/80 hover:bg-red-600/80 text-white border border-red-400/50"
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;