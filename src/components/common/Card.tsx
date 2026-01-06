import React from 'react';

/**
 * Card component props
 */
interface CardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  gradient?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Modern Card component with warm parchment styling
 *
 * @example
 * <Card hoverable gradient onClick={handleClick}>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </Card>
 */
export function Card({
  children,
  hoverable = false,
  gradient = false,
  onClick,
  className = '',
}: CardProps) {
  const baseClasses = gradient
    ? 'card-gradient'
    : 'bg-parchment backdrop-blur-sm rounded-2xl shadow-warm-lg border border-parchment-dark p-6';

  const hoverClasses = hoverable
    ? 'hover:shadow-warm-xl hover:-translate-y-1 hover:border-gold/50 transition-all duration-300 cursor-pointer hover-glow'
    : 'transition-all duration-300';

  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}
