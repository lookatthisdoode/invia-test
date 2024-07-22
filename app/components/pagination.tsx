"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const nextPage = () => {
    const params = new URLSearchParams(searchParams);
    let nextPage = currentPage + 1;
    if (nextPage > totalPages) nextPage = totalPages;
    params.set("page", String(nextPage));
    router.replace(`${pathname}?${params.toString()}`);
  };

  const prevPage = () => {
    const params = new URLSearchParams(searchParams);
    let prevPage = currentPage - 1;
    if (prevPage < 1) prevPage = 1;
    params.set("page", String(prevPage));
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 pb-5 items-baseline">
      <button
        className="hover:underline"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        {`<`}
      </button>
      {`Page ${currentPage} of ${totalPages}`}
      <button
        className="hover:underline"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        {`>`}
      </button>
    </div>
  );
}
