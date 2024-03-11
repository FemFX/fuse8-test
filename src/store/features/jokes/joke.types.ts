export interface JokeInitialState {
  jokes: Joke[];
  isLoading: boolean;
  error: any;
}
export interface Joke {
  categories: any[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}
