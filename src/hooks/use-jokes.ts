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
  const [value, setValue] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const fetchJokesCallback = useCallback(fetchJokes, []);
  const { refetch } = useQuery({
    queryKey: ["jokes", value],
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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);

      startTransition(() => {
        debouncedRefetch();
      });
    },
    [setValue]
  );

  return {
    handleChange,
    isPending,
  };
};

export default useSearchJokes;
