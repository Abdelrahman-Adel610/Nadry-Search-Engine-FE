import { useTheme } from "../context/ThemeContext";
import { ButtonProps } from "../types/types";
import { getButtonStyle } from "../utils/styleUtils";

export default function Button({
  children,
  onClick,
  isShown = true,
  style,
  type = "button",
}: ButtonProps) {
  // Get global theme from context
  const { isDark, themeColor } = useTheme();

  const buttonClassName = getButtonStyle(
    isDark,
    style,
    style === "theme",
    isShown
  );

  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={onClick}
      data-theme={themeColor}
    >
      {children}
    </button>
  );
}
