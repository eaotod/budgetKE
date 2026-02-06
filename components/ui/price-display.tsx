import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  comparePrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showSavings?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

const compareSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export function PriceDisplay({
  price,
  comparePrice,
  currency = "KES",
  size = "md",
  showSavings = true,
  className,
}: PriceDisplayProps) {
  const hasDiscount = comparePrice && comparePrice > price;
  const savings = hasDiscount ? comparePrice - price : 0;
  const savingsPercent = hasDiscount
    ? Math.round((savings / comparePrice) * 100)
    : 0;

  const formatPrice = (amount: number) => {
    return amount.toLocaleString("en-KE");
  };

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className={cn("font-bold text-gray-900", sizeClasses[size])}>
        {currency} {formatPrice(price)}
      </span>

      {hasDiscount && (
        <>
          <span
            className={cn(
              "text-gray-400 line-through",
              compareSizeClasses[size]
            )}
          >
            {currency} {formatPrice(comparePrice)}
          </span>

          {showSavings && (
            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
              Save {savingsPercent}%
            </span>
          )}
        </>
      )}
    </div>
  );
}

// Compact version for cards
export function PriceCompact({
  price,
  comparePrice,
  currency = "KES",
  className,
}: {
  price: number;
  comparePrice?: number;
  currency?: string;
  className?: string;
}) {
  const hasDiscount = comparePrice && comparePrice > price;

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className="text-lg font-bold text-gray-900">
        {currency} {price.toLocaleString("en-KE")}
      </span>
      {hasDiscount && (
        <span className="text-sm text-gray-400 line-through">
          {currency} {comparePrice.toLocaleString("en-KE")}
        </span>
      )}
    </div>
  );
}
