import { FC } from "react";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import Card from "./card";
import Loader from "./loader";
import { Joke } from "@/store/features/jokes/joke.types";

interface CardsProps {
  jokes: {
    total: number;
    result: Joke[];
  };
  isLoading: boolean;
  error: any;
}

const montserrat = Montserrat({
  subsets: ["latin"],
});

const Cards: FC<CardsProps> = ({ jokes, isLoading, error }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  if (jokes.total > 0) {
    return (
      <>
        <div className="max-w-[626px] w-full mx-auto">
          <p
            className={cn(
              montserrat.className,
              "ml-9 mt-5 text-[16px] font-normal leading-5 text-[#282626]"
            )}
          >
            Found jokes: {jokes.total}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 max-w-[1596px] px-5 mt-[60px]">
          {jokes.result.map((joke, idx) => (
            <Card key={joke.id} joke={joke} isLarge={idx < 2} />
          ))}
        </div>
      </>
    );
  }
  return null;
};

export default Cards;
