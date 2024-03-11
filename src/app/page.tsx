"use client";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    axios
      .get(
        `https://api.chucknorris.io/jokes/search?query=Chuck Norris can bitch slap`,
        {}
      )
      .then((res) => setData(res.data));
    console.log(data);
  }, [value]);
  return (
    <main className="flex flex-col items-center justify-center mt-[128px]">
      <div className="max-w-[626px] w-full">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search jokes..."
        />
        <p className={cn("ml-9 mt-5 text-[16px] font-normal leading-5")}>
          Found jokes: 12
        </p>
      </div>
      <div className="grid grid-cols-3 gap-5 max-w-[1596px] px-5 mt-[60px]">
        {Array(10)
          .fill(0)
          .map((joke, idx) => (
            <Card key={idx} />
          ))}
      </div>
    </main>
  );
}
