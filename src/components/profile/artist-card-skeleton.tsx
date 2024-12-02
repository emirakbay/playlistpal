import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function ArtistCardSkeleton() {
  return (
    <Card className="w-[180px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardContent className="p-4">
        <Skeleton className="h-[180px] w-[180px] rounded-lg" />
        <Skeleton className="mt-4 h-4 w-3/4" />
      </CardContent>
    </Card>
  );
}
