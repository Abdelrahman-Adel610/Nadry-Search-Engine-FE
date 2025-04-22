import { useTheme } from "../../context/ThemeContext";
import { getTextStyle, getLinkStyle } from "../../utils/styleUtils";

export default function HomePageFooter() {
  const { isDark } = useTheme();

  return (
    <footer className="fixed bottom-4 w-full flex flex-col items-center">
      <div
        className={`italic inline-block uppercase ${getTextStyle(
          isDark
        )} px-8 py-3 rounded-full font-bold text-lg select-none tracking-[0.3rem] mb-2`}
      >
        Find smarter
      </div>
      <div className={`text-sm select-none ${getTextStyle(isDark)}`}>
        © {new Date().getFullYear()} Nadry+ &middot;{" "}
        <a href="#" className={`underline ${getLinkStyle(isDark)}`}>
          About
        </a>
      </div>
    </footer>
  );
}
