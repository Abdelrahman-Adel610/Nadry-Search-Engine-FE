import { ReactNode } from "react";

export type resultItemType = {
  url: string;
  description: string;
  title: string;
};
export type ThemeMode = "dark" | "light";
export type ThemeColor = "blue" | "orange" | "default";
export type HomeLogoProps = {
  onAnimationComplete?: () => void;
};
export type ButtonProps = {
  children: string | React.ReactNode;
  onClick?: () => void;
  isShown?: boolean;
  style: "theme" | "generic";
  type?: "reset" | "button" | "submit";
};
export type RecommendationsProps = {
  filteredSuggestions: string[];
  moveDownHandler: (s: string) => void;
  isVisible: boolean;
};
export type FeaturedResultProps = {
  result: resultItemType;
};
export type FilterBarProps = {
  sortOrder: string;
  onSortChange: (order: string) => void;
};
export type Tab = {
  id: string;
  label: string;
  icon: string;
};
export type ResultsTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode?: boolean;
};
export type SponsoredResultsProps = {
  sponsoredResults: resultItemType[];
  isDarkMode: boolean;
};
export type SearchPageHeaderProps = {
  isDarkMode: boolean;
  displayQuery: string;
  setDisplayQuery: (query: string) => void;
  performSearch: (query: string) => void;
};
export type NoResultsProps = {
  query: string;
  isDarkMode?: boolean;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
};
export type ResultItemProbs = {
  item: resultItemType;
  isSponsored?: boolean;
};
export type LabelProps = {
  children: ReactNode;
  variant?: "tag" | "featured" | "sponsored";
  size?: "small" | "medium" | "large";
  className?: string;
};
export type LogoProps = {
  size?: "small" | "medium" | "large";
  animated?: boolean;
  withTagline?: boolean;
  className?: string;
  linkTo?: string;
  tag?: string;
};
export type ThemeContextType = {
  isDark: boolean;
  themeColor: ThemeColor;
  toggleDarkMode: () => void;
  setThemeColor: (color: ThemeColor) => void;
};
