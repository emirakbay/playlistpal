export function LoadingGrid() {
  return (
    <div className="flex h-1/3 flex-col gap-2 px-4 pt-2 sm:h-2/5 sm:gap-3 sm:px-12 sm:pt-3">
      <span className="text-base sm:text-lg">Followed Artists</span>
      <div className="flex space-x-3 overflow-hidden pb-3 pt-2 sm:space-x-5 sm:pb-5 sm:pt-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[180px] w-[120px] animate-pulse rounded-lg bg-muted sm:w-[180px]"
          />
        ))}
      </div>
    </div>
  );
}
