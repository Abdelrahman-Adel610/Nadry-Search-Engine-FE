/**
 * Common styling utilities to reduce code duplication
 */

/**
 * Returns styles for secondary button (outlined style)
 */
export const getSecondaryButtonStyle = (isDark: boolean): string => {
  return isDark
    ? "text-[var(--nadry-text-dark)]/80 border-[var(--nadry-border-dark)]/30 hover:bg-[var(--nadry-bg-dark-accent)]"
    : "text-gray-600 border-[var(--nadry-primary-lighter)] hover:bg-[var(--nadry-primary-lighter)]/30";
};

/**
 * Returns styles for primary button (filled style)
 */
export const getPrimaryButtonStyle = (isDark: boolean): string => {
  return isDark
    ? "bg-[var(--nadry-primary)] text-[var(--nadry-bg-dark)] hover:bg-[var(--nadry-primary)]/90"
    : "bg-[var(--nadry-primary)] text-white hover:bg-[var(--nadry-primary)]/90";
};

/**
 * Returns all styles for button components based on type and variant
 */
export const getButtonStyle = (
  isDark: boolean,
  styleType: "theme" | "generic",
  isSecondary: boolean = false,
  isShown: boolean = true
): string => {
  // Base button styles
  const baseStyles =
    "py-2 text-xl font-medium transition transform duration-200 active:scale-95 hover:scale-105 focus:scale-105 cursor-pointer border-2 focus:outline-none focus:ring-1 hover:tracking-wide";

  // Style-specific classes
  const styleClasses = {
    theme: "p-2 rounded-full shadow-lg hover:scale-110 transition-transform",
    generic: "px-10 rounded-full",
  };

  // Get color styles based on primary/secondary variant
  const colorStyles = isSecondary
    ? getSecondaryButtonStyle(isDark)
    : getPrimaryButtonStyle(isDark);

  // Combine all styles
  return `
    ${baseStyles}
    ${isShown ? "opacity-100" : "opacity-0 pointer-events-none"}
    ${colorStyles}
    ${styleClasses[styleType]}
  `;
};

/**
 * Returns styles for container backgrounds
 */
export const getContainerStyle = (
  isDark: boolean,
  isFeatured = false,
  isSponsored = false
): string => {
  if (isDark) {
    return isSponsored
      ? "bg-[var(--nadry-bg-dark)] border border-[var(--nadry-primary)]/30 hover:shadow-md hover:shadow-[var(--nadry-primary)]/20"
      : isFeatured
      ? "bg-[var(--nadry-bg-dark)] border-2 border-[var(--nadry-primary)]/30 hover:shadow-[var(--nadry-primary)]/20"
      : "bg-[var(--nadry-bg-dark-accent)] hover:shadow-md hover:shadow-[var(--nadry-primary)]/20";
  } else {
    return isSponsored
      ? "bg-[var(--nadry-result-sponsored-bg)] border-2 border-[var(--nadry-result-sponsored-border)] hover:shadow-lg hover:shadow-[var(--nadry-result-hover-shadow)]"
      : isFeatured
      ? "bg-[var(--nadry-featured-bg)] border-2 border-[var(--nadry-result-sponsored-border)] hover:shadow-[var(--nadry-result-hover-shadow)]"
      : "bg-[var(--nadry-result-bg)] border border-[var(--nadry-result-bg-border)] hover:shadow-lg hover:shadow-[var(--nadry-result-hover-shadow)]";
  }
};

/**
 * Returns styles for text content
 */
export const getTextStyle = (isDark: boolean, isSecondary = false): string => {
  return isDark
    ? `text-[var(--nadry-text-dark)]${isSecondary ? "/70" : ""}`
    : `text-${isSecondary ? "gray-600" : "gray-700"}`;
};

/**
 * Returns styles for links
 */
export const getLinkStyle = (isDark: boolean): string => {
  return isDark
    ? "text-[var(--nadry-primary-light)]"
    : "text-[var(--nadry-primary)]";
};

/**
 * Returns styles for borders
 */
export const getBorderStyle = (isDark: boolean): string => {
  return isDark
    ? "border-[var(--nadry-border-dark)]/20"
    : "border-[var(--nadry-primary-lighter)]";
};

/**
 * Returns styles for card backgrounds
 */
export const getCardStyle = (isDark: boolean): string => {
  return isDark
    ? "bg-[var(--nadry-bg-dark-accent)] border border-[var(--nadry-border-dark)]/20"
    : "bg-white border border-[var(--nadry-primary-lighter)] shadow-sm";
};

/**
 * Returns styles for headers section backgrounds
 */
export const getHeaderStyle = (isDark: boolean): string => {
  return isDark
    ? "bg-[var(--nadry-bg-dark-accent)] border-b border-[var(--nadry-border-dark)]/20"
    : "bg-[var(--nadry-primary-lighter)] border-b border-[var(--nadry-primary-lighter)]/20";
};

/**
 * Returns styles for icon backgrounds
 */
export const getIconBgStyle = (
  isDark: boolean,
  isSponsored = false
): string => {
  return isDark
    ? "bg-[var(--nadry-bg-dark)] border border-[var(--nadry-primary)]/30"
    : isSponsored
    ? "bg-[var(--nadry-primary-lighter)]"
    : "bg-[var(--nadry-result-icon-bg)]";
};

/**
 * Returns styles for tab elements
 */
export const getTabStyle = (isDark: boolean, isActive: boolean): string => {
  return isActive
    ? isDark
      ? "border-[var(--nadry-primary)] text-[var(--nadry-primary-light)]"
      : "border-[var(--nadry-primary)] text-[var(--nadry-primary)]"
    : isDark
    ? "border-transparent text-[var(--nadry-text-dark)]/70 hover:text-[var(--nadry-text-dark)]"
    : "border-transparent text-gray-600 hover:text-gray-900";
};

/**
 * Returns styles for pagination buttons
 */
export const getPaginationButtonStyle = (
  isDark: boolean,
  isActive: boolean,
  isDisabled: boolean
): string => {
  if (isDisabled) {
    return isDark
      ? "text-gray-500 cursor-not-allowed bg-[var(--nadry-bg-dark)] border border-[var(--nadry-border-dark)]"
      : "text-gray-300 cursor-not-allowed bg-[var(--nadry-primary-lighter)] border border-[var(--nadry-primary-lighter)]";
  }

  if (isActive) {
    return isDark
      ? "bg-[var(--nadry-primary)] text-[var(--nadry-bg-dark)] border border-[var(--nadry-primary)] shadow"
      : "bg-[var(--nadry-primary)] text-white border border-[var(--nadry-primary)] shadow";
  }

  return isDark
    ? "text-[var(--nadry-primary-light)] hover:bg-[var(--nadry-bg-dark)] hover:text-[var(--nadry-primary-light)] border border-transparent"
    : "text-[var(--nadry-primary)] hover:bg-[var(--nadry-primary-lighter)] hover:text-[var(--nadry-primary)] border border-transparent";
};

/**
 * Returns styles for form inputs
 */
export const getInputStyle = (isDark: boolean): string => {
  return isDark
    ? "bg-transparent text-[var(--nadry-text-dark)] placeholder-[var(--nadry-placeholder-dark)]/70 focus:ring-[var(--nadry-primary-light)]"
    : "bg-transparent text-[var(--nadry-text-light)] placeholder-[var(--nadry-placeholder-light)]/70 focus:ring-[var(--nadry-primary)]";
};

/**
 * Returns styles for section dividers
 */
export const getDividerStyle = (isDark: boolean): string => {
  return isDark
    ? "border-[var(--nadry-border-dark)]/30"
    : "border-[var(--nadry-primary-lighter)]/40";
};

/**
 * Returns styles for badges
 */
export const getBadgeStyle = (isDark: boolean, isActive = false): string => {
  return isDark
    ? isActive
      ? "bg-[var(--nadry-primary)]/20 text-[var(--nadry-primary-light)]"
      : "bg-[var(--nadry-bg-dark)] text-[var(--nadry-text-dark)]"
    : isActive
    ? "bg-[var(--nadry-primary)]/10 text-[var(--nadry-primary)]"
    : "bg-gray-100 text-gray-700";
};

/**
 * Returns styles for tooltips
 */
export const getTooltipStyle = (isDark: boolean): string => {
  return isDark
    ? "bg-[var(--nadry-bg-dark)] text-[var(--nadry-text-dark)] border border-[var(--nadry-border-dark)]"
    : "bg-white text-gray-800 border border-gray-200 shadow-sm";
};

/**
 * Returns styles for sidebar widget headers
 */
export const getSidebarHeaderStyle = (isDark: boolean): string => {
  return `p-4 border-b ${getBorderStyle(isDark)}`;
};

/**
 * Returns styles for sidebar item buttons
 */
export const getSidebarItemStyle = (isDark: boolean): string => {
  return `w-full text-left px-3 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
    isDark
      ? "hover:bg-[var(--nadry-bg-dark)] text-[var(--nadry-text-dark)]/80"
      : "hover:bg-[var(--nadry-primary-lighter)] text-gray-600"
  }`;
};

/**
 * Returns styles for sidebar widget footers
 */
export const getSidebarFooterStyle = (isDark: boolean): string => {
  return `p-4 border-t ${getBorderStyle(isDark)}`;
};

/**
 * Returns styles for suggestion buttons
 */
export const getSuggestionButtonStyle = (isDark: boolean): string => {
  return isDark
    ? "bg-[var(--nadry-bg-dark)] text-[var(--nadry-primary-light)] border border-[var(--nadry-primary)]/30 hover:bg-[var(--nadry-bg-dark-accent)]"
    : "bg-[var(--nadry-primary-lighter)] text-[var(--nadry-primary)] hover:bg-[var(--nadry-primary-lighter)]/70";
};

/**
 * Returns styles for visit link button in result items
 */
export const getVisitButtonStyle = (isDark: boolean): string => {
  return isDark
    ? "bg-[var(--nadry-primary)]/20 text-[var(--nadry-primary-light)] hover:bg-[var(--nadry-primary)]/30"
    : "bg-[var(--nadry-primary)]/10 text-[var(--nadry-primary)] hover:bg-[var(--nadry-primary)]/20";
};
