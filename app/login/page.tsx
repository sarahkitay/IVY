'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp, loading: authLoading } = useAuthStore();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Email and password are required.');
      return;
    }
    if (mode === 'signup') {
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await signIn(email.trim(), password);
      } else {
        await signUp(email.trim(), password);
      }
      router.push('/dashboard');
      router.refresh();
    } catch (err: unknown) {
      const message = err && typeof err === 'object' && 'message' in err
        ? String((err as { message: string }).message)
        : 'Something went wrong.';
      setError(message.replace(/^Firebase:?\s*/i, ''));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-3 mb-8"
          aria-label="IVY home"
        >
          <span className="shrink-0 flex items-center justify-center -translate-y-0.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ivy-corner-logo.png" alt="" className="h-12 w-12 object-contain" />
          </span>
          <span className="font-cinzel-decorative font-bold text-xl uppercase text-ink">IVY</span>
        </Link>
        <h1 className="font-serif text-2xl text-ink mb-2">
          {mode === 'login' ? 'Log in' : 'Create account'}
        </h1>
        <p className="text-sm text-charcoal/70 mb-6">
          {mode === 'login'
            ? 'Log in to see your projects across devices.'
            : 'Create a username (email) and password to save your work to the cloud. Only you will see your data.'}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-charcoal/20 px-3 py-2 bg-cream text-ink focus:outline-none focus:ring-2 focus:ring-charcoal/30"
              autoComplete="email"
              disabled={submitting || authLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-charcoal/20 px-3 py-2 bg-cream text-ink focus:outline-none focus:ring-2 focus:ring-charcoal/30"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              disabled={submitting || authLoading}
            />
          </div>
          {mode === 'signup' && (
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-charcoal mb-1">
                Confirm password
              </label>
              <input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-charcoal/20 px-3 py-2 bg-cream text-ink focus:outline-none focus:ring-2 focus:ring-charcoal/30"
                autoComplete="new-password"
                disabled={submitting || authLoading}
              />
            </div>
          )}
          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting || authLoading}
            className="w-full btn-dark px-4 py-3 font-medium disabled:opacity-50"
          >
            {submitting ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>
        <p className="mt-6 text-sm text-charcoal/70">
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); setConfirmPassword(''); }}
                className="text-ink underline hover:no-underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); }}
                className="text-ink underline hover:no-underline"
              >
                Log in
              </button>
            </>
          )}
        </p>
        <Link href="/dashboard" className="block mt-8 text-sm text-charcoal/60 hover:text-ink">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
