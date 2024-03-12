"use client";
import Cards from "@/components/cards";
import useSearchJokes from "@/hooks/use-jokes";
import { Input } from "@/components/ui/input";
import Loader from "@/components/loader";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useDeferredValue } from "react";

export default function Home() {
  const state = useAppSelector((state) => state.joke);
  const deferredJokes = useDeferredValue(state.jokes);
  const { handleChange, isPending } = useSearchJokes();
  return (
    <main className="flex flex-col items-center justify-center mt-[128px]">
      <div className="max-w-[626px] w-full px-3 sm:px-0">
        <Input
          autoFocus
          onChange={handleChange}
          placeholder="Search jokes..."
        />
      </div>

      {isPending ? (
        <Loader />
      ) : (
        <Cards
          jokes={deferredJokes}
          isLoading={state.isLoading}
          error={state.error}
        />
      )}
    </main>
  );
}
