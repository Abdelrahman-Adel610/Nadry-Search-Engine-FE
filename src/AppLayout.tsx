import Button from "./ui/Button";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dark = location.hash === "#dark";
  function toogleTheme() {
    const searchParams = new URLSearchParams(location.search);
    const newHash = dark ? "#light" : "#dark";
    navigate(`${location.pathname}?${searchParams.toString()}${newHash}`);
  }
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors ${
        dark ? "dark" : ""
      } text-[var(--nadry-text)]`}
      style={{
        background: dark ? "var(--nadry-bg-dark)" : "var(--nadry-bg-light)",
      }}
    >
      <Button onClick={toogleTheme} style="theme" darkTheme={dark}>
        <span className="text-xl">{dark ? "🌙" : "☀️"}</span>
      </Button>
      <Outlet />
    </div>
  );
}
