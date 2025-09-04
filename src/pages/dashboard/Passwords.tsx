import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Edit2, Trash2, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Category { id: string; name: string; }
interface Entry {
  id: string;
  account_name: string;
  username: string | null;
  email: string | null;
  encrypted_password: string;
  category_id: string | null;
  website_url: string | null;
  created_at: string;
}

const nameToClass: Record<string, string> = {
  Email: 'category-email',
  Banking: 'category-banking',
  Social: 'category-social',
  Work: 'category-work',
};

const Passwords = () => {
  const { toast } = useToast();

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('id, name');
      if (error) throw error;
      return data as Category[];
    }
  });

  const { data: entries, isLoading, refetch } = useQuery({
    queryKey: ['password_entries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('password_entries')
        .select('id, account_name, username, email, encrypted_password, category_id, website_url, created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Entry[];
    }
  });

  const getCategory = (id: string | null) => categories?.find(c => c.id === id)?.name || 'Uncategorized';

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: 'Copied', description: `${label} copied to clipboard.` });
    } catch (e) {
      toast({ title: 'Copy failed', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white drop-shadow-md">All Passwords</h1>
        <Button className="glass-button">
          <a href="/dashboard/add">Add New</a>
        </Button>
      </div>

      {isLoading ? (
        <p className="text-white/80">Loading...</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {entries?.map((item) => {
            const categoryName = getCategory(item.category_id);
            const cls = nameToClass[categoryName] || 'bg-white/20';
            return (
              <Card key={item.id} className="glass-card border-white/30 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-white">{item.account_name}</CardTitle>
                    <Badge className={`${cls} text-gray-900 border border-white/30`}>{categoryName}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {item.username && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/80">Username</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{item.username}</span>
                        <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white" onClick={() => handleCopy(item.username!, 'Username')}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {item.email && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/80">Email</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{item.email}</span>
                        <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white" onClick={() => handleCopy(item.email!, 'Email')}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">Password</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium flex items-center gap-1 text-white"><EyeOff className="h-4 w-4" /> ••••••••</span>
                      <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white" onClick={() => handleCopy(item.encrypted_password, 'Password')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button variant="outline" size="icon" title="Edit" disabled className="border-white/30 hover:bg-white/10 text-white">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" title="Delete" disabled className="border-white/30 hover:bg-white/10 text-white">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Passwords;