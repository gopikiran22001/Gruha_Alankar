import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/button';
import Select from '../components/ui/select';
import { User, Mail, Sparkles, Languages, CheckCircle2 } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  preferredStyle: z.string(),
  language: z.string()
});

export const ProfilePage = () => {
  const { user, updateProfile } = useAuthStore();

  const {
    register: registerField,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty }
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      preferredStyle: user?.preferredStyle || 'modern',
      language: user?.language || 'english'
    }
  });

  const onSubmit = (data) => {
    updateProfile(data);
    alert('User preferences successfully saved!');
  };

  const selectedStyle = watch('preferredStyle');

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto select-none">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <User size={18} className="text-primary" />
          <span>My Profile Preferences</span>
        </h2>
        <p className="text-xs text-muted">Configure personal configurations, target style metrics, and interface languages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Card: Avatar details */}
        <div className="glass-panel p-5 rounded-xl flex flex-col items-center text-center space-y-3 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-primary/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="w-20 h-20 rounded-full overflow-hidden border border-border bg-zinc-800">
            <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{user?.name}</h4>
            <p className="text-[10px] text-muted font-medium">{user?.email}</p>
          </div>
          <div className="bg-background/60 border border-border rounded-lg px-3 py-1.5 w-full flex justify-between text-[10px]">
            <span className="text-muted">Membership Tier</span>
            <span className="text-primary font-bold uppercase">Enterprise Pro</span>
          </div>
        </div>

        {/* Right Card: Preferences form */}
        <div className="md:col-span-2 glass-panel p-5 rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name input */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-semibold text-muted">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full glass-input pl-10 text-xs py-2"
                    {...registerField('name')}
                  />
                  <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                </div>
                {errors.name && (
                  <span className="text-[10px] font-semibold text-red-500">{errors.name.message}</span>
                )}
              </div>

              {/* Email input */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-semibold text-muted">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full glass-input pl-10 text-xs py-2 disabled:opacity-50"
                    disabled
                    {...registerField('email')}
                  />
                  <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                </div>
                {errors.email && (
                  <span className="text-[10px] font-semibold text-red-500">{errors.email.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Style selector */}
              <Select
                label="Preferred Design Style"
                options={[
                  { value: 'modern', label: 'Modern Minimalist' },
                  { value: 'luxury', label: 'Luxury Velvet' },
                  { value: 'scandinavian', label: 'Scandinavian Wood' },
                  { value: 'industrial', label: 'Industrial Steel' }
                ]}
                value={selectedStyle}
                onChange={(val) => setValue('preferredStyle', val, { shouldDirty: true })}
                placeholder=""
              />

              {/* Language selection */}
              <Select
                label="Assistant Language"
                options={[
                  { value: 'english', label: 'English (US)' },
                  { value: 'hindi', label: 'Hindi (हिंदी)' },
                  { value: 'kannada', label: 'Kannada (ಕನ್ನಡ)' }
                ]}
                value={watch('language')}
                onChange={(val) => setValue('language', val, { shouldDirty: true })}
                placeholder=""
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:w-auto"
              disabled={!isDirty}
            >
              Save Preferences
            </Button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
