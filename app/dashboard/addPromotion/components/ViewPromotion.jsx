"use client";

import React, { useEffect, useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { promotionServices } from "@/services/promotionServices";

export const ViewPromotion = ({ setCreatePromotion, submit, params }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [promotionList, setPromotionList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(30);

  const { getPromotion, } = promotionServices();

  useEffect(() => {
    getData();
  }, [submit]);

  useEffect(() => {
    let tempList = promotionList;
    if (params !== "allProject" && params) {
      tempList = promotionList
        .filter((data) => data.status === params)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    setSearchedList(tempList);
  }, [params, promotionList]);

  const getData = async () => {
    try {
      const response = await getPromotion();
      if (response.success) {
        const sortedProjects = response.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setPromotionList(sortedProjects);
      }
    } catch (err) {
      console.error("Failed to fetch project list:", err);
    }
  };

const handleEdit = (data) => {
  setCreatePromotion({
    id: data._id,
    seoTitle: data.seoTitle,
    projectkeyword: data.projectkeyword,
    projectdescription: data.projectdescription,
    promoUrl: data.promoUrl,
    projectName: data.projectName,
    developer: data.developer,
    developerlogo: data.developerlogo,
    bannerImage: data.bannerImage || "",
    altBannerImage: data.altBannerImage,
    bannerVideo: data.bannerVideo || "",
    altBannerVideo: data.altBannerVideo,
    bannerType: data.bannerType || "image",
    subBanner: data.subBanner || "",
    altSubBanner: data.altSubBanner,
    themeImage: data.themeImage || "",
    altThemeImage: data.altThemeImage,
    themeColor: data.themeColor,
    developer: data.developer,
    developerlogo: data.developerlogo,
    bannerTitle: data.bannerTitle,
    subHead: data.subHead,
    subParagraph: data.subParagraph,
    handover: data.handover,
    paymentPlanMain: data.paymentPlanMain,
    startingPrice: data.startingPrice,
    location: data.location,
    homeSecondHead: data.homeSecondHead,
    homeSecondSubHead: data.homeSecondSubHead,
    aboutBannerTitle: data.aboutBannerTitle,
    aboutImg1: data.aboutImg1 || "",
    altAboutImage01: data.altAboutImage01,
    about01: data.about01,
    aboutImg2: data.aboutImg2 || "",
    altAboutImage02: data.altAboutImage02,
    about02: data.about02,
    seoTitleAbout: data.seoTitleAbout,
    projectkeywordAbout: data.projectkeywordAbout,
    projectdescriptionAbout: data.projectdescriptionAbout,
    floorPlansBannerTitle: data.floorPlansBannerTitle || "",
    floorPlans: data.floorPlans || [] ,
    floorPlanSectionTitle: data.floorPlanSectionTitle || "",
    floorPlanCommonDescription: data.floorPlanCommonDescription || "",
    seoTitleFloorPlans: data.seoTitleFloorPlans,
    projectkeywordFloorPlans: data.projectkeywordFloorPlans,
    projectdescriptionFloorPlans: data.projectdescriptionFloorPlans,
    masterPlanBannerTitle: data.masterPlanBannerTitle || "",
    masterPlanTitle: data.masterPlanTitle,
    masterPlanSubTitle: data.masterPlanSubTitle,
    masterPlanImage: data.masterPlanImage || "",
    altMasterPlanImage: data.altMasterPlanImage ,
    masterPlanDescription: data.masterPlanDescription,
    seoTitleMasterPlan: data.seoTitleMasterPlan,
    projectkeywordMasterPlan: data.projectkeywordMasterPlan,
    projectdescriptionMasterPlan: data.projectdescriptionMasterPlan,
    paymentPlanBannerTitle: data.paymentPlanBannerTitle || "",
    paymentPlanTitle: data.paymentPlanTitle,
    paymentPlanSubTitle: data.paymentPlanSubTitle,
    paymentPlan: data.paymentPlan || [],
    tableColumn1: data.tableColumn1 ,
    tableColumn2: data.tableColumn2 ,
    tableColumn3: data.tableColumn3 ,
    paymentPlanDetailDescription: data.paymentPlanDetailDescription || "",
    seoTitlePaymentPlan: data.seoTitlePaymentPlan,
    projectkeywordPaymentPlan: data.projectkeywordPaymentPlan,
    projectdescriptionPaymentPlan: data.projectdescriptionPaymentPlan,
    amenitiesSectionTitle: data.amenitiesSectionTitle,
    amenitiesSectionSubTitle: data.amenitiesSectionSubTitle,
    amenitiesBannerTitle: data.amenitiesBannerTitle,
    amenitieImage1: data.amenitieImage1 || "",
    altAmenitieImage1: data.altAmenitieImage1,
    amenitieImage2: data.amenitieImage2 || "",
    altAmenitieImage2: data.altAmenitieImage2,
    amenitieImage3: data.amenitieImage3 || "",
    altAmenitieImage3: data.altAmenitieImage3,
    amenitieImage4: data.amenitieImage4 || "",
    altAmenitieImage4: data.altAmenitieImage4,
    amenitieImage5: data.amenitieImage5 || "",
    altAmenitieImage5: data.altAmenitieImage5,
    amenitieDetailDescription: data.amenitieDetailDescription || "",
    seoTitleAmenities: data.seoTitleAmenities,
    projectkeywordAmenities: data.projectkeywordAmenities,
    projectdescriptionAmenities: data.projectdescriptionAmenities,
    contactBannerTitle: data.contactBannerTitle,
    contactBannerSubTitle: data.contactBannerSubTitle,
    seoTitleContact: data.seoTitleContact,
    projectkeywordContact: data.projectkeywordContact,
    projectdescriptionContact: data.projectdescriptionContact,
    popupBannerImage: data.popupBannerImage || "",
    altPopupBannerImage: data.altPopupBannerImage,
    brochureImage: data.brochureImage || "",
    altBrochureImage: data.altBrochureImage,
    brochureSectionTitle: data.brochureSectionTitle || "",
    brochureSectionSubTitle: data.brochureSectionSubTitle || "",
    brochureSectionBgColor: data.brochureSectionBgColor || "",
    footerBannerImage: data.footerBannerImage || "",
    altFooterBannerImage: data.altFooterBannerImage || "",
    footerBannerTitle: data.footerBannerTitle || "",
    footerBannerSubTitle: data.footerBannerSubTitle || "",
    footerBannerBtnName: data.footerBannerBtnName || "",
    faqTitle: data.faqTitle || "",
    q1: data.q1 || "",
    a1: data.a1 || "",
    q2: data.q2 || "",
    a2: data.a2 || "",
    q3: data.q3 || "",
    a3: data.a3 || "",
    q4: data.q4 || "",
    a4: data.a4 || "",
    q5: data.q5 || "",
    a5: data.a5 || "",
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // const response = await deletePromotionList(id);
        if (response.success) {
          setPromotionList((prev) => prev.filter((item) => item._id !== id));
          Swal.fire(
            "Deleted!",
            response.message || "Project deleted.",
            "success"
          );
        } else {
          Swal.fire("Failed", response.message || "Failed to delete.", "error");
        }
      } catch (err) {
        Swal.fire("Error", "Error occurred while deleting.", "error");
        console.error(err);
      }
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const filteredItems = searchedList.filter((data) =>
    data.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredItems.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div>
      <table className="w-full border overflow-auto text-[#000]">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Developer</th>
            {pathname === "/dashboard/addPromotion" && <th>Edit</th>}
            {pathname === "/dashboard/addPromotion" && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((data, i) => (
              <tr key={data._id}>
                <td>{data.promoUrl ? (
                    <a
                      href={`/promotion/${data.promoUrl.replace(/\s+/g, "-").toLowerCase()}`}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.projectName || "—"}
                    </a>
                  ) : (
                    data.projectName || "—"
                  )}
                </td>
                <td>{data.developer || "—"}</td>
                {pathname === "/dashboard/addPromotion" && (
                  <td className="text-center">
                    <MdModeEditOutline
                      onClick={() => handleEdit(data)}
                      className="cursor-pointer text-blue-600"
                    />
                  </td>
                )}
                {pathname === "/dashboard/addPromotion" && (
                  <td className="text-center">
                    <MdDelete
                      onClick={() => handleDelete(data._id)}
                      className="cursor-pointer text-red-600"
                    />
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-5 text-[#000]">
        <ReactPaginate
          className="flex gap-2"
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
    </div>
  );
};

export default ViewPromotion;
