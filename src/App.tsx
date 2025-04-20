import { useEffect, useState } from "react";
import logoLight from "./assets/logo_light.png";
import logoDark from "./assets/logo_dark.png";
import Button from "./ui/Button";
import SerchBar from "./ui/SerchBar";

function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved == "dark";
    if (saved === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors ${
        dark ? "dark" : ""
      } text-[var(--nadry-text)]`}
      style={{
        background: dark ? "var(--nadry-bg-dark)" : "var(--nadry-bg-light)",
      }}
    >
      <Button onClick={() => setDark((d) => !d)} style="theme" darkTheme={dark}>
        <span className="text-xl">{dark ? "🌙" : "☀️"}</span>
      </Button>

      <div className="flex flex-col items-center w-full px-4">
        <form className="w-full flex flex-col items-center gap-6">
          <img
            src={dark ? logoDark : logoLight}
            alt="Nadry+ Logo"
            className="w-70 m-0 animate-fade-in"
            draggable={false}
          />
          <div className="relative flex justify-center w-full">
            <SerchBar foncusOnMount={true} isDarkMode={dark} />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                // setQuery("")
              }}
              darkTheme={dark}
              isShown={
                true
                // query.trim() != ""
              }
              key={"Clear_Btn"}
              style={"generic"}
              type="reset"
            >
              Clear
            </Button>
            <Button
              onClick={() => {
                // alert(query);
              }}
              darkTheme={dark}
              isShown={
                true
                // query.trim() != ""
              }
              key={"Search_Btn"}
              style={"generic"}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
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
    </div>
  );
}

export default App;
