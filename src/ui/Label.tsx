import { useTheme } from "../context/ThemeContext";
import { getLinkStyle } from "../utils/styleUtils";
import { LabelProps } from "../types/types";

export default function Label({
  children,
  variant = "tag",
  size = "medium",
  className = "",
}: LabelProps) {
  const { isDark } = useTheme();

  // Base classes for all labels
  const baseClasses = "rounded-full font-medium";

  // Size variations
  const sizeClasses = {
    small: "text-xs px-2 py-0.5",
    medium: "text-sm px-3 py-1",
    large: "text-sm px-3 py-1 sm:px-4 sm:py-1.5",
  };

  // Get primary color
  const primaryColor = getLinkStyle(isDark);

  // Styling based on dark/light mode and variant
  const variantClasses = isDark
    ? {
        tag: "bg-[var(--nadry-primary)]/20 border border-[var(--nadry-primary)]/30",
        featured: "bg-[var(--nadry-primary)]/20",
        sponsored: "bg-[var(--nadry-primary)]/15",
      }[variant]
    : {
        tag: "bg-[var(--nadry-primary-lighter)]",
        featured: "bg-[var(--nadry-primary)]/10",
        sponsored: "bg-[var(--nadry-primary)]/10",
      }[variant];

  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses} ${primaryColor} ${className}`}
    >
      {children}
    </span>
  );
}
