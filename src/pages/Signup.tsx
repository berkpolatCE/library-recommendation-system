import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { validateEmail, validatePassword, validateRequired } from '@/utils/validation';
import { handleApiError } from '@/utils/errorHandling';

/**
 * Signup page with warm Hogwarts styling
 */
export function Signup() {
  const navigate = useNavigate();
  const { signup, needsConfirmation, confirmAccount } = useAuth();
  const [confirmationCode, setConfirmationCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!validateRequired(name)) {
      newErrors.name = 'Name is required';
    }

    if (!validateRequired(email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!validateRequired(password)) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password =
        'Password must be at least 8 characters with uppercase, lowercase, and number';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      await signup(email, password, name);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await confirmAccount(confirmationCode);
      navigate('/login');
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (needsConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 animated-bg">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-extrabold mb-3">
              <span className="gradient-text">Check Your Email</span>
            </h1>
            <p className="text-ink-light text-lg">We sent a verification code to your email</p>
          </div>

          <div className="glass-effect rounded-3xl shadow-warm-2xl border border-parchment-dark p-8">
            <form onSubmit={handleConfirm}>
              <Input
                label="Verification Code"
                type="text"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
                placeholder="Enter 6-digit code"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify Account'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 animated-bg">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-burgundy to-gold flex items-center justify-center shadow-lg shadow-burgundy/30 mx-auto">
              <svg
                className="w-8 h-8 text-parchment-light"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-extrabold mb-3">
            <span className="gradient-text">Create Account</span>
          </h1>
          <p className="text-ink-light text-lg">Join us to discover your next favorite book</p>
        </div>

        <div className="glass-effect rounded-3xl shadow-warm-2xl border border-parchment-dark p-8">
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              required
              placeholder="John Doe"
            />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
              placeholder="you@example.com"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
              placeholder="••••••••"
            />

            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              required
              placeholder="••••••••"
            />

            <div className="mb-6">
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  className="mt-1 mr-2 w-4 h-4 rounded border-parchment-dark text-burgundy focus:ring-burgundy"
                  required
                />
                <span className="text-sm text-ink-light group-hover:text-ink">
                  I agree to the{' '}
                  <Link to="/terms" className="text-burgundy hover:text-burgundy-dark font-semibold">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/privacy"
                    className="text-burgundy hover:text-burgundy-dark font-semibold"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-ink-light">
              Already have an account?{' '}
              <Link to="/login" className="text-burgundy hover:text-burgundy-dark font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
