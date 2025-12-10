"use client";
import React from "react";
import { MdLocationPin } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { MdAreaChart } from "react-icons/md";
import { AiOutlinePercentage } from "react-icons/ai";
import { BsCash } from "react-icons/bs";
import { PiCalendarCheckFill } from "react-icons/pi";
import Link from "next/link";

export default function TableDetail({ projectId }) {
  return (
    <div className="mb-2">
      <div className="flex text-[#fff] text-[0.8rem] mb-1 md:text-[0.9rem]">
        <Link href="/" className="text-[#fff] hover:text-[#CE8745] pr-1">
          Home
        </Link>
        /
        <Link
          href="/off-plan-project"
          className="text-[#fff] hover:text-[#CE8745] pr-1"
        >
          Projects
        </Link>
        /
        <Link
          href={`/projects/${projectId.projectname}`}
          className="text-[#979797] hover:text-[#CE8745] pr-1"
        >
          {projectId.projectname}
        </Link>
      </div>
      <div className="flex justify-between">
        {projectId?.runingstatus && (
          <div className="flex">
            <div className="bg-[#fff] px-3 py-[0.1rem] hidden md:block">
              <p className="text-[#000] mb-0">Status</p>
            </div>
            <div className="px-3 py-[0.1rem] border border-[#fff]">
              <p className="text-[#fff] mb-0 capitalize">
                {projectId?.runingstatus === "newlaunch" && (
                  <span>New Launch</span>
                )}
                {projectId?.runingstatus === "soldout" && <span>Sold Out</span>}
              </p>
            </div>
          </div>
        )}

        {projectId?.startingprice && (
          <div className="flex">
            <div className="bg-[#fff] px-3 py-[0.1rem]">
              <p className="text-[#000] mb-0">Starting Price</p>
            </div>
            <div className="px-3 py-[0.1rem] border border-[#fff]">
              <p className="text-[#fff] mb-0 capitalize">
                {projectId?.startingprice}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="sm:flex justify-between mb-1">
        <h2 className="m-0 font-normal text-[#fff] line-clamp-1 text-[1rem] my-1">
          {projectId.projectname} By {projectId.developer.replace(/-/g, " ")}
        </h2>

        {projectId?.locationname && (
          <div className="flex items-center">
            <MdLocationPin
              className="text-[#fff] text-[1rem]"
              aria-label="location"
            />
            <h2 className="m-0 font-normal text-[#fff] line-clamp-1 text-[1rem]">
              {projectId.locationname}
            </h2>
          </div>
        )}
      </div>
      <div>
        <div className="grid md:grid-cols-2 ">
          {projectId.type && (
            <div className="grid grid-cols-3 p-2 border border-[#ffffff31]">
              <p className="m-0 font-normal text-[#fff] text-[0.8rem]">
                Property Type:
              </p>
              <p className="m-0 font-normal text-[#979797] text-[0.8rem] text-right col-span-2 capitalize">
                {Object.keys(projectId)
                  .filter((key) => key.startsWith("type") && projectId[key])
                  .map((key, index, array) => (
                    <React.Fragment key={index}>
                      {projectId[key]}
                      {array.length > 1 &&
                        (index < array.length - 2
                          ? ", "
                          : index === array.length - 2
                          ? " & "
                          : "")}
                    </React.Fragment>
                  ))}
              </p>
            </div>
          )}

          {projectId.type && (
            <div className="grid grid-cols-3 p-2 border border-[#ffffff31]">
              <div className="flex">
                <IoBedSharp className="text-[#fff] text-[0.9rem] " />
                <p className="m-0 font-normal text-[#fff] text-[0.8rem] pl-1">
                  Bedroom:
                </p>
              </div>

              <p className="m-0 font-normal text-[#979797] text-[0.8rem] text-right col-span-2">
                {projectId.bedroom}
              </p>
            </div>
          )}

          {projectId.totalarea && (
            <div className="grid grid-cols-2 p-2 border border-[#ffffff31] ">
              <div className="flex">
                <MdAreaChart
                  className="text-[#fff] text-[0.9rem]"
                  aria-label="area chart"
                />
                <p className="m-0 font-normal text-[#fff] text-[0.8rem]  pl-1">
                  Total Area:
                </p>
              </div>

              <p className="m-0 font-normal text-[#979797] text-[0.8rem] text-right">
                {projectId.totalarea}
              </p>
            </div>
          )}
          {projectId.downpayment && (
            <div className="grid grid-cols-2 p-2 border border-[#ffffff31] ">
              <div className="flex">
                <AiOutlinePercentage
                  className="text-[#fff] text-[0.9rem]"
                  aria-label="Down payment"
                />
                <p className="m-0 font-normal text-[#fff] text-[0.8rem]  pl-1">
                  Down Payment:
                </p>
              </div>

              <p className="m-0 font-normal text-[#979797] text-[0.8rem] text-right">
                {projectId.downpayment}
              </p>
            </div>
          )}
          {projectId.paymentplan && (
            <div className="grid grid-cols-2 p-2 border border-[#ffffff31] ">
              <div className="flex">
                <BsCash
                  className="text-[#fff] text-[0.9rem]"
                  aria-label="Payment plan"
                />
                <p className="m-0 font-normal text-[#fff] text-[0.8rem]  pl-1">
                  Payment Plan:
                </p>
              </div>

              <p className="m-0 font-normal text-[#979797] text-[0.8rem] text-right">
                {projectId.paymentplan}
              </p>
            </div>
          )}

          {projectId.totalarea && (
            <div className="grid grid-cols-2 p-2 border border-[#ffffff31] ">
              <div className="flex">
                <PiCalendarCheckFill
                  className="text-[#fff] text-[0.9rem]"
                  aria-label="Handover"
                />
                <p className="m-0 font-normal text-[#fff] text-[0.8rem]  pl-1">
                  Handover:
                </p>
              </div>

              <p className="m-0 font-normal text-[#979797] text-[0.8rem] text-right">
                {projectId.handover}
              </p>
            </div>
          )}
        </div>
        <div className="border border-[#ffffff31] ">
          <h2 className="text-[#fff] m-auto w-fit font-semibold md:text-[1.3rem] py-1">
            Direct Sales & 0% Commission
          </h2>
        </div>
      </div>
    </div>
  );
}
