import { useEffect, useState } from "react";
import Logo from "../../ui/Logo";
import { HomeLogoProps } from "../../types/types";

export default function HomeLogo({ onAnimationComplete }: HomeLogoProps) {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    // Start with small logo that expands
    const stage1 = setTimeout(() => {
      setAnimationStage(1);
    }, 300);

    // Add the shine effect
    const stage2 = setTimeout(() => {
      setAnimationStage(2);
    }, 800);

    // Complete animation
    const stage3 = setTimeout(() => {
      setAnimationStage(3);
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 1500);

    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
    };
  }, [onAnimationComplete]);

  return (
    <div
      className={`relative transition-all duration-500 ease-out ${
        animationStage === 0
          ? "scale-90 opacity-80"
          : animationStage === 1
          ? "scale-105 opacity-100"
          : "scale-100 opacity-100"
      }`}
    >
      <div className={animationStage >= 2 ? "logo-shine" : ""}>
        <Logo
          size="large"
          animated={false}
          withTagline={animationStage >= 1}
          tag="Search smarter"
        />
      </div>
    </div>
  );
}
