import { useLocation } from "react-router-dom";
import Search from "./Search";

export default function Home() {
  const location = useLocation();
  const dark = location.hash === "#dark";
  return (
    <>
      <div className="flex flex-col items-center w-full px-4">
        <Search dark={dark} />
      </div>

      <footer className="absolute bottom-4 w-full flex flex-col items-center">
        <div
          className={`italic inline-block uppercase ${
            dark
              ? "text-[var(--nadry-text-dark)]"
              : "text-[var(--nadry-text-light)]"
          } px-8 py-3 rounded-full font-bold text-lg select-none tracking-[0.3rem] mb-2`}
        >
          Find smarter
        </div>
        <div
          className={`text-sm select-none ${
            dark
              ? "text-[var(--nadry-text-dark)]"
              : "text-[var(--nadry-text-light)]"
          }`}
        >
          © {new Date().getFullYear()} Nadry+ &middot;{" "}
          <a
            href="#"
            className={`underline ${
              dark
                ? "text-[var(--nadry-text-dark)]"
                : "text-[var(--nadry-text-light)]"
            }`}
          >
            About
          </a>
        </div>
      </footer>
    </>
  );
}
