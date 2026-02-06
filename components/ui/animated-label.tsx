import { cn } from "@/lib/utils";

interface AnimatedLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedLabel({ children, className }: AnimatedLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest mb-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
