import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, PlusCircle, KeyRound } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white drop-shadow-md">Dashboard</h1>
      </div>

      <Card className="glass-card border-white/30 shadow-lg">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 backdrop-blur-md bg-white/20 rounded-full border border-white/30">
              <Shield className="h-6 w-6 text-white drop-shadow-md" />
            </div>
            <div>
              <p className="text-sm text-white/80">Welcome to</p>
              <h2 className="text-xl font-bold text-white drop-shadow-md">SecureVault</h2>
              <p className="text-sm text-white/80">Manage your passwords securely</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="glass-button flex items-center gap-2">
              <a href="/dashboard/add" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Password
              </a>
            </Button>
            <Button variant="outline" className="glass-button border-white/50 flex items-center gap-2">
              <a href="/dashboard/passwords" className="flex items-center gap-2">
                <KeyRound className="h-4 w-4" />
                View All
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;