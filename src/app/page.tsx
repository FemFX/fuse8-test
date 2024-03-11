"use client";
import Cards from "@/components/cards";
import useSearchJokes from "@/hooks/use-jokes";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { handleChange, value } = useSearchJokes();
  return (
    <main className="flex flex-col items-center justify-center mt-[128px]">
      <div className="max-w-[626px] w-full px-3 sm:px-0">
        <Input
          autoFocus
          value={value}
          onChange={handleChange}
          placeholder="Search jokes..."
        />
      </div>

      <Cards value={value} />
    </main>
  );
}
