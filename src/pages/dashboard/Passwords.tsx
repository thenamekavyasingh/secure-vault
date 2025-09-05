import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Edit2, Trash2, EyeOff, Eye, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { decryptPassword } from '@/utils/encryption';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
  const [masterPassword, setMasterPassword] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [showDecrypted, setShowDecrypted] = useState<Record<string, boolean>>({});

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

  const handleDecryptPassword = async (entry: Entry) => {
    if (!masterPassword) {
      toast({ 
        title: 'Master Password Required', 
        description: 'Please enter your master password to decrypt.', 
        variant: 'destructive' 
      });
      return;
    }

    try {
      const decryptedPassword = decryptPassword(entry.encrypted_password, masterPassword);
      await navigator.clipboard.writeText(decryptedPassword);
      toast({ title: 'Password Copied', description: 'Decrypted password copied to clipboard.' });
      setSelectedEntry(null);
      setMasterPassword('');
    } catch (error) {
      toast({ 
        title: 'Decryption Failed', 
        description: 'Invalid master password or corrupted data.', 
        variant: 'destructive' 
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-heading">All Passwords</h1>
        <Button className="glass-button">
          <a href="/dashboard/add">Add New</a>
        </Button>
      </div>

      {isLoading ? (
        <p className="text-readable">Loading passwords...</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {entries?.map((item) => {
            const categoryName = getCategory(item.category_id);
            const cls = nameToClass[categoryName] || 'bg-white/20';
            return (
              <Card key={item.id} className="glass-card border-white/30 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base text-heading break-words flex-1 leading-tight">
                      {item.account_name}
                    </CardTitle>
                    <Badge className={`${cls} text-slate-800 border border-white/30 shrink-0 text-xs font-medium`}>
                      {categoryName}
                    </Badge>
                  </div>
                  {item.website_url && (
                    <p className="text-xs text-slate-600 break-all">
                      {item.website_url}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {item.username && (
                    <div className="space-y-1">
                      <span className="text-xs text-slate-700 font-medium">Username</span>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-readable break-all flex-1 card-text">
                          {item.username}
                        </span>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="hover:bg-white/20 text-glass-dark shrink-0 h-8 w-8" 
                          onClick={() => handleCopy(item.username!, 'Username')}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {item.email && (
                    <div className="space-y-1">
                      <span className="text-xs text-slate-700 font-medium">Email</span>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-readable break-all flex-1 card-text">
                          {item.email}
                        </span>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="hover:bg-white/20 text-glass-dark shrink-0 h-8 w-8" 
                          onClick={() => handleCopy(item.email!, 'Email')}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="space-y-1">
                    <span className="text-xs text-slate-700 font-medium">Password</span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium flex items-center gap-1 text-readable">
                        <Key className="h-3 w-3" /> 
                        <span className="text-xs">••••••••••••</span>
                      </span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="hover:bg-white/20 text-glass-dark shrink-0 h-8 w-8" 
                            onClick={() => setSelectedEntry(item)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="glass-card">
                          <DialogHeader>
                            <DialogTitle className="text-heading">Decrypt Password</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="decrypt_master_password" className="text-readable">
                                Enter Master Password
                              </Label>
                              <Input
                                id="decrypt_master_password"
                                type="password"
                                placeholder="Your master password"
                                value={masterPassword}
                                onChange={(e) => setMasterPassword(e.target.value)}
                                className="glass-input"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => selectedEntry && handleDecryptPassword(selectedEntry)}
                                className="glass-button flex-1"
                              >
                                Decrypt & Copy
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      title="Edit" 
                      disabled 
                      className="border-white/30 hover:bg-white/10 text-glass-dark h-8 w-8"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      title="Delete" 
                      disabled 
                      className="border-white/30 hover:bg-white/10 text-glass-dark h-8 w-8"
                    >
                      <Trash2 className="h-3 w-3" />
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