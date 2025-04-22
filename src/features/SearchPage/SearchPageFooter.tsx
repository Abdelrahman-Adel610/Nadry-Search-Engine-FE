import { getTextStyle, getLinkStyle } from "../../utils/styleUtils";

export default function SearchPageFooter({
  isDarkMode,
}: {
  isDarkMode: boolean;
}) {
  return (
    <footer
      className={`py-6 sm:py-8 mt-8 text-center mb-10
        rounded-3xl  ${
          isDarkMode
            ? "bg-[var(--nadry-bg-dark-accent)]"
            : "bg-[var(--nadry-primary-lighter)]/30"
        }`}
    >
      <div className="container mx-auto max-w-6xl md:rounded-3xl md:py-4">
        <p className={`text-sm ${getTextStyle(isDarkMode)}`}>
          © {new Date().getFullYear()} Nadry+ · Search smarter, not harder
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href="#"
            className={`text-sm hover:underline ${getLinkStyle(isDarkMode)}`}
          >
            About
          </a>
          <a
            href="#"
            className={`text-sm hover:underline ${getLinkStyle(isDarkMode)}`}
          >
            Privacy
          </a>
          <a
            href="#"
            className={`text-sm hover:underline ${getLinkStyle(isDarkMode)}`}
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
