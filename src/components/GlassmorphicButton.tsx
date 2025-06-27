
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface GlassmorphicButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const GlassmorphicButton: React.FC<GlassmorphicButtonProps> = ({ 
  to, 
  children, 
  variant = 'primary' 
}) => {
  const baseClasses = "relative overflow-hidden backdrop-blur-sm transition-all duration-300 transform-gpu hover:scale-105 active:scale-95";
  
  const primaryClasses = "bg-gradient-to-r from-green-500/90 to-green-600/90 hover:from-green-600/95 hover:to-green-700/95 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/25 border-0";
  
  const secondaryClasses = "bg-white/80 hover:bg-white/90 text-green-700 border border-green-200/50 hover:border-green-300/50 shadow-lg hover:shadow-xl hover:shadow-green-500/10";

  return (
    <Button 
      asChild 
      size="lg" 
      className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses}`}
    >
      <Link to={to}>
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </Link>
    </Button>
  );
};

export default GlassmorphicButton;
