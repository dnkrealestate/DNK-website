"use client";

import React from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle,} from "react-icons/io";
import propertyManagement from "@/public/assets/icons/propertymanagement.webp";
import loadingRound from "@/public/assets/icons/loadinground.webp";
import capitalImprovements from "@/public/assets/icons/capitalimprovement.webp";
import financeRealEstate from "@/public/assets/icons/financerealestate.webp";
import financialReporting from "@/public/assets/icons/financialreporting.webp";
import recoverAssetValue from "@/public/assets/icons/recoverassetvalue.webp";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

export default function ServiceSection () {
  return (
    <div className="w-full bg-[#121218] flex items-center justify-center">
      <div className="serviceSection container max-w-[1240px] py-5  px-4  md:py-9">
        <h2 className="m-auto w-fit">Our Service</h2>
        <div className="pt-[1.5rem] md:pt-[3rem]">
          <Swiper
            slidesPerView={3}
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            initialSlide={0}
            watchSlidesProgress={true}
            observer={true}
            observeParents={true}
            loop={true}
            autoplay={{ delay: 3000 }}
            speed={1000}
            spaceBetween={2}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              480: { slidesPerView: 1.5 },
              640: {
                slidesPerView: 2,
              },
              768: { slidesPerView: 2.5 },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            <SwiperSlide>
              {/* property Management-card */}
              <div className="max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] group m-4 mt-14">
                <div className="relative max-w-[350px]">
                  <div className="absolute -translate-y-11 w-[100%]">
                    <div className="w-fit m-auto border border-[#ffff] rounded-[50px] p-[5px] bg-[#121218]">
                      <div className="relative p-4 w-[65px] h-[65px] ">
                        <Image
                          src={loadingRound}
                          alt="Apartments for sale in dubai marina, Apartment, Villa"
                          className="absolute left-0 top-0 hidden group-hover:block animate-spin w-full"
                          width={80}
                          height={80}
                          quality={80}
                          loading="lazy"
                        />
                        <Image
                          src={propertyManagement}
                          alt="Apartments for sale in downtown dubai, Dubai Marina"
                          width={40}
                          height={40}
                          quality={80}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-[2.7rem]">
                    <h3 className="mb-2 tracking-tight text-white m-auto w-fit">
                      Property Management
                    </h3>
                    <div className="relative">
                      <span className="w-full h-14 bg-gradient-to-t from-[#121218] to-transparent absolute left-0 bottom-0 "></span>
                      <p className="m-0 font-normal  text-gray-400 text-justify line-clamp-3">
                        Our property management concept is built on integrity,
                        accountability, and honest service that promises maximum
                        ROI. By connecting the right people for our
                      </p>
                    </div>

                    <Link
                      href="/services"
                      className="flex items-center gap-4 text-[#ffff] font-normal text-[0.9rem] md:text-[1rem] m-auto p-3 w-fit"
                    >
                      View More
                      <MdOutlineKeyboardDoubleArrowRight className="arrow-r-bounce text-[0.9rem] md:text-[1.3rem]" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* Capital Improvements-card */}
              <div className="max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] group m-4 mt-14">
                <div className="relative">
                  <div className="absolute -translate-y-11 w-[100%]">
                    <div className="w-fit m-auto border border-[#ffff] rounded-[50px] p-[5px] bg-[#121218]">
                      <div className="relative p-4 w-[65px] h-[65px]">
                        <Image
                          src={loadingRound}
                          alt="Vida residence downtown emaar, Emaar, Burj Khalifa"
                          className="absolute left-0 top-0 hidden group-hover:block animate-spin w-full"
                          width={40}
                          height={40}
                          quality={80}
                          loading="lazy"
                        />
                        <Image
                          src={capitalImprovements}
                          alt="Real estate management dubai, How to Buy Dubai Villa?"
                          width={40}
                          height={40}
                          quality={80}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-[2.7rem]">
                    <h3 className="mb-2 tracking-tight text-white m-auto w-fit">
                      Capital Improvements
                    </h3>
                    <div className="relative">
                      <span className="w-full h-14 bg-gradient-to-t from-[#121218] to-transparent absolute left-0 bottom-0"></span>
                      <p className="m-0 font-normal text-gray-400 text-justify line-clamp-3">
                        Our capital improvement strategists use a time-honoured
                        approach to help clients realize the maximum potential
                        of their capital investments regardless of the size
                      </p>
                    </div>

                    <Link
                      href="/services"
                      className="flex items-center gap-4 text-[#ffff] font-normal text-[0.9rem] p-3 md:text-[1rem] m-auto w-fit"
                    >
                      View More
                      <MdOutlineKeyboardDoubleArrowRight className="arrow-r-bounce text-[0.9rem] md:text-[1.3rem]" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* Finance Real Estate-card */}
              <div className="max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] m-4 group mt-14">
                <div className="relative">
                  <div className="absolute -translate-y-11 w-[100%]">
                    <div className="w-fit m-auto border border-[#ffff] rounded-[50px] p-[5px] bg-[#121218]">
                      <div className="relative p-4 w-[65px] h-[65px]">
                        <Image
                          src={loadingRound}
                          alt="Real estate management dubai, High ROI Properties"
                          className="absolute left-0 top-0 hidden group-hover:block animate-spin w-full"
                          width={40}
                          height={40}
                          quality={80}
                          loading="lazy"
                        />
                        <Image
                          src={financeRealEstate}
                          alt="Top real estate companies in dubai, High Quality Properties"
                          width={40}
                          height={40}
                          quality={80}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-[2.7rem]">
                    <h3 className="mb-2 tracking-tight text-white m-auto w-fit">
                      Finance Real Estate
                    </h3>
                    <div className="relative">
                      <span className="w-full h-14 bg-gradient-to-t from-[#121218] to-transparent absolute left-0 bottom-0"></span>
                      <p className="m-0 font-normal text-gray-400 text-justify line-clamp-3">
                        We are capable of funding across the capital stack right
                        from early stage equity to late-stage debt, construction
                        finance, lease rental discounting, loan against property
                        as well as bulk buying properties
                      </p>
                    </div>

                    <Link
                      href="/services"
                      className="flex items-center gap-4 text-[#ffff] font-normal text-[0.9rem] p-3 w-fit md:text-[1rem] m-auto"
                    >
                      View More
                      <MdOutlineKeyboardDoubleArrowRight className="arrow-r-bounce text-[0.9rem] md:text-[1.3rem]" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* Financial Reporting-card */}
              <div className="max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] m-4 group mt-14">
                <div className="relative">
                  <div className="absolute -translate-y-11 w-[100%]">
                    <div className="w-fit m-auto border border-[#ffff] rounded-[50px] p-[5px] bg-[#121218]">
                      <div className="relative p-4 w-[65px] h-[65px]">
                        <Image
                          src={loadingRound}
                          alt="Dubai hills for sale, Dubai South"
                          className="absolute left-0 top-0 hidden group-hover:block animate-spin w-full"
                          width={40}
                          height={40}
                          quality={80}
                          loading="lazy"
                        />
                        <Image
                          src={financialReporting}
                          alt="3 bedroom villa for sale in dubai, al maktoum airport"
                          width={40}
                          height={40}
                          quality={80}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-[2.7rem]">
                    <h3 className="mb-2 tracking-tight text-white m-auto w-fit">
                      Financial Reporting
                    </h3>
                    <div className="relative">
                      <span className="w-full h-14 bg-gradient-to-t from-[#121218] to-transparent absolute left-0 bottom-0"></span>
                      <p className="m-0 font-normal text-gray-400 text-justify line-clamp-3">
                        Our financial reporting system is designed by
                        specialists who are highly proficient in using various
                        financial solutions. Our reporting system helps you
                        visualize your
                      </p>
                    </div>

                    <Link
                      href="/services"
                      className="flex items-center gap-4 text-[#ffff] font-normal text-[0.9rem] p-3 w-fit md:text-[1rem] m-auto"
                    >
                      View More
                      <MdOutlineKeyboardDoubleArrowRight className="arrow-r-bounce text-[0.9rem] md:text-[1.3rem]" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* Recover Asset Value-card */}
              <div className="max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] m-4 group mt-14">
                <div className="relative">
                  <div className="absolute -translate-y-11 w-[100%]">
                    <div className="w-fit m-auto border border-[#ffff] rounded-[50px] p-[5px] bg-[#121218]">
                      <div className="relative p-4 w-[65px] h-[65px]">
                        <Image
                          src={loadingRound}
                          alt="Apartments for sale in dubai marina, Return of investment"
                          className="absolute left-0 top-0 hidden group-hover:block animate-spin w-full"
                          width={40}
                          height={40}
                          quality={80}
                          loading="lazy"
                        />
                        <Image
                          src={recoverAssetValue}
                          alt="Apartments for sale in downtown dubai, Emaar, Damac, sobha"
                          width={40}
                          height={40}
                          quality={80}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-[2.7rem]">
                    <h3 className="mb-2 tracking-tight text-white m-auto w-fit">
                      Recover Asset Value
                    </h3>
                    <div className="relative">
                      <span className="w-full h-14 bg-gradient-to-t from-[#121218] to-transparent absolute left-0 bottom-0"></span>
                      <p className="m-0 font-normal text-gray-400 text-justify line-clamp-3">
                        We help recover the value of the underperforming assets
                        or portfolios. Whether the resolution involves a sale or
                        workout of a loan, valuation, sale of a
                      </p>
                    </div>

                    <Link
                      href="/services"
                      className="flex items-center gap-4 text-[#ffff] font-normal text-[0.9rem] p-3 w-fit md:text-[1rem] m-auto"
                    >
                      View More
                      <MdOutlineKeyboardDoubleArrowRight className="arrow-r-bounce text-[0.9rem] md:text-[1.3rem]" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            {/* Custom Navigation Buttons */}
            <div className="custom-prev">
              <IoIosArrowDropleftCircle />
            </div>
            <div className="custom-next">
              <IoIosArrowDroprightCircle />
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
