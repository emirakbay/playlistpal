export type TimeRange = "short_term" | "medium_term" | "long_term";

export interface TopItemsData<T> {
  items: T[];
}

export interface TimeRangeData<T> {
  short_term: TopItemsData<T>;
  medium_term: TopItemsData<T>;
  long_term: TopItemsData<T>;
}
