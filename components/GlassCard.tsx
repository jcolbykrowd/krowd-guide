import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  hoverable = false 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white/5 
        backdrop-blur-xl 
        border border-white/10 
        rounded-2xl 
        overflow-hidden
        transition-all duration-300
        ${hoverable ? `
          hover:bg-white/10 
          hover:border-[#FF2E63]/20 
          hover:shadow-[0_0_30px_rgba(255,46,99,0.15)] 
          hover:scale-[1.02]
          active:scale-[0.98]
          cursor-pointer
        ` : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
