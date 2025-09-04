import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { PasswordStrength } from '@/components/ui/password-strength';

interface Category { id: string; name: string; }

const AddPassword = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    account_name: '',
    username: '',
    email: '',
    password: '',
    category_id: '' as string | undefined,
    website_url: '',
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('id, name');
      if (error) throw error;
      return data as Category[];
    }
  });

  useEffect(() => {
    if (!form.category_id && categories?.length) {
      const emailCat = categories.find(c => c.name === 'Email');
      setForm(f => ({ ...f, category_id: (emailCat || categories[0]).id }));
    }
  }, [categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const payload = {
      user_id: user.id,
      account_name: form.account_name,
      username: form.username || null,
      email: form.email || null,
      encrypted_password: form.password, // TODO: replace with encryption in next step
      category_id: form.category_id || null,
      website_url: form.website_url || null,
    };

    const { error } = await supabase.from('password_entries').insert([payload]);
    if (error) {
      toast({ title: 'Failed to add', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Saved', description: 'Password added to your vault.' });
      navigate('/dashboard/passwords');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-semibold text-white drop-shadow-md">Add New Password</h1>
      <Card className="glass-card border-white/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="account_name" className="text-white">Account Name</Label>
                <Input id="account_name" name="account_name" placeholder="e.g. Gmail" value={form.account_name} onChange={handleChange} required className="glass-input" />
              </div>
              <div>
                <Label htmlFor="username" className="text-white">Username</Label>
                <Input id="username" name="username" placeholder="e.g. john_doe" value={form.username} onChange={handleChange} className="glass-input" />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input id="email" name="email" type="email" placeholder="e.g. john@site.com" value={form.email} onChange={handleChange} className="glass-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Create a strong password" value={form.password} onChange={handleChange} required className="glass-input" />
                <PasswordStrength password={form.password} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Category</Label>
                <Select value={form.category_id} onValueChange={(v) => setForm(f => ({ ...f, category_id: v }))}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-white/30">
                    {categories?.map((c) => (
                      <SelectItem key={c.id} value={c.id} className="text-gray-900">{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="website_url" className="text-white">Website</Label>
                <Input id="website_url" name="website_url" placeholder="https://..." value={form.website_url} onChange={handleChange} className="glass-input" />
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <Button type="submit" className="glass-button">Save</Button>
              <Button type="button" variant="outline" className="glass-button border-white/50" onClick={() => navigate('/dashboard/passwords')}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPassword;