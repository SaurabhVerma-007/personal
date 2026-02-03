import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KawaiiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function KawaiiButton({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  ...props 
}: KawaiiButtonProps) {
  
  const variants = {
    primary: "bg-primary text-white border-b-4 border-primary/50 hover:border-primary/70 active:border-b-0 active:translate-y-1",
    secondary: "bg-white text-primary border-2 border-primary/20 hover:bg-primary/5 active:scale-95",
    danger: "bg-gray-400 text-white border-b-4 border-gray-600 hover:bg-gray-500 active:border-b-0 active:translate-y-1",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-xl",
    md: "px-6 py-3 text-base rounded-2xl",
    lg: "px-8 py-4 text-lg font-bold rounded-2xl",
    xl: "px-10 py-5 text-xl font-bold rounded-3xl",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "font-handwriting font-bold shadow-lg transition-colors flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
