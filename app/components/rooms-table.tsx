"use client";
import { useState, useEffect, useMemo } from "react";
import { Room } from "../lib/types";
import { getRoomAvailability, getRooms } from "@/app/lib/hotelService";
import { sortRooms } from "@/app/lib/helpers";
import Pagination from "@/app/components/pagination";
import Sorting from "@/app/components/sorting";
import RoomsTableSkeleton from "@/app/components/rooms-table-skeleton";

export default function RoomsTable({
  sortKey,
  sortOrder,
  page,
}: {
  sortKey: string;
  sortOrder: string;
  page: number;
}) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPrices, setLoadingPrices] = useState<{
    [key: number]: boolean;
  }>({}); // Track loading state for each room

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true); // Ensure loading state is true while fetching
      try {
        const roomsData = await getRooms();
        setRooms(roomsData);
        return "Fetched rooms";
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchRooms().then(console.log);
  }, []);

  const mapAvailabilityStatus = (status: string | undefined) => {
    switch (status) {
      case "available":
        return "Available";
      case "onRequest":
        return "On Request";
      case "soldOut":
        return "Sold Out";
      case "error":
        return "Error";
      default:
        return null;
    }
  };

  const handleCheckAvailability = async (roomId: number) => {
    // Add fake delay and loading state to highlight that price is being updated
    setLoadingPrices((prev) => ({ ...prev, [roomId]: true }));
    const fakeDelay = await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const updatedRoom = await getRoomAvailability(roomId);
      // Rebuild whole rooms array and add checked price
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId
            ? {
                ...room,
                checkedPrice: updatedRoom.price,
                availabilityStatus: updatedRoom.availabilityStatus,
              }
            : room,
        ),
      );
    } catch (error) {
      console.error("Failed to check availability:", error);
    } finally {
      setLoadingPrices((prev) => ({ ...prev, [roomId]: false }));
    }
  };

  const handleBooking = (roomId: number) => {
    const updatedRoom = rooms.find((room) => room.id === roomId);
    if (updatedRoom) {
      console.log("Booking room:", updatedRoom);
    }
  };

  const sortedRooms = useMemo(() => {
    // Sort all rooms based on the current sort key and order
    return sortRooms(rooms, sortKey, sortOrder);
  }, [rooms, sortKey, sortOrder]);

  const totalPages = useMemo(
    () => Math.ceil(sortedRooms.length / 4),
    [sortedRooms],
  );

  const roomsForCurrentPage = useMemo(() => {
    const startIndex = (page - 1) * 4;
    const endIndex = startIndex + 4;
    return sortedRooms.slice(startIndex, endIndex);
  }, [sortedRooms, page]);

  return (
    <div className="flex flex-col gap-2">
      <Sorting />

      {loading ? (
        <RoomsTableSkeleton />
      ) : (
        <div className="grid grid-rows-4 gap-2">
          {roomsForCurrentPage.map((room) => {
            const availabilityStatus = mapAvailabilityStatus(
              room.availabilityStatus,
            );

            return (
              <div
                key={room.id}
                className="border p-3 md:p-5 flex flex-col justify-start"
              >
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="md:text-xl md:font-medium min-h-[2.5rem] leading-5 w-full py-2">
                    {room.name}
                  </div>
                  <div className="flex flex-col items-start md:items-center gap-2 w-full md:w-auto">
                    <div className="md:text-xl md:font-bold text-yellow-600">
                      {loadingPrices[room.id]
                        ? "Updating price..."
                        : room.checkedPrice !== undefined
                          ? room.checkedPrice !== null
                            ? `${room.checkedPrice.value} ${room.checkedPrice.currencyCode}`
                            : "No price available"
                          : room.price !== null
                            ? `${room.price.value} ${room.price.currencyCode}`
                            : "Price not available"}
                    </div>
                    <div
                      className={`flex flex-row-reverse border w-full md:max-w-[200px] overflow-hidden active:translate-x-[1px] active:translate-y-[1px] duration-75`}
                    >
                      {availabilityStatus ? (
                        <div
                          className={`${["Sold Out", "Error"].includes(availabilityStatus) ? "bg-orange-400" : ""} p-2 min-w-full md:min-w-[200px] text-center peer ${availabilityStatus}`}
                        >
                          {availabilityStatus}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleCheckAvailability(room.id)}
                          disabled={loadingPrices[room.id]}
                          className="p-2 min-w-full md:min-w-[200px]"
                        >
                          {loadingPrices[room.id]
                            ? "Checking..."
                            : "Check Availability"}
                        </button>
                      )}
                      <button
                        className="peer-[.Available]:translate-x-full peer-[.Request]:translate-x-full bg-emerald-500 delay-300 duration-100 p-2 min-w-full md:min-w-[200px]"
                        onClick={() => handleBooking(room.id)}
                      >
                        {availabilityStatus === "On Request"
                          ? "Booking On Request"
                          : "Book Now"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
