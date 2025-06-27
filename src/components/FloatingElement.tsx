
import React from 'react';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  className = "", 
  delay = 0 
}) => {
  return (
    <div 
      className={`animate-float ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        transform: 'translateZ(0)', // Enable 3D rendering
      }}
    >
      {children}
    </div>
  );
};

export default FloatingElement;
