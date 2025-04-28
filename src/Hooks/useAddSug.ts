import { useMutation } from "@tanstack/react-query";
import searchService from "../Api/searchService";

export default function useAddSug() {
  const { mutate } = useMutation({
    mutationFn: (query: string) => searchService.addTosugs(query),
  });
  return { mutate };
}
