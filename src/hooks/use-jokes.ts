import { useCallback, useDeferredValue, useState } from "react";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useQuery } from "@tanstack/react-query";
import { clearJokes } from "@/store/features/jokes/joke.slice";
import debounce from "lodash.debounce";
import { useActions } from "./use-actions";

const useSearchJokes = () => {
  const dispatch = useAppDispatch();
  const { fetchJokes } = useActions();
  const [value, setValue] = useState<string>("");
  const valueDeferred = useDeferredValue<string>(value);

  const { refetch } = useQuery({
    queryKey: ["jokes"],
    queryFn: async () => {
      if (valueDeferred.length <= 3) {
        dispatch(clearJokes());
        return {};
      }
      const result = await fetchJokes(valueDeferred);

      return result;
    },
    enabled: false,
  });
  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch();
    }, 400),
    [refetch]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      debouncedRefetch();
    },
    [debouncedRefetch]
  );

  return {
    value,
    handleChange,
  };
};

export default useSearchJokes;
