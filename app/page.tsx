import RoomsTable from "@/app/components/rooms-table";
import { SearchParams } from "@/app/lib/types";

const getRoomsTableProps = (searchParams: SearchParams) => {
  const sortKey = searchParams.sorting || "price";
  const sortOrder = searchParams.sortorder || "asc";
  const page = Number(searchParams.page) || 1;

  return { sortKey, sortOrder, page };
};

export default function Page({
  searchParams = {},
}: {
  searchParams: SearchParams;
}) {
  const roomsTableProps = getRoomsTableProps(searchParams);

  return (
    <main className={`w-full md:w-3/4 pt-5 px-5 max-h-screen flex flex-col`}>
      <header className={`text-[30px] md:text-[50px] font-bold`}>
        Find Your Best Room
      </header>
      {/* Rooms Container */}
      <div
        className={
          "border p-5 rounded-md flex flex-col max-h-[85dvh] overflow-y-auto overflow-x-clip"
        }
      >
        <RoomsTable {...roomsTableProps} />
      </div>
    </main>
  );
}
