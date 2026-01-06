import React from 'react';

/**
 * Button component props
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * Modern Button component with Hogwarts-inspired styling
 *
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click Me
 * </Button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    'rounded-xl font-sans font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-burgundy to-burgundy-dark text-parchment-light hover:from-burgundy-dark hover:to-burgundy shadow-lg shadow-burgundy/20 hover:shadow-xl hover:shadow-burgundy/30 focus:ring-burgundy/20',
    secondary:
      'bg-warm-white text-ink hover:bg-parchment-light shadow-warm-md hover:shadow-warm-lg border-2 border-parchment-dark hover:border-gold focus:ring-gold/20',
    danger:
      'bg-gradient-to-r from-rose-600 to-rose-700 text-white hover:from-rose-700 hover:to-rose-800 shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 focus:ring-rose-500/20',
    gradient:
      'bg-gradient-to-r from-gold to-gold-light text-ink hover:from-gold-light hover:to-gold shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/40 focus:ring-gold/20',
    outline:
      'bg-transparent text-burgundy hover:bg-parchment-light border-2 border-burgundy hover:border-burgundy-dark focus:ring-burgundy/20',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
