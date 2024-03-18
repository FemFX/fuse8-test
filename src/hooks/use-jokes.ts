import { useCallback, useState, useTransition } from "react";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { clearJokes } from "@/store/features/jokes/joke.slice";
import debounce from "lodash.debounce";
import { useActions } from "./use-actions";

const useSearchJokes = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { fetchJokes } = useActions();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<string>("");
  const fetchJokesCallback = useCallback(fetchJokes, [fetchJokes]);
  const { refetch } = useQuery({
    queryKey: ["jokes"],
    queryFn: async () => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      if (value.length <= 3) {
        dispatch(clearJokes());
        return {};
      }
      const result = fetchJokesCallback(value);
      return result;
    },
    enabled: false,
  });

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch({ cancelRefetch: true });
    }, 400),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setValue(e.target.value);
      debouncedRefetch();
    });
  };

  return {
    handleChange,
    isPending,
  };
};

export default useSearchJokes;
