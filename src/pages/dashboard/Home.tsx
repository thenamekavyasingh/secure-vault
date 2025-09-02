import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, PlusCircle, KeyRound } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <Card className="card-gradient border-0 shadow">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Welcome to</p>
              <h2 className="text-xl font-bold">SecureVault</h2>
              <p className="text-sm text-muted-foreground">Manage your passwords securely</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <a href="/dashboard/add" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Password
              </a>
            </Button>
            <Button variant="outline" asChild>
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