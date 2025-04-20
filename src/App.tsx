import { useEffect, useState, useRef } from "react";
import logoLight from "./assets/logo_light.png";
import logoDark from "./assets/logo_dark.png";
import Button from "./ui/Button";

function App() {
  const [dark, setDark] = useState(() => {
    // Prefer saved theme, then system preference
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    // Set or remove .dark class on <html>
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors ${
        dark ? "text-[#faffff]" : "text-[#2a3c4b]"
      }`}
      style={{
        background: dark ? "var(--nadry-bg-dark)" : "var(--nadry-bg-light)",
      }}
    >
      <span className="fixed top-6 right-6 z-10">
        <Button
          onClick={() => setDark((d) => !d)}
          type="theme"
          darkTheme={dark}
        >
          <span className="text-xl">{dark ? "🌙" : "☀️"}</span>
        </Button>
      </span>


      <div className="flex flex-col items-center w-full px-4">
        {/* <img
          src={dark ? logoDark : logoLight}
          alt="Nadry+ Logo"
          className="w-70 mb-6  animate-fade-in"
          draggable={false}
        /> */}

        <form className="w-full flex flex-col items-center gap-6">
          <div className="relative flex justify-center w-full">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                dark ? "Search Nadry+ in the dark..." : "Search Nadry+..."
              }
              className={`pl-8 pr-8 py-5 rounded-4xl text-xl focus:outline-none focus:ring-1 transition-all duration-500 mx-0
                max-w-[80vw] shadow-sm
                ${
                  dark
                    ? "bg-[#2d1400] text-[#faffff] border-1 border-[#e6f0fa] focus:ring-[#e6f0fa] focus:border-[#e6f0fa] placeholder-[#faffff]"
                    : "bg-white text-[#2a3c4b] border-1 border-[#ff9800] focus:ring-[#ff9800] focus:border-[#ff9800] placeholder-[#2a3c4b]"
                }
                ${
                  dark
                    ? "shadow-[0_4px_32px_0_#0008]"
                    : "shadow-[0_4px_32px_0_#ff980022]"
                }
                ${
                  inputFocused || query.trim()
                    ? "w-[48rem] shadow-lg"
                    : "w-[32rem]"
                }
                transition-colors transition-background transition-border transition-width
              `}
              autoComplete="off"
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              style={{
                transition:
                  "background 0.5s, color 0.5s, border 0.5s, width 0.3s",
              }}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setQuery("")}
              darkTheme={dark}
              isShown={query.trim() != ""}
              key={"Clear_Btn"}
              type={"generic"}
            >
              Clear
            </Button>
            <Button
              onClick={() => {
                alert(query);
              }}
              darkTheme={dark}
              isShown={query.trim() != ""}
              key={"Search_Btn"}
              type={"generic"}
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      <footer className="absolute bottom-4 w-full flex flex-col items-center">
        <div
          className={`italic inline-block uppercase ${
            !dark ? "text-[#2a3c4b]" : "text-[#faffff]"
          } px-8 py-3 rounded-full font-bold text-lg select-none tracking-[0.3rem] mb-2`}
        >
          Find smarter
        </div>
        <div
          className={`text-sm select-none ${
            !dark ? "text-[#2a3c4b]" : "text-[#faffff]"
          }`}
        >
          © {new Date().getFullYear()} Nadry+ &middot;{" "}
          <a
            href="#"
            className={`underline ${
              !dark ? "text-[#2a3c4b]" : "text-[#faffff]"
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
