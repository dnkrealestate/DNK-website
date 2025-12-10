import React from "react";
import propertyManagement from "@/public/assets/icons/propertymanagement.webp";
import loadingRound from "@/public/assets/icons/loadinground.webp";
import capitalImprovements from "@/public/assets/icons/capitalimprovement.webp";
import financeRealEstate from "@/public/assets/icons/financerealestate.webp";
import financialReporting from "@/public/assets/icons/financialreporting.webp";
import recoverAssetValue from "@/public/assets/icons/recoverassetvalue.webp";
import Image from "next/image";

export default function OurServices() {
  return (
    <div>
      <div className="about-section w-full bg-[#040406] flex items-center justify-center">
        <div className="container max-w-[1240px] py-5  px-4  md:py-9 grid md:grid-cols-2 relative">
          {/* property Management-card */}
          <div className="max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] group m-4 mt-14">
            <div className="relative">
              <div className="absolute -translate-y-14 w-[100%]">
                <div className="w-fit m-auto border border-[#ffff] rounded-[50px] p-[5px] bg-[#121218]">
                  <div className="relative p-4 ">
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
                  {/* <span className="w-full h-14 bg-gradient-to-t from-[#121218] to-transparent absolute left-0 bottom-0 "></span> */}
                  <p className="m-0 font-normal text-gray-400 text-justify">
                    Our property management concept is built on integrity,
                    accountability, and honest service that promises maximum
                    ROI. By connecting the right people for our client's
                    property and managing them throughout the stay, their
                    investment will be protected and maintained with us. With
                    our experienced and conscientious team, our clients can rest
                    easy and live their life to the fullest without the hassle
                    that comes with managing the property.
                  </p>
                </div>

                {/* <button className="flex items-center gap-4 text-[#ffff] font-normal text-[0.9rem] mt-4 md:text-[1rem] m-auto">
                View More
                <MdOutlineKeyboardDoubleArrowRight className="arrow-r-bounce text-[0.9rem] md:text-[1.3rem]" />
              </button> */}
              </div>
            </div>
          </div>
          {/* Capital Improvements-card */}
          <div className="max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] group m-4 mt-14">
            <div className="relative">
              <div className="absolute -translate-y-14 w-[100%]">
                <div className="w-fit m-auto border border-[#ffff] rounded-[50px] p-[5px] bg-[#121218]">
                  <div className="relative p-4 ">
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
                  {/* <span className="w-full h-14 bg-gradient-to-t from-[#121218] to-transparent absolute left-0 bottom-0"></span> */}
                  <p className="m-0 font-normal text-gray-400 text-justify ">
                    Our capital improvement strategists use a time-honoured
                    approach to help clients realize the maximum potential of
                    their capital investments regardless of the size. Our
                    dynamic team is uniquely equipped to provide the skill set
                    necessary for each property investment and tailor strategic
                    engagements to meet a specific need by developing a specific
                    approach and tool to help manage and control investments in
                    a way that minimizes risks, maximizes performance, and
                    ensures success.
                  </p>
                </div>

                {/* <button className="flex items-center gap-4 text-[#ffff] font-normal text-[0.9rem] mt-4 md:text-[1rem] m-auto">
                View More
                <MdOutlineKeyboardDoubleArrowRight className="arrow-r-bounce text-[0.9rem] md:text-[1.3rem]" />
              </button> */}
              </div>
            </div>
          </div>
          {/* Finance Real Estate-card */}
          <div className="max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] m-4 group mt-14">
            <div className="relative">
              <div className="absolute -translate-y-14 w-[100%]">
                <div className="w-fit m-auto border border-[#ffff] rounded-[50px] p-[5px] bg-[#121218]">
                  <div className="relative p-4 ">
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
                  {/* <span className="w-full h-14 bg-gradient-to-t from-[#121218] to-transparent absolute left-0 bottom-0"></span> */}
                  <p className="m-0 font-normal text-gray-400 text-justify ">
                    We are capable of funding across the capital stack right
                    from early stage equity to late-stage debt, construction
                    finance, lease rental discounting, loan against property as
                    well as bulk buying properties. We also provide holistic
                    financing solutions to clients looking for housing
                    opportunities.
                  </p>
                </div>

                {/* <button className="flex items-center gap-4 text-[#ffff] font-normal text-[0.9rem] mt-4 md:text-[1rem] m-auto">
                View More
                <MdOutlineKeyboardDoubleArrowRight className="arrow-r-bounce text-[0.9rem] md:text-[1.3rem]" />
              </button> */}
              </div>
            </div>
          </div>
          {/* Financial Reporting-card */}
          <div className="max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] m-4 group mt-14">
            <div className="relative">
              <div className="absolute -translate-y-14 w-[100%]">
                <div className="w-fit m-auto border border-[#ffff] rounded-[50px] p-[5px] bg-[#121218]">
                  <div className="relative p-4 ">
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
                  {/* <span className="w-full h-14 bg-gradient-to-t from-[#121218] to-transparent absolute left-0 bottom-0"></span> */}
                  <p className="m-0 font-normal text-gray-400 text-justify ">
                    Our financial reporting system is designed by specialists
                    who are highly proficient in using various financial
                    solutions. Our reporting system helps you visualize your
                    entire property investment portfolio in a consolidated
                    fashion and provides intelligence and data to help you make
                    better-informed decisions. Our comprehensive financial
                    statement reporting also provides you with an
                    easy-to-understand overview of all your real estate
                    activities.
                  </p>
                </div>

                {/* <button className="flex items-center gap-4 text-[#ffff] font-normal text-[0.9rem] mt-4 md:text-[1rem] m-auto">
                View More
                <MdOutlineKeyboardDoubleArrowRight className="arrow-r-bounce text-[0.9rem] md:text-[1.3rem]" />
              </button> */}
              </div>
            </div>
          </div>
          {/* Recover Asset Value-card */}
          <div className="max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] m-4 group mt-14">
            <div className="relative">
              <div className="absolute -translate-y-14 w-[100%]">
                <div className="w-fit m-auto border border-[#ffff] rounded-[50px] p-[5px] bg-[#121218]">
                  <div className="relative p-4 ">
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
                  {/* <span className="w-full h-14 bg-gradient-to-t from-[#121218] to-transparent absolute left-0 bottom-0"></span> */}
                  <p className="m-0 font-normal text-gray-400 text-justify">
                    We help recover the value of the underperforming assets or
                    portfolios. Whether the resolution involves a sale or
                    workout of a loan, valuation, sale of a property, or
                    recapitalization, we seamlessly realign the asset strategy
                    to the original investment goals of the client and deliver
                    the expected and honest service through trust and
                    accountability.
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
