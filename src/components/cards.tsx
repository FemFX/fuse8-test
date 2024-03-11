import { FC, memo } from "react";
import { Loader2 } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useAppSelector } from "@/hooks/use-app-selector";
import { cn } from "@/lib/utils";
import Card from "./card";

interface CardsProps {
  value: string;
}

const montserrat = Montserrat({
  subsets: ["latin"],
});

const Cards: FC<CardsProps> = ({ value }) => {
  const { jokes, error, isLoading } = useAppSelector((state) => state.joke);
  if (isLoading) {
    return (
      <Loader2 className="animate-spin flex items-center justify-center mt-24" />
    );
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  if (value.length > 3 && jokes.total === 0) {
    return <div className="mt-24">Jokes not found...</div>;
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
        <div className="grid  sm:grid-cols-2 lg:grid-cols-6 gap-5 max-w-[1596px] px-5 mt-[60px]">
          {jokes.result.map((joke, idx) => (
            <Card key={joke.id} joke={joke} isLarge={idx < 2} />
          ))}
        </div>
      </>
    );
  }
  return null;
};

export default memo(Cards);
