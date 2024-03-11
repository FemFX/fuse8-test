"use client";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";
import { useActions } from "@/hooks/use-actions";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState, useTransition } from "react";
import Cards from "@/components/cards";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { clearJokes } from "@/store/features/jokes/joke.slice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { fetchJokes } = useActions();
  const [value, setValue] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const request = debounce(async () => {
    refetch();
  }, 300);
  const debounceRequest = useCallback(() => {
    request();
  }, []);
  const { refetch } = useQuery({
    queryKey: ["jokes"],
    queryFn: async () => {
      if (search.length <= 3) {
        dispatch(clearJokes());
        return {};
      }
      const result = await fetchJokes(search);

      return result;
    },
    enabled: false,
  });

  return (
    <main className="flex flex-col items-center justify-center mt-[128px]">
      <div className="max-w-[626px] w-full px-3 sm:px-0">
        <Input
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            startTransition(() => {
              setSearch(e.target.value);
            });
            debounceRequest();
          }}
          placeholder="Search jokes..."
        />
      </div>
      {!isPending && <Cards value={search} />}
    </main>
  );
}
