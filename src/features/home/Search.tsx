import Logo from "../../ui/Logo";
import Button from "../../ui/Button";
import SearchBar from "../../ui/SearchBar";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAddSug from "../../Hooks/useAddSug";

export default function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { mutate: addSug } = useAddSug();

  function submitHandler(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    addSug(query);
    const searchParams = new URLSearchParams();
    searchParams.set("query", query);
    navigate(`/search?${searchParams.toString()}`);
  }

  return (
    <form
      className="w-full flex flex-col items-center gap-4 sm:gap-6"
      onSubmit={submitHandler}
    >
      <div className="mb-1 sm:mb-2">
        <Logo size="large" withTagline={true} tag="Search smarter" />
      </div>

      <div className="relative flex justify-center w-full max-w-[36rem]">
        <SearchBar foncusOnMount={true} query={query} setQuery={setQuery} />
      </div>

      <div className="flex gap-2 z-10 mt-2 sm:mt-4">
        <Button
          onClick={() => {
            setQuery("");
          }}
          isShown={query.trim() !== ""}
          key={"Clear_Btn"}
          style={"generic"}
          type="reset"
        >
          Clear
        </Button>
        <Button
          isShown={query.trim() !== ""}
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
