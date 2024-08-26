import { Checkbox } from "@radix-ui/react-checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import { convertISOToNormalTime } from "~/lib/utils";
import { type PlayHistory } from "~/types/spotify-types";

export const columns: ColumnDef<PlayHistory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "track.name",
    id: "name",
    header: "Name",
    cell: ({ row }) => row.original.track.name,
  },
  {
    id: "artist",
    header: "Artist",
    cell: ({ row }) => row.original.track.artists[0]?.name,
  },
  {
    id: "played_at",
    header: "Played at",
    cell: ({ row }) => convertISOToNormalTime(row.original.played_at),
  },
];
