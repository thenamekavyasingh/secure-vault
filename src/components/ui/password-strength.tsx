import { useMemo } from 'react';
import { Progress } from './progress';
import { cn } from '@/lib/utils';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

export const PasswordStrength = ({ password, className }: PasswordStrengthProps) => {
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score <= 2) return { score: score * 20, label: 'Weak', color: 'text-red-400' };
    if (score === 3) return { score: 60, label: 'Fair', color: 'text-orange-400' };
    if (score === 4) return { score: 80, label: 'Good', color: 'text-yellow-400' };
    return { score: 100, label: 'Strong', color: 'text-green-400' };
  }, [password]);

  if (!password) return null;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/70">Password Strength</span>
        <span className={cn("text-sm font-medium", strength.color)}>
          {strength.label}
        </span>
      </div>
      <Progress value={strength.score} className="h-2 bg-white/20" />
    </div>
  );
};