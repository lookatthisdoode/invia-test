"use client";
import { PiSortAscending, PiSortDescending } from "react-icons/pi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Sorting() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [ascending, setAscending] = useState(true);

  const handleSortingMethod = (method: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sorting", method);
    params.set("sortorder", ascending ? "asc" : "desc");
    replace(`${pathname}?${params.toString()}`);
  };

  const toggleSortOrder = () => {
    setAscending((prev) => !prev);
    const params = new URLSearchParams(searchParams);
    params.set("sortorder", ascending ? "desc" : "asc");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      <span>Sorting By:</span>
      <button
        className="hover:underline"
        onClick={() => handleSortingMethod("name")}
      >
        Name
      </button>
      <button
        className="hover:underline"
        onClick={() => handleSortingMethod("price")}
      >
        Price
      </button>
      <button onClick={toggleSortOrder}>
        {ascending ? (
          <PiSortDescending size={20} />
        ) : (
          <PiSortAscending size={20} />
        )}
      </button>
    </div>
  );
}
