import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  animated = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full h-2 bg-neutral-800 rounded-full overflow-hidden", className)}>
      <div
        className={cn(
          "h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-500",
          animated && "animate-pulse"
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
