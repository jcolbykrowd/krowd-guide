import React from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseStyles = `
    px-6 py-3.5 
    rounded-xl 
    font-bold 
    transition-all duration-300 
    flex items-center justify-center gap-2
    disabled:opacity-50 
    disabled:cursor-not-allowed
    active:scale-[0.98]
  `;
  
  const variants = {
    primary: `
      bg-gradient-to-r from-[#FF2E63] to-[#ff5f8a]
      text-white 
      hover:shadow-[0_0_30px_rgba(255,46,99,0.5)] 
      shadow-[0_0_20px_rgba(255,46,99,0.3)]
      hover:translate-y-[-2px]
    `,
    secondary: `
      bg-zinc-800/80 
      backdrop-blur-md
      text-white 
      border border-white/10
      hover:bg-zinc-700/80 
      hover:border-white/20
    `,
    ghost: `
      bg-transparent 
      text-white 
      border border-white/20 
      hover:bg-white/5
      hover:border-white/30
    `
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
