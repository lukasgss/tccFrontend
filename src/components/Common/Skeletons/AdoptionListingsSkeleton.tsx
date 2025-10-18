import CardSkeleton from "./CardSkeleton";

export default function FiltersSkeleton() {
  return (
    <div className="flex mt-5">
      <div className="flex flex-wrap justify-center ml-2 min-[1250px]:justify-center g:w-[85%] mx-auto gap-x-8 gap-y-12 my-6">
        {Array.from({ length: 6 }).map(() => (
          <CardSkeleton key={Math.random()} />
        ))}
      </div>
    </div>
  );
}
