import { useState } from "react";
import Search from "./Search";
import HomeLogo from "./HomeLogo";
import HomePageFooter from "./HomePageFooter";

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center w-full px-4 pb-24">
        {showAnimation && !animationComplete ? (
          <HomeLogo
            onAnimationComplete={() => {
              setAnimationComplete(true);
              setTimeout(() => setShowAnimation(false), 200);
            }}
          />
        ) : (
          <Search />
        )}
      </div>

      <HomePageFooter />
    </>
  );
}
