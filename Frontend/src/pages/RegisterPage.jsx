import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/button';
import { Sparkles, Mail, Lock, User } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const GoogleIcon = () => (
  <svg className="h-3.5 w-3.5 mr-2" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: signup, loginWithGoogle, isLoading, error, isFirebaseActive } = useAuthStore();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' }
  });

  const onSubmit = async (data) => {
    try {
      await signup(data.name, data.email, data.password);
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-background relative select-none">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 rounded-xl shadow-premium border border-border relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -left-10 -top-10 w-28 h-28 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

        {/* Heading brand */}
        <div className="flex flex-col items-center space-y-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-rose-500 flex items-center justify-center text-white shadow-glow">
            <Sparkles size={20} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-2">Create Account</h2>
          <p className="text-xs text-muted">Sign up to design your future space</p>
        </div>

        {/* Backend Auth Info Banner */}
        {!isFirebaseActive && (
          <div className="p-3 bg-zinc-950/40 border border-primary/20 rounded-lg text-[10px] text-primary/80 mb-5 relative overflow-hidden flex flex-col gap-1">
            <div className="flex items-center gap-1.5 font-bold text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-1" />
              Backend Auth Active
            </div>
            <p className="text-zinc-400 font-medium leading-relaxed">
              Using Flask/JWT authentication. Create your account with email and password below.
            </p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-500 mb-4 text-center">
            {error}
          </div>
        )}

        {/* Google OAuth SignUp Option */}
        <div className="mb-5">
          <Button
            type="button"
            variant="glass"
            className="w-full flex items-center justify-center border border-border/80 hover:bg-zinc-800/40 hover:text-white transition-all text-xs"
            onClick={handleGoogleSignUp}
            loading={isLoading}
          >
            <GoogleIcon />
            Continue with Google
          </Button>
        </div>

        {/* Form separator */}
        <div className="relative flex items-center justify-center my-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <span className="relative bg-[#161618] px-3 text-[9px] font-bold text-muted uppercase tracking-wider select-none">
            Or sign up with email
          </span>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold text-muted">Full Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="John Doe"
                className={`w-full glass-input pl-10 text-xs ${errors.name ? 'border-red-500/30 focus:border-red-500' : ''}`}
                {...registerField('name')}
              />
              <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            </div>
            {errors.name && (
              <span className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold text-muted">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@example.com"
                className={`w-full glass-input pl-10 text-xs ${errors.email ? 'border-red-500/30 focus:border-red-500' : ''}`}
                {...registerField('email')}
              />
              <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            </div>
            {errors.email && (
              <span className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold text-muted">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full glass-input pl-10 text-xs ${errors.password ? 'border-red-500/30 focus:border-red-500' : ''}`}
                {...registerField('password')}
              />
              <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            </div>
            {errors.password && (
              <span className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.password.message}</span>
            )}
          </div>

          <Button type="submit" className="w-full mt-2" loading={isLoading}>
            Sign Up
          </Button>
        </form>

        <div className="text-center mt-6 text-xs text-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
