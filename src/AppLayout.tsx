import { Outlet } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import ThemeSwitcher from "./ui/ThemeSwitcher";

export default function AppLayout() {
  const { isDark, themeColor } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
        isDark ? "bg-[var(--nadry-bg-dark)]" : "bg-[var(--nadry-bg-light)]"
      } text-[var(--nadry-text)]`}
      data-theme={themeColor}
    >
      <ThemeSwitcher />
      <Outlet />
    </div>
  );
}
