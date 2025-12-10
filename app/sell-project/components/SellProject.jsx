import React from "react";

export default function SellProject() {
  return (
    <div className="about-section w-full bg-[#040406] flex items-center justify-center">
      <div className="container max-w-[1240px] py-5  px-4  md:py-9 relative">
        <h2 className="m-auto w-fit">Our Work Principles</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 pt-[3rem]">
          {/* Preparation */}
          <div className=" xl:max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] group m-1 xl:m-4 p-4 ">
            <div className="relative">
              <div className="py-4">
                <h3 className="mb-2 tracking-tight text-white m-auto w-fit">
                  Preparation
                </h3>
                <div className="relative">
                  <p className="m-0 font-normal text-gray-400 text-center">
                    We meet either online or in our Dubai office, evaluate the
                    property, and conclude an agreement.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Promotion */}
          <div className=" xl:max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] group m-1 xl:m-4 p-4 ">
            <div className="relative">
              <div className="py-4">
                <h3 className="mb-2 tracking-tight text-white m-auto w-fit">
                  Promotion
                </h3>
                <div className="relative">
                  <p className="m-0 font-normal text-gray-400 text-center">
                    We capture photos and videos, launch contextual advertising
                    and personalized email newsletters, and publish
                    advertisements on public platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className=" xl:max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] group m-1 xl:m-4 p-4 ">
            <div className="relative">
              <div className="py-4">
                <h3 className="mb-2 tracking-tight text-white m-auto w-fit">
                  Agreement
                </h3>
                <div className="relative">
                  <p className="m-0 font-normal text-gray-400 text-center">
                    We find a buyer and prepare documents, including the
                    purchase and sale agreement, while resolving tax and
                    registration issues.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className=" xl:max-w-max   border border-[#ffff] rounded-[10px] shadow bg-[#121218] group m-1 xl:m-4 p-4 ">
            <div className="relative">
              <div className="py-4">
                <h3 className="mb-2 tracking-tight text-white m-auto w-fit">
                  Payment
                </h3>
                <div className="relative">
                  <p className="m-0 font-normal text-gray-400 text-center">
                    Upon the successful completion of the transaction, you will
                    receive the payment with the agency commission deducted.
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