import logoLight from "@/assets/logo_light.png";
import logoDark from "@/assets/logo_dark.png";

export default function Logo({ dark }: { dark: boolean }) {
  return (
    <div>
      <img
        src={dark ? logoDark : logoLight}
        alt="Nadry+ Logo"
        className="w-70 m-0 animate-fade-in"
        draggable={false}
      />
    </div>
  );
}
