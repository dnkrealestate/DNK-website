"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { WWURL } from "@/url/axios";

const ReactPaginate = dynamic(() => import("react-paginate"), { ssr: false });

export default function MdNewsGrid({ newsList }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const generateSlug = (name) => name.replace(/\s+/g, "-").toLowerCase();

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const filteredItems = newsList.filter((data) =>
    data.newsurl.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredItems.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div>
      <div className="block md:hidden">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentItems.length > 0 ? (
            currentItems.map((data, index) => {
              const slug = generateSlug(data.newsurl);
              return (
                <div key={data.newsurl}>
                  <Link href={`/news/${slug}`}>
                    <div className="p-3">
                      <Image
                        src={
                          data.newsthumbnail ? WWURL + data.newsthumbnail : ""
                        }
                        alt={data.alt || "News Thumbnail"}
                        width={400}
                        height={400}
                        quality={80}
                        priority={index < 10}
                        className="object-cover rounded"
                      />
                      <div className="flex flex-col justify-between h-full">
                        <h2 className="mb-2 text-[0.9rem] md:text-2xl font-semibold tracking-normal text-white line-clamp-2 pt-2">
                          {data.newstitle}
                        </h2>
                        <div
                          dangerouslySetInnerHTML={{ __html: data?.newspara1 }}
                          className="ph m-0 font-normal text-gray-400 line-clamp-4"
                        ></div>
                      </div>
                      <div className="flex gap-1">
                        <p className="m-0 font-normal text-gray-400 pt-3">
                          Published:
                        </p>
                        <p className="m-0 font-normal text-gray-400 pt-3">
                          {data.published}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center">
              <p className="text-center text-gray-400">No news found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex justify-center mt-5 pagination-block">
            <ReactPaginate
              className="flex text-white"
              previousLabel={<IoIosArrowBack className="text-[1.5rem]" />}
              nextLabel={<IoIosArrowForward className="text-[1.5rem]" />}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              previousClassName={"previous-button"}
              nextClassName={"next-button"}
              disabledClassName={"disabled"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
