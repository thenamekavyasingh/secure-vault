import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Category { id: string; name: string; }

const nameToClass: Record<string, string> = {
  Email: 'category-email',
  Banking: 'category-banking',
  Social: 'category-social',
  Work: 'category-work',
};

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('id, name');
      if (error) throw error;
      return data as Category[];
    }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold text-glass-dark">Categories</h1>

      {isLoading ? (
        <p className="text-glass-dark">Loading...</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories?.map((cat) => (
            <Card key={cat.id} className="glass-card border-white/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-glass-dark">{cat.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`inline-flex px-3 py-1 rounded-full text-sm ${nameToClass[cat.name] || 'bg-white/20'} text-gray-900 border border-white/30`}>
                  {cat.name}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;