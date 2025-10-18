import { Skeleton, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import ImageSkeleton from "./ImageSkeleton";

export default function IndividualAlertSkeleton() {
  const isMobile = useMediaQuery(`(max-width: ${em(1023)})`);
  const { width } = useWindowDimensions();

  const imageCardAmount = isMobile ? 1 : 3;

  return (
    <div>
      <div className="flex gap-5 w-fit rounded-md mt-5 mx-auto">
        {Array.from({ length: imageCardAmount }).map(() => (
          <div className="border border-gray-300" key={Math.random()}>
            <ImageSkeleton width={isMobile ? 200 : 350} height={300} className="p-6 w-full" />
          </div>
        ))}
      </div>
      <div className={`mt-20 flex ${isMobile ? "flex-col" : "flex-row"} mx-auto gap-8 max-w-[65%]`}>
        <div>
          <Skeleton height={isMobile ? 200 : 400} width={isMobile ? "100%" : width * 0.5} />
        </div>
        <div className="flex flex-col gap-5 w-full">
          <Skeleton height={isMobile ? 100 : 140} width={isMobile ? "100%" : 180} />
          <Skeleton height={isMobile ? 100 : 200} width={isMobile ? "100%" : 180} />
        </div>
      </div>
    </div>
  );
}
