import { Skeleton } from "./ui/skeleton";

const SkeletonList = ({ count }) => {
  return Array.from({ length: count }).map((_, index) => (
    <div key={index} className="flex items-center space-x-4 w-full  h-[10%]">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-[500px]" />
      </div>
    </div>
  ));
};

export default SkeletonList;
