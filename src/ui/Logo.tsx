import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { getTextStyle } from "../utils/styleUtils";

import logoLightBlue from "../assets/logo_light_blue.png";
import logoDarkBlue from "../assets/logo_dark_blue.png";
import logoLightOrange from "../assets/logo_light_orange.png";
import logoDarkOrange from "../assets/logo_dark_orange.png";
import logoLightDefault from "../assets/logo_light_blue.png";
import logoDarkDefault from "../assets/logo_dark_blue.png";
import { LogoProps } from "../types/types";

export default function Logo({
  size = "medium",
  animated = true,
  withTagline = false,
  className = "",
  linkTo,
  tag = "",
}: LogoProps) {
  const { isDark, themeColor } = useTheme();

  const getLogo = () => {
    if (isDark) {
      switch (themeColor) {
        case "blue":
          return logoDarkBlue;
        case "orange":
          return logoDarkOrange;
        case "default":
          return logoDarkDefault;
        default:
          return logoDarkBlue;
      }
    } else {
      switch (themeColor) {
        case "blue":
          return logoLightBlue;
        case "orange":
          return logoLightOrange;
        case "default":
          return logoLightDefault;
        default:
          return logoLightBlue;
      }
    }
  };

  const sizeClasses = {
    small: "h-18 md:h-18",
    medium: "h-32 md:h-32",
    large: "h-40 md:h-62",
  };

  const logoSrc = getLogo();

  const animationClass = animated ? "animate-fade-in" : "";

  const logoElement = (
    <div className={`flex flex-col items-center ${className}`}>
      <img
        src={logoSrc}
        alt="Nadry+ Logo"
        className={`${sizeClasses[size]} ${animationClass} object-contain m-0`}
        draggable={false}
      />

      {withTagline && (
        <span
          className={`mt-1 text-xs md:text-sm italic ${getTextStyle(
            isDark,
            true
          )}`}
        >
          {tag}
        </span>
      )}
    </div>
  );

  return linkTo ? <Link to={linkTo}>{logoElement}</Link> : logoElement;
}
