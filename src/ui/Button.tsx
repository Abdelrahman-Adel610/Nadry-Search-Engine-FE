type ButtonProps = {
  children: string | React.ReactNode;
  onClick?: () => void;
  isShown?: boolean;
  darkTheme?: boolean;
  classes?: string;
  style: keyof typeof Btn;
  type?: "reset" | "button" | "submit";
};
const base =
  "py-2 text-xl font-medium transition transform duration-200 active:scale-95 hover:scale-105 focus:scale-105 cursor-pointer border-2 focus:outline-none focus:ring-1 hover:tracking-wide";
const Btn = {
  theme:
    "fixed bottom-6 right-6 z-10 p-2 rounded-full shadow-lg hover:scale-110 transition-transform ",
  generic: "px-10 rounded-4xl",
};
const theme = {
  true: "bg-transparent text-[var(--nadry-text)] border-[var(--nadry-border)] focus:ring-[var(--nadry-border)] focus:border-[var(--nadry-border)] hover:bg-[var(--nadry-bg-accent)]",
  false:
    "bg-transparent text-[var(--nadry-text)] border-[var(--nadry-border)] focus:ring-[var(--nadry-border)] focus:border-[var(--nadry-border)] hover:bg-[var(--nadry-orange-light)]",
};

export default function Button({
  children,
  onClick,
  isShown = true,
  darkTheme,
  style,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base}
                ${isShown ? "opacity-100" : "opacity-0 pointer-events-none"}
                ${theme[darkTheme ? "true" : "false"]}
                ${Btn[style]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
