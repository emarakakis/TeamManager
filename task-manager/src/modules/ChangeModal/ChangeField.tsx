import { useQueryState } from "@/app/hooks/query-state-hook";
import { useQuery } from "@tanstack/react-query";
import { ChangeType } from "./ChangeModal";
import ChangeTable from "./ChangeTable";

export default function ChangeField({
  data,
  id,
  watchString,
}: {
  data: Array<ChangeType>;
  id: number;
  watchString: string;
}) {
  const orderedData = [
    ...(data ?? [])!.sort((a, b) => {
      if (a.id === id) return -1;
      if (b.id === id) return 1;
      return 0;
    }),
  ];

  return (
    <ChangeTable
      data={orderedData ?? []}
      defaultValue={id}
      watchString={watchString}
    />
  );
}
