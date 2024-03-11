import Link from "next/link";
import { FC } from "react";
import { cn } from "@/lib/utils";
import { Joke } from "@/store/features/jokes/joke.types";

interface CardProps {
  isLarge: boolean;
  joke: Joke;
}

const Card: FC<CardProps> = ({ isLarge, joke }) => {
  return (
    <Link
      href={joke.url}
      className={cn(
        "border w-full h-full px-5 sm:px-10 py-5 sm:pt-10 sm:pb-[25px] lg:col-span-2 flex flex-col justify-between hover:text-[#656EC2] hover:border-[#656EC2]",
        {
          "lg:col-span-3": isLarge,
        }
      )}
    >
      <div className="text-[16px] md:text-[20px] leading-[30px] tracking-normal">
        {joke.value}
      </div>
      <div
        className={cn(
          "flex flex-col gap-y-5 xl:flex-row justify-between text-[#767676] text-[14px] leading-[17px]",
          {
            "mt-[30px]": !isLarge,
            "mt-[60px]": isLarge,
          }
        )}
      >
        <div>{joke.id}</div>
        <div>{joke.created_at}</div>
      </div>
    </Link>
  );
};

export default Card;
