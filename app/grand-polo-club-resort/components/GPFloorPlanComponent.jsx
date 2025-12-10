"use client";

import Image from "next/image";
import FloorCover1 from "@/public/assets/pojects/grandPolo/sideCover.webp";
import ImgText from "@/public/assets/lavioleta/personally_visited_approved.webp";
import FloorPlan from "./GPFloorPlan";

const GPFloorPlanComponent = () => {
  return (
    <div id="floorPlan" className="container max-w-[1240px] py-6 px-4 m-auto">
      <h1 className="text-[#fff] m-auto w-fit mt-3 mb-0">Villa Floor Plan</h1>
      <p className="w-full md:w-[70%] m-auto text-center mb-4">
        Discover luxurious 4, 5 & 6-bedroom villas, offering spacious layouts,
        premium finishes, and world-class amenities for an unparalleled living
        experience.
      </p>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 md:col-span-3">
          <FloorPlan />
        </div>

        <div
          className="relative w-full h-[300px] md:h-auto bg-no-repeat bg-cover bg-center rounded-lg flex items-start justify-end p-2 md:p-5"
          style={{ backgroundImage: `url(${FloorCover1.src})` }}
        >
          <div className="relative w-[40%] h-auto">
            <Image src={ImgText} alt="Approved Badge" layout="responsive" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPFloorPlanComponent;
