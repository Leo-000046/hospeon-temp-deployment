import React from 'react';
import { cn } from '@/lib/cn';
interface MonoNumberProps {
  children: React.ReactNode;
  className?: string;
  weight?: 'normal' | 'medium' | 'semibold';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
}
const sizeMap = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl'
};
const weightMap = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold'
};
export function MonoNumber({
  children,
  className,
  weight = 'normal',
  size = 'base'
}: MonoNumberProps) {
  return (
    <span
      className={cn(
        'font-mono tabular-nums',
        sizeMap[size],
        weightMap[weight],
        className
      )}>
      
      {children}
    </span>);

}
interface MoneyTextProps {
  amount: number;
  currency?: string;
  className?: string;
  size?: MonoNumberProps['size'];
  weight?: MonoNumberProps['weight'];
}
export function MoneyText({
  amount,
  currency = '₹',
  className,
  size,
  weight
}: MoneyTextProps) {
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(Math.abs(amount));
  const negative = amount < 0;
  return (
    <MonoNumber size={size} weight={weight} className={className}>
      {negative ? '−' : ''}
      {currency}
      {formatted}
    </MonoNumber>);

}