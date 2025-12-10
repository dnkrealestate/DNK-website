import React from "react";
import findAgent from "@/public/assets/icons/findagent.webp";
import loadingRound from "@/public/assets/icons/loadinground.webp";
import listProperty from "@/public/assets/icons/listproperty.webp";
import availableProject from "@/public/assets/icons/availableproject.webp";
import Image from "next/image";

export default function OurProcess () {
  return (
    <div className="w-full bg-[#121218] flex items-center justify-center">
      <div className="serviceSection container max-w-[1240px] py-5  px-4  md:py-9">
        <h2 className="m-auto w-fit">Our Process</h2>
        <p className="text-center m-auto w-[100%] md:w-[80%]">
          Team of real estate experts, Find your agent to find a home for you
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 pt-[3rem]">
          {/* Find an Agent */}
          <div className=" xl:max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] group m-1 xl:m-4 p-4 ">
            <div className="relative">
              <div className="w-[100%]">
                <div className="w-fit m-auto border border-[#ffff] rounded-[50px] p-[5px] bg-[#121218]">
                  <div className="relative p-4 w-[65px] h-[65px]">
                    <Image
                      src={loadingRound}
                      alt="3 bedroom villa for sale in dubai, return of investment"
                      className="absolute left-0 top-0 animate-spin w-full"
                      width={80}
                      height={80}
                      quality={80}
                      loading="lazy"
                    />
                    <Image
                      src={findAgent}
                      alt="Real estate management dubai, Sobha realty, Emaar properties"
                      className=""
                      width={80}
                      height={80}
                      quality={80}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <h3 className="mb-2 tracking-tight text-white m-auto w-fit">
                  Find an Agent
                </h3>
                <div className="relative">
                  <p className="m-0 font-normal text-gray-400 text-center">
                    Our strong team is here to provide support.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* List Your Property */}
          <div className="xl:max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] group  m-1 xl:m-4 p-4">
            <div className="relative">
              <div className="w-[100%]">
                <div className="w-fit m-auto border border-[#ffff] rounded-[50px] p-[5px] bg-[#121218]">
                  <div className="relative p-4 w-[65px] h-[65px]">
                    <Image
                      src={loadingRound}
                      alt="Apartments for sales in dubai marina, Villa, offplan"
                      className="absolute left-0 top-0 animate-spin w-full"
                      width={80}
                      height={80}
                      quality={80}
                      loading="lazy"
                    />
                    <Image
                      src={listProperty}
                      alt="Apartments for sales in downtown dubai, house, home, living"
                      className=""
                      width={80}
                      loading="lazy"
                      height={80}
                      quality={80}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <h3 className="mb-2 tracking-tight text-white m-auto w-fit">
                  List Your Property
                </h3>
                <div className="relative">
                  <p className="m-0 font-normal text-gray-400 text-center">
                    Sell or Rent your property with the best prices.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Projects */}
          <div className="xl:max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] group  m-1 xl:m-4 p-4">
            <div className="relative">
              <div className="w-[100%]">
                <div className="w-fit m-auto border border-[#ffff] rounded-[50px] p-[5px] bg-[#121218]">
                  <div className="relative p-4 w-[65px] h-[65px]">
                    <Image
                      src={loadingRound}
                      alt="Apartments for sale in downtown dubai, sweet home, Dubai"
                      className="absolute left-0 top-0 animate-spin w-full"
                      width={80}
                      loading="lazy"
                      height={80}
                      quality={80}
                    />
                    <Image
                      src={availableProject}
                      alt="vida residence downtown emaar, Trading, real estate investment"
                      className=""
                      loading="lazy"
                      width={80}
                      height={80}
                      quality={80}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <h3 className="mb-2 tracking-tight text-white m-auto w-fit">
                  Projects
                </h3>
                <div className="relative">
                  <p className="m-0 font-normal text-gray-400 text-center">
                    Discover the off-plan & ready to move property in Dubai.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
