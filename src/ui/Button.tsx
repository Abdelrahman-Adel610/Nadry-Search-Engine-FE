type ButtonProps = {
  children: string | React.ReactNode;
  onClick?: () => void;
  isShown?: boolean;
  darkTheme?: boolean;
  classes?: string;
  type: keyof typeof Btn; // <-- fix here
};
const base =
  "py-2 text-xl font-medium transition transform duration-200 active:scale-95 hover:scale-105 focus:scale-105 cursor-pointer border-2 focus:outline-none focus:ring-1 hover:tracking-wide";
const Btn = {
  theme:
    "fixed top-6 right-6 z-10 p-2 rounded-full shadow-lg hover:scale-110 transition-transform ",
  generic: "px-10 rounded-4xl",
};
const theme = {
  true: "bg-transparent text-[#faffff] border-[#e6f0fa] focus:ring-[#e6f0fa] focus:border-[#e6f0fa] hover:bg-[#5d3200]/80",
  false:
    "bg-transparent text-[#2a3c4b] border-[#ff9800] focus:ring-[#ff9800] focus:border-[#ff9800] hover:bg-[var(--nadry-orange-light)",
};

export default function Button({
  children,
  onClick,
  isShown = true,
  darkTheme,
  type,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${base}
                ${isShown ? "opacity-100" : "opacity-0 pointer-events-none"}
                ${theme[darkTheme ? "true" : "false"]}
                ${Btn[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
