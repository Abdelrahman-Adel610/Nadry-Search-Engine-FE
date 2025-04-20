import Logo from "../../ui/Logo";
import Button from "../../ui/Button";
import SerchBar from "../../ui/SerchBar";
import { useState } from "react";

export default function Search({ dark }: { dark: boolean }) {
  const [query, setQuery] = useState("");
  return (
    <form className="w-full flex flex-col items-center gap-6">
      <Logo dark={dark} />
      <div className="relative flex justify-center w-full">
        <SerchBar
          foncusOnMount={true}
          isDarkMode={dark}
          query={query}
          setQuery={setQuery}
        />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            setQuery("");
          }}
          darkTheme={dark}
          isShown={query.trim() != ""}
          key={"Clear_Btn"}
          style={"generic"}
          type="reset"
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
          style={"generic"}
          type="submit"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
