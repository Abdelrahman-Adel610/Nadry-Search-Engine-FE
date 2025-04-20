import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  return <div className="font-extrabold text-4xl">{query}</div>;
}
