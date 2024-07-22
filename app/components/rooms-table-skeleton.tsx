export default function RoomsTableSkeleton() {
  return (
    <div className={`grid grid-rows-4 gap-2`}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={"Skeleton" + i}
          className="border p-3 md:p-5 flex flex-col justify-start "
        >
          <div className="flex flex-col md:flex-row justify-between items-center *:rounded-md">
            <div className={`flex flex-col w-full py-2 *:rounded-md`}>
              <div className="md:text-xl md:font-medium h-[20px] md:h-[33px] w-full md:w-[400px] animate-pulse bg-gray-400 mb-[22px] md:mb-0"></div>
            </div>
            <div
              className={`flex flex-col gap-3 *:rounded-md w-full md:w-auto`}
            >
              <div className="md:text-xl md:font-medium bg-yellow-400 w-[200px] h-[20px] md:h-[26px] animate-pulse"></div>
              <div
                className={`p-2 min-w-full md:min-w-[200px] text-center animate-pulse bg-gray-400 h-[40px]`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
