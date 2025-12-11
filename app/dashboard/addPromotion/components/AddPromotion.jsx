"use client";
import React, { Suspense, useEffect, useState } from 'react'
import {  URL as BASE_URL } from "@/url/axios";
import cvrImage from "/public/assets/icons/coverimage.webp";
import Swal from 'sweetalert2';
import { promotionServices } from '@/services/promotionServices';
import Image from 'next/image';
import ViewPromotion from './ViewPromotion';
import { userPartnerServices } from '@/services/partnerServices';
import { Column } from 'jspdf-autotable';

export default function AddPromotion({mode, user_id}) {
     const [err, setErr] = useState(false);
      const [partnerList, setPartnerList] = useState([]);
      const [searchedDeveloperList, setSearchedDeveloperList] = useState([]);
      const [selectedDeveloperImage, setSelectedDeveloperImage] = useState("");
      const [promotionData, setPromotionData] = useState(null);
      const [selectedFloorImage, setSelectedFloorImage] = useState("");
      const [activeTab, setActiveTab] = useState("tab1");
      const [submit, setSubmit] = useState(false);
      const [message, setMessage] = useState("");

      const { getPartnerR, getPartnerName } = userPartnerServices();
      const { postPromotions, getPromotion, putPromotion } = promotionServices();

 const initialState = {
    seoTitle: "",
    projectkeyword: "",
    projectdescription: "",
    promoUrl: "",
    projectName: "",
    developer: "",
    developerlogo: "",
    bannerImage: "",
    altBannerImage: "",
    bannerVideo: "",
    altBannerVideo: "",
    bannerType: "image",
    subBanner: "",
    altSubBanner: "",
    themeImage: "",
    altThemeImage: "",
    themeColor: "",
    developer: "",
    developerlogo: "",
    bannerTitle: "",
    subHead: "",
    subParagraph: "",
    handover: "",
    paymentPlanMain: "",
    startingPrice: "",
    location: "",
    homeSecondHead: "",
    homeSecondSubHead: "",
    aboutBannerTitle: "",
    aboutImg1: "",
    altAboutImage01: "",
    about01: "",
    aboutImg2: "",
    altAboutImage02: "",
    about02: "",
    seoTitleAbout: "",
    projectkeywordAbout: "",
    projectdescriptionAbout: "",
    floorPlansBannerTitle: "",
    floorPlans: [],
    floorPlanSectionTitle: "",
    floorPlanCommonDescription: "",
    seoTitleFloorPlans: "",
    projectkeywordFloorPlans: "",
    projectdescriptionFloorPlans: "",
    masterPlanBannerTitle: "",
    masterPlanTitle: "",
    masterPlanSubTitle: "",
    masterPlanImage: "",
    altMasterPlanImage: "",
    masterPlanDescription: "",
    seoTitleMasterPlan: "",
    projectkeywordMasterPlan: "",
    projectdescriptionMasterPlan: "",
    paymentPlanBannerTitle: "",
    paymentPlanTitle: "",
    paymentPlanSubTitle: "",
    paymentPlan: [],
    tableColumn1: "",
    tableColumn2: "",
    tableColumn3: "",
    paymentPlanDetailDescription: "",
    seoTitlePaymentPlan: "",
    projectkeywordPaymentPlan: "",
    projectdescriptionPaymentPlan: "",
    amenitiesSectionTitle: "",
    amenitiesSectionSubTitle: "",
    amenitiesBannerTitle: "",
    amenitieImage1: "",
    altAmenitieImage1: "",
    amenitieImage2: "",
    altAmenitieImage2: "",
    amenitieImage3: "",
    altAmenitieImage3: "",
    amenitieImage4: "",
    altAmenitieImage4: "",
    amenitieImage5: "",
    altAmenitieImage5: "",
    amenitieDetailDescription: "",
    seoTitleAmenities: "",
    projectkeywordAmenities: "",
    projectdescriptionAmenities: "",
    contactBannerTitle: "",
    contactBannerSubTitle: "",
    seoTitleContact: "",
    projectkeywordContact: "",
    projectdescriptionContact: "",
    popupBannerImage: "",
    altPopupBannerImage: "",
    brochureImage: "",
    altBrochureImage: "",
    brochureSectionTitle: "",
    brochureSectionSubTitle: "",
    brochureSectionBgColor: "",
    footerBannerImage: "",
    altFooterBannerImage: "",
    footerBannerTitle: "",
    footerBannerSubTitle: "",
    footerBannerBtnName: "",
    faqTitle: "",
    q1: "",
    a1: "",
    q2: "",
    a2: "",
    q3: "",
    a3: "",
    q4: "",
    a4: "",
    q5: "",
    a5: "",
  };

  const [createPromotion, setCreatePromotion] = useState(initialState);
  const [imageUrls, setImageUrls] = useState({
    bannerImage: null,
    bannerVideo: null,
    subBanner: null,
    developerlogo: null,
    projectlogo: null,
    floorPlanImages: {},
    masterPlanImage: null,
    amenitieImage1: null,
    amenitieImage2: null,
    amenitieImage3: null,
    amenitieImage4: null,
    amenitieImage5: null,
    popupBannerImage: null,
    brochureImage: null,
    footerBannerImage: null,
  });

    useEffect(() => {
      if (mode === "update" && user_id) {
        fetchProjectDetails(user_id);
      }
      setSearchedDeveloperList(partnerList);
    }, [mode, user_id, partnerList]);

    useEffect(() => {
        getData();
    }, [submit]);

useEffect(() => {
  if (!promotionData) return;

  setCreatePromotion(prev => ({
    ...prev,                // KEEP all existing fields (including amenities)
    ...promotionData,       // merge API data
    floorPlans: Array.isArray(promotionData.floorPlans)
      ? promotionData.floorPlans.map(plan => ({
          ...plan,
          image: null,
          imageUrl: plan.image ? `${BASE_URL}${plan.image}` : null
        }))
      : [],
    paymentPlan: Array.isArray(promotionData.paymentPlan)
      ? promotionData.paymentPlan
      : [],
  }));

  setImageUrls(prev => ({
    ...prev,
    bannerImage: promotionData.imageUrl?.bannerImage || prev.bannerImage,
    bannerVideo: promotionData.imageUrl?.bannerVideo || prev.bannerVideo,
    subBanner: promotionData.imageUrl?.subBanner || prev.subBanner,
    developerlogo: promotionData.imageUrl?.developerlogo || prev.developerlogo,
    aboutImg1: promotionData.imageUrl?.aboutImg1 || prev.aboutImg1,
    aboutImg2: promotionData.imageUrl?.aboutImg2 || prev.aboutImg2,
    masterPlanImage: promotionData.imageUrl?.masterPlanImage || prev.masterPlanImage,

    // ⭐ MOST IMPORTANT (amenities)
    amenitieImage1: promotionData.imageUrl?.amenitieImage1 || prev.amenitieImage1,
    amenitieImage2: promotionData.imageUrl?.amenitieImage2 || prev.amenitieImage2,
    amenitieImage3: promotionData.imageUrl?.amenitieImage3 || prev.amenitieImage3,
    amenitieImage4: promotionData.imageUrl?.amenitieImage4 || prev.amenitieImage4,
    amenitieImage5: promotionData.imageUrl?.amenitieImage5 || prev.amenitieImage5,

    popupBannerImage: promotionData.imageUrl?.popupBannerImage || prev.popupBannerImage,
    brochureImage: promotionData.imageUrl?.brochureImage || prev.brochureImage,
    footerBannerImage: promotionData.imageUrl?.footerBannerImage || prev.footerBannerImage,
  }));
}, [promotionData]);

 const getData = async () => {
  try {
    const response = await getPartnerR();
    console.log("Partner API response:", response);

    // since response itself is an array
    if (Array.isArray(response)) {
      setPartnerList(response);
    } else if (response?.data && Array.isArray(response.data)) {
      setPartnerList(response.data);
    } else {
      setPartnerList([]);
    }
  } catch (err) {
    console.error("Error loading partners:", err);
  }
};

const handleFileInput = (e, index = null) => {
  const field = e.target.name;
  const file = e.target.files[0];

  // ✅ Detect floor plan image inputs
  if (field.startsWith("floorPlanImage_") && index !== null) {
    setCreatePromotion((prev) => {
      const updatedFloorPlans = [...(prev.floorPlans || [])];
      // ✅ Preserve other data, only update imageFile
      updatedFloorPlans[index] = {
        ...updatedFloorPlans[index],
        image: file,
        imageUrls: file ? URL.createObjectURL(file) : prev.floorPlans[index]?.imageUrls || null, // keep old if not replaced
      };

      return { ...prev, floorPlans: updatedFloorPlans };
    });

    // ✅ Maintain existing previews instead of replacing
    setImageUrls((prev) => {
      const updatedUrls = { ...(prev.floorPlanImages || {}) };
      updatedUrls[index] = file ? URL.createObjectURL(file) : prev.floorPlanImages?.[index] || null;
      return { ...prev, floorPlanImages: updatedUrls };
    });
  } else {
    // ✅ Regular single image fields
    setCreatePromotion((prev) => ({ ...prev, [field]: file }));
    setImageUrls((prev) => ({
      ...prev,
      [field]: file ? URL.createObjectURL(file) : null,
    }));
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    // Append top-level fields (text and files)
    for (const [key, value] of Object.entries(createPromotion)) {
      if (key !== "floorPlans") {
        if (value instanceof File || typeof value === "string") {
          formData.append(key, value);
        }
      }
    }



    // ✅ Handle floorPlans array
    const floorPlans = createPromotion.floorPlans || [];
    formData.append("floorPlans", JSON.stringify(floorPlans.map((plan) => ({
      title: plan.title || "",
      heading: plan.heading || "",
      content: plan.content || "",
      altText: plan.altText || "",
      image:
        plan.image instanceof File
          ? null // backend will handle new upload
          : plan.image || "",
    }))));

    
     // ✅ Append floor plan image files
    floorPlans.forEach((plan, index) => {
      if (plan.image) {
        formData.append(`floorPlanImage_${index}`, plan.image);
      }
    });

    // ✅ Handle Payment plan array
    const paymentPlan = createPromotion.paymentPlan || [];
      formData.append("paymentPlan", JSON.stringify(paymentPlan.map((plan) => ({
        tableData1: plan.tableData1 || "",
        tableData2: plan.tableData2 || "",
        tableData3: plan.tableData3 || "",
      }))));
   
    // ✅ Submit to backend
    let response;
    if (createPromotion.id) {
      formData.append("_id", createPromotion.id);
      response = await putPromotion(createPromotion.id, formData);
    } else {
      response = await postPromotions(formData);
    }

    // ✅ Handle response
    if (response.success) {
      Swal.fire("Success", "Successfully added/updated", "success");
      handleReset();
      setMessage("Please refresh the page");
      setSubmit(!submit);
    } else {
      Swal.fire("Failed", "Failed to add/update project", "error");
    }
  } catch (err) {
    console.error("❌ Error submitting form:", err);
    Swal.fire("Failed", "Failed to add/update project", "error");
  }
};

  const handleReset = () => {
    setCreatePromotion(initialState);
    setImageUrls({
      bannerImage: null,
      bannerVideo: null,
      subBanner: null,
      developerlogo: null,
      projectlogo: null,
      aboutImg1: null,
      aboutImg2: null,
      floorPlanImages: {},
      masterPlanImage: null,
      paymentPlan: {},
      amenitieImage1: null,
      amenitieImage2: null,
      amenitieImage3: null,
      amenitieImage4: null,
      amenitieImage5: null,
      popupBannerImage: null,
      brochureImage: null,
      footerBannerImage: null,
    });
  };

   const handleChange = async (e, index = null, type = null) => {
    const { name, value } = e.target;

  // 🧩 Case 1: Handle dynamic floor plan text fields
    if (type === "floorPlan" && index !== null) {
      setCreatePromotion((prev) => {
        const updatedFloorPlans = [...(prev.floorPlans || [])];
        updatedFloorPlans[index] = {
          ...updatedFloorPlans[index],
          [name]: value,
        };
        return { ...prev, floorPlans: updatedFloorPlans };
      });
      return;
    }
    
  // 🧩 Case 2: Handle dynamic payment plan text fields
    if (type === "paymentPlan" && index !== null) {
      setCreatePromotion((prev) => {
        const updatedPaymentPlans = [...(prev.paymentPlan || [])];
        updatedPaymentPlans[index] = {
          ...updatedPaymentPlans[index],
          [name]: value,
        };
        return { ...prev, paymentPlan: updatedPaymentPlans };
      });
      return;
    }

    // 🧩 Case 3: Handle developer field
    if (name === "developer") {
      if (value === "") {
        setCreatePromotion((prev) => ({
          ...prev,
          [name]: null,
          developerlogo: "",
          
        }));
        setSelectedDeveloperImage("");
      } else {
        try {
          const response = await getPartnerName(value);
          if (response.success) {
            setCreatePromotion((prev) => ({
              ...prev,
              [name]: value,
              developerlogo: response.data.image,
            }));
            setSelectedDeveloperImage(response.data.image);
          }
        } catch (err) {
          console.error("Error fetching developer image:", err);
        }
      }
      // 🧩 Case 4: Handle normal input fields
    } else {
      setCreatePromotion((prev) => ({ ...prev, [name]: value }));
    }
  };

  

  // const fetchProjectDetails = async (id) => {
  //   try {
  //     const response = await getPromotion(id);
  //     setCreatePromotion(response.data);
  //     setImageUrls({
  //       bannerImage: response.data.imageUrl?.bannerImage || null,
  //       bannerVideo: response.data.imageUrl?.bannerVideo || null,
  //       developerlogo: response.data.imageUrl?.developerlogo || null,
  //       aboutImg1: response.data.imageUrl?.aboutImg1 || null,
  //       aboutImg2: response.data.imageUrl?.aboutImg2 || null,
  //       masterPlanImage: response.data.imageUrl?.masterPlanImage || null,
  //       amenitieImage1: response.data.imageUrl?.amenitieImage1 || null,
  //       amenitieImage2: response.data.imageUrl?.amenitieImage2 || null,
  //       amenitieImage3: response.data.imageUrl?.amenitieImage3 || null,
  //       amenitieImage4: response.data.imageUrl?.amenitieImage4 || null,
  //       amenitieImage5: response.data.imageUrl?.amenitieImage5 || null,
  //     });
  //   } catch (err) {
  //     console.error("Failed to fetch project details:", err);
  //   }
  // };

  return (
    <div>
        <div className="text-[#000]">
            <div>
                <h1 className="text-[#000] font-semibold">Add Promotion</h1>
            </div>
             {/* 🔹 Tabs */}
      <div className="flex border-b mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("tab1")}
          className={`px-6 py-2 font-semibold ${
            activeTab === "tab1"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Basic Info
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("tab2")}
          className={`px-6 py-2 font-semibold ${
            activeTab === "tab2"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Floor Plan
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("tab3")}
          className={`px-6 py-2 font-semibold ${
            activeTab === "tab3"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Mater Plan
        </button>
         <button
          type="button"
          onClick={() => setActiveTab("tab4")}
          className={`px-6 py-2 font-semibold ${
            activeTab === "tab4"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Payment Plan
        </button>
         <button
          type="button"
          onClick={() => setActiveTab("tab5")}
          className={`px-6 py-2 font-semibold ${
            activeTab === "tab5"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Amenities
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("tab6")}
          className={`px-6 py-2 font-semibold ${
            activeTab === "tab6"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          FAQ
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("tab7")}
          className={`px-6 py-2 font-semibold ${
            activeTab === "tab7"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          About
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("tab8")}
          className={`px-6 py-2 font-semibold ${
            activeTab === "tab8"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Contact
        </button>
      </div>
            <form
                action="/task/add-task"
                method="POST"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
              {/* TAB 1 - Basic Info */}
        {activeTab === "tab1" && (
              <div className='home-tab'>
                  <label>Developer *</label>
              {selectedDeveloperImage ? (
                <div className="developer-image">
                  <Image
                    width={200}
                    height={70}
                    className="bg-[#000]"
                    src={BASE_URL + encodeURIComponent(selectedDeveloperImage)}
                    alt="Selected Developer"
                  />
                </div>
              ) : createPromotion?.developerlogo ? (
                <Image
                  className="bg-[#000]"
                  width={200}
                  height={70}
                  src={BASE_URL + createPromotion.developerlogo}
                  alt="Developer"
                />
              ) : (
                 <div className="h-[80px] w-[250px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md mb-2">
                    <p className="text-gray-500">No developer selected</p>
                </div>
              )}
            <select
                onChange={handleChange}
                name="developer"
                value={createPromotion.developer || ""}
                type="text"
                className="w-full border border-[#040406] p-[10px] rounded mb-[25px]"
              >
                <option value={""}>Select Developer</option>
                {searchedDeveloperList.length > 0 ? (
                  searchedDeveloperList.map((data, i) => (
                    <option key={i} value={data.partnername || ""}>
                      {data.partnername ? data.partnername.replace(/-/g, " ") : "No name available"}
                    </option>
                  ))
                ) : (
                  <option value="">No developer list added</option>
                )}
              </select>
              <label>URL *</label>
              <input
                placeholder="URL *"
                onChange={handleChange}
                name="promoUrl"
                value={createPromotion.promoUrl || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Project Name *</label>
              <input
                placeholder="Project Name"
                onChange={handleChange}
                name="projectName"
                value={createPromotion.projectName || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              {/* Banner Type Selection */}
              <label className="font-semibold text-lg mb-2 block">Home Banner*</label>

              <div className="flex items-center gap-6 mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="bannerType"
                    value="image"
                    checked={createPromotion.bannerType === "image"}
                    onChange={(e) => {
                      setCreatePromotion((prev) => ({
                        ...prev,
                        bannerType: e.target.value,
                        bannerVideo: "", // clear video if switching to image
                      }));
                      setImageUrls((prev) => ({ ...prev, bannerVideo: null }));
                    }}
                  />
                  <span>Image</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="bannerType"
                    value="video"
                    checked={createPromotion.bannerType === "video"}
                    onChange={(e) => {
                      setCreatePromotion((prev) => ({
                        ...prev,
                        bannerType: e.target.value,
                        bannerImage: "", // clear image if switching to video
                      }));
                      setImageUrls((prev) => ({ ...prev, bannerImage: null }));
                    }}
                  />
                  <span>Video</span>
                </label>
              </div>

              {/* Conditional Rendering */}
              {createPromotion.bannerType === "image" && (
                <div className="">
                  <label htmlFor="bannerImage" className="cursor-pointer block mb-2">
                    {imageUrls.bannerImage ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={imageUrls.bannerImage}
                        alt="Banner Preview"
                      />
                    ) : createPromotion.bannerImage ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={BASE_URL + createPromotion.bannerImage}
                        alt="Banner Image"
                      />
                    ) : (
                      <div className="h-[266px] w-[380px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="bannerImage"
                    id="bannerImage"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2"
                    disabled={createPromotion.bannerType !== "image"} // 🚫 disable if not image type
                  />
                  <div className='mt-2'>
                    <label>Alt name banner image</label>
                    <input
                      placeholder='alt name banner image'
                      onChange={handleChange}
                      name='altBannerImage'
                      value={createPromotion.altBannerImage || ""}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>
                </div>
              )}

              {createPromotion.bannerType === "video" && (
                <div className="">
                  <label htmlFor="bannerVideo" className="cursor-pointer block mb-2">
                    {imageUrls.bannerVideo ? (
                      <video
                        width="380"
                        height="266"
                        controls
                        className="rounded-md border border-gray-300"
                      >
                        <source src={imageUrls.bannerVideo} type="video/mp4" />
                      </video>
                    ) : createPromotion.bannerVideo ? (
                      <video
                        width="380"
                        height="266"
                        controls
                        className="rounded-md border border-gray-300"
                      >
                        <source src={BASE_URL + createPromotion.bannerVideo} type="video/mp4" />
                      </video>
                    ) : (
                      <div className="h-[266px] w-[380px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No video selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="bannerVideo"
                    id="bannerVideo"
                    accept="video/*"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2"
                    disabled={createPromotion.bannerType !== "video"} // 🚫 disable if not video type
                  />
                  <div className='mt-2'>
                    <label>Alt name banner video</label>
                    <input
                      placeholder='alt name banner video'
                      onChange={handleChange}
                      name='altBannerVideo'
                      value={createPromotion.altBannerVideo || ""}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                    </div>
                </div>
              )}
              <label>Banner Title *</label>
              <input
                placeholder='Eg: Waterfront Townhouses & Villas at Damac Islands 2, Dubai'
                onChange={handleChange}
                name='bannerTitle'
                value={createPromotion.bannerTitle || ""}
                type='text'
                className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
              />
              <label>Sub Head *</label>
              <input
                placeholder='Eg: Starting From 2.7M AED | $735K USD'
                onChange={handleChange}
                name='subHead'
                value={createPromotion.subHead || ""}
                type='text'
                className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
              />
              <label>Sub Paragraph *</label>
              <textarea
                placeholder="About Paragraph maximum 300 letters"
                type="text"
                name="subParagraph"
                onChange={handleChange}
                value={createPromotion.subParagraph || ""}
                cols="30"
                rows="5"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Completion Date *</label>
              <input
                placeholder='Eg: June 2029'
                onChange={handleChange}
                name='handover'
                value={createPromotion.handover || ""}
                type='text'
                className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
              />
              <label>Payment Plan *</label>
              <input
                placeholder='Eg: 1% Monthly'
                onChange={handleChange}
                name='paymentPlanMain'
                value={createPromotion.paymentPlanMain || ""}
                type='text'
                className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Starting Price *</label>
                    <input
                      placeholder='Eg: 2.7M AED'
                      onChange={handleChange}
                      name='startingPrice'
                      value={createPromotion.startingPrice || ""}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                </div>
                <div>
                  <label>Location *</label>
                  <input
                    placeholder='Eg: Dubailand'
                    onChange={handleChange}
                    name='location'
                    value={createPromotion.location || ""}
                    type='text'
                    className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                  />
                </div>
              </div>
              
              <label>Second Section Head *</label>
              <input
                placeholder='Eg: Damac Islands Your Private Paradise in Dubai'
                onChange={handleChange}
                name='homeSecondHead'
                value={createPromotion.homeSecondHead || ""}
                type='text'
                className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
              />
              <label>Second Sub Head  *</label>
              <input
                placeholder='Maximum 2 lines'
                onChange={handleChange}
                name='homeSecondSubHead'
                value={createPromotion.homeSecondSubHead || ""}
                type='text'
                className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
              />

              <div className="">
                  <label htmlFor="aboutImg1" className="cursor-pointer block mb-2">
                    {imageUrls.aboutImg1 ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={imageUrls.aboutImg1}
                        alt="Banner Preview"
                      />
                    ) : createPromotion.aboutImg1 ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={BASE_URL + createPromotion.aboutImg1}
                        alt="Banner Image"
                      />
                    ) : (
                      <div className="h-[266px] w-[380px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="aboutImg1"
                    id="aboutImg1"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />
                  <div className='mt-2'>
                    <label>Alt name about image 01</label>
                    <input
                      placeholder='alt name banner image'
                      onChange={handleChange}
                      name='altAboutImage01'
                      value={createPromotion.altAboutImage01 || ""}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>
              </div>

              <label>About 01 Paragraph *</label>
              <textarea
                placeholder="About Paragraph"
                type="text"
                name="about01"
                onChange={handleChange}
                value={createPromotion.about01 || ""}
                cols="30"
                rows="5"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <div className="">
                  <label htmlFor="aboutImg2" className="cursor-pointer block mb-2">
                    {imageUrls.aboutImg2 ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={imageUrls.aboutImg2}
                        alt="Banner Preview"
                      />
                    ) : createPromotion.aboutImg2 ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={BASE_URL + createPromotion.aboutImg2}
                        alt="Banner Image"
                      />
                    ) : (
                      <div className="h-[266px] w-[380px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="aboutImg2"
                    id="aboutImg2"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />
                  <div className='mt-2'>
                    <label>Alt name about image 02</label>
                    <input
                      placeholder='alt name banner image'
                      onChange={handleChange}
                      name='altAboutImage02'
                      value={createPromotion.altAboutImage02 || ""}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>
              </div>

              <label>About 02 Paragraph *</label>
              <textarea
                placeholder="About Paragraph"
                type="text"
                name="about02"
                onChange={handleChange}
                value={createPromotion.about02 || ""}
                cols="30"
                rows="5"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />

              <div> 

                <label className="font-bold underline">Theme settings</label>
                <div className="">
                  <label className="">Sub Banner*</label>
                  <label htmlFor="subBanner" className="cursor-pointer block mb-2">
                    {imageUrls.subBanner ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={imageUrls.subBanner}
                        alt="Banner Preview"
                      />
                    ) : createPromotion.subBanner ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={BASE_URL + createPromotion.subBanner}
                        alt="Banner Image"
                      />
                    ) : (
                      <div className="h-[266px] w-[380px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="subBanner"
                    id="subBanner"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />
                  <div className='mt-2'>
                    <label>Alt sub banner image</label>
                    <input
                      placeholder='alt sub banner image'
                      onChange={handleChange}
                      name='altSubBanner'
                      value={createPromotion.altSubBanner || ""}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>

                  <label className="">Background Theme*</label>
                  <label htmlFor="themeImage" className="cursor-pointer block mb-2">
                    {imageUrls.themeImage ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={imageUrls.themeImage}
                        alt="themeImage Preview"
                      />
                    ) : createPromotion.themeImage ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={BASE_URL + createPromotion.themeImage}
                        alt="themeImage Image"
                      />
                    ) : (
                      <div className="h-[266px] w-[380px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="themeImage"
                    id="themeImage"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />
                  <div className='mt-2'>
                    <label>Alt theme image</label>
                    <input
                      placeholder='alt theme image'
                      onChange={handleChange}
                      name='altThemeImage'
                      value={createPromotion.altThemeImage || ""}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>
                  <div className='mt-2'>
                    <label>Theme Color*</label>
                    <input
                      placeholder='Theme Color eg: #ffffff'
                      onChange={handleChange}
                      name='themeColor'
                      value={createPromotion.themeColor || ""}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>

                  <label className="">Popup Banner Image*</label>
                  <label htmlFor="popupBannerImage" className="cursor-pointer block mb-2">
                    {imageUrls.popupBannerImage ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={imageUrls.popupBannerImage}
                        alt="Banner Preview"
                      />
                    ) : createPromotion.popupBannerImage ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={BASE_URL + createPromotion.popupBannerImage}
                        alt="Banner Image"
                      />
                    ) : (
                      <div className="h-[266px] w-[380px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="popupBannerImage"
                    id="popupBannerImage"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />
                  <div className='mt-2'>
                    <label>Alt popup banner image</label>
                    <input
                      placeholder='alt popup banner image'
                      onChange={handleChange}
                      name='altPopupBannerImage'
                      value={createPromotion.altPopupBannerImage || ""}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>

                  <label className="">Brochure Mockup Image*</label>
                  <label htmlFor="brochureImage" className="cursor-pointer block mb-2">
                    {imageUrls.brochureImage ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={imageUrls.brochureImage}
                        alt="Banner Preview"
                      />
                    ) : createPromotion.brochureImage ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={BASE_URL + createPromotion.brochureImage}
                        alt="Banner Image"
                      />
                    ) : (
                      <div className="h-[266px] w-[380px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="brochureImage"
                    id="brochureImage"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />

                  <div className='mt-2'>
                    <label>Brochure Section Title</label>
                    <input
                      placeholder='Brochure Section Title eg: Download Brochure'
                      onChange={handleChange}
                      name='brochureSectionTitle'
                      value={createPromotion.brochureSectionTitle || "Download Brochure"}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>

                  <div className='mt-2'>
                    <label>Brochure Section Sub Title</label>
                    <input
                      placeholder='Brochure Section Sub Title eg: And Learn More About Address Villas at The Oasis'
                      onChange={handleChange}
                      name='brochureSectionSubTitle'
                      value={createPromotion.brochureSectionSubTitle || ""}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>

                  <div className='mt-2'>
                    <label>Brochure Section Background Color</label>
                    <input
                      placeholder='Brochure Section Background Color eg: #ffffff'
                      onChange={handleChange}
                      name='brochureSectionBgColor'
                      value={createPromotion.brochureSectionBgColor || "#1E1E1E"}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>

                  <label className="">Footer Banner Image*</label>
                  <label htmlFor="footerBannerImage" className="cursor-pointer block mb-2">
                    {imageUrls.footerBannerImage ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={imageUrls.footerBannerImage}
                        alt="Banner Preview"
                      />
                    ) : createPromotion.footerBannerImage ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={BASE_URL + createPromotion.footerBannerImage}
                        alt="Banner Image"
                      />
                    ) : (
                      <div className="h-[266px] w-[380px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="footerBannerImage"
                    id="footerBannerImage"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />

                  <div className='mt-2'>
                    <label>Alt Footer Banner Image</label>
                    <input
                      placeholder='Alt Footer Banner Image'
                      onChange={handleChange}
                      name='altFooterBannerImage'
                      value={createPromotion.altFooterBannerImage || ""}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>

                   <div className='mt-2'>
                    <label>Footer Banner Title</label>
                    <input
                      placeholder='Footer Banner Title'
                      onChange={handleChange}
                      name='footerBannerTitle'
                      value={createPromotion.footerBannerTitle || "360° of Luxury Living"}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>

                   <div className='mt-2'>
                    <label>Footer Banner Sub Title</label>
                    <input
                      placeholder='Footer Banner Sub Title'
                      onChange={handleChange}
                      name='footerBannerSubTitle'
                      value={createPromotion.footerBannerSubTitle || "Take a tour of the project"}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>

                  <div className='mt-2'>
                    <label>Footer Banner Button Name</label>
                    <input
                      placeholder='Footer Banner Button Name'
                      onChange={handleChange}
                      name='footerBannerBtnName'
                      value={createPromotion.footerBannerBtnName || "Schedule A Virtual Tour"}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>
                  



                </div>         

            <label className="font-bold underline">SEO</label>
            <div>
              <label>Title *</label>
              <input
                placeholder="Title eg: Waterfront Townhouses & Villas at Damac Islands 2, Dubai"
                onChange={handleChange}
                name="seoTitle"
                value={createPromotion.seoTitle || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Keywords</label>
              <input
                placeholder="Keywords eg: Damac, riverside, ..."
                type="text"
                name="projectkeyword"
                onChange={handleChange}
                value={createPromotion.projectkeyword || ""}
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>

            <label>Description</label>
            <textarea
              placeholder="Project Description"
              type="text"
              name="projectdescription"
              onChange={handleChange}
              value={createPromotion.projectdescription || ""}
              cols="30"
              rows="5"
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
          </div>
              <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTab("tab2")}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
              >
                Next
              </button>
            </div>
              </div>
              
        )}

{/* TAB 2 - Floor plan */}
       {activeTab === "tab2" && (
  <div className="space-y-6">
  <h2 className="text-lg font-semibold mb-4 text-[#000]">
    Floor Plan Section
  </h2>
  <div>
    <label>Banner Title*</label>
           <input
                placeholder={`Banner Title eg: ] Project name + Floor Plans`}
                name="floorPlansBannerTitle"
                value={createPromotion.floorPlansBannerTitle || ""}
                onChange={handleChange}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
              <label>Section Title *</label>
              <input
                placeholder="Title eg: Floor Plans"
                onChange={handleChange}
                name="floorPlanSectionTitle"
                value={createPromotion.floorPlanSectionTitle || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Floor plan common description</label>
               <textarea
                  name="floorPlanCommonDescription"
                  value={createPromotion.floorPlanCommonDescription || ""}
                  onChange={handleChange}
                  placeholder="Floor plan common description"
                  rows="4"
                  className="w-full border border-gray-400 rounded p-2 mb-4"
                ></textarea>
            </div>

  {/* List of floor plans */}
  {Array.isArray(createPromotion.floorPlans) &&
    createPromotion.floorPlans.map((plan, index) => (
      <div
        key={index}
        className="border border-gray-300 rounded-lg p-4 mb-4 relative bg-[#f9f9f9]"
      >
        <h3 className="font-bold mb-3 text-blue-600">
          Floor Plan {index + 1}
        </h3>

        {/* Title */}
        <label className="block mb-2 font-semibold">Title *</label>
        <input
          type="text"
          name="title"
          value={plan.title || ""}
          onChange={(e) => handleChange(e, index, "floorPlan")}
          placeholder="Eg: 1 Bedroom Apartment"
          className="w-full border border-gray-400 rounded p-2 mb-4"
        />

        {/* Heading */}
        <label className="block mb-2 font-semibold">Heading *</label>
        <input
          type="text"
          name="heading"
          value={plan.heading || ""}
          onChange={(e) => handleChange(e, index, "floorPlan")}
          placeholder="Eg: Elegant Layout with Modern Design"
          className="w-full border border-gray-400 rounded p-2 mb-4"
        />

        {/* Description */}
        <label className="block mb-2 font-semibold">Description *</label>
        <textarea
          name="content"
          value={plan.content || ""}
          onChange={(e) => handleChange(e, index, "floorPlan")}
          placeholder="Short description of the floor plan"
          rows="4"
          className="w-full border border-gray-400 rounded p-2 mb-4"
        ></textarea>

        {/* Image Upload */}
        <label className="block mb-2 font-semibold">Upload Image *</label>

        {/* Existing or new image preview */}
        {imageUrls?.floorPlanImages?.[index] ? (
          <Image
            src={imageUrls.floorPlanImages[index]}
            alt="Preview"
            width={150}
            height={100}
            className="mb-3 rounded-md shadow"
          />
        ) : plan.image ? (
          <Image
            src={`${BASE_URL}${plan.image}`}
            alt={plan.altText || "Floor plan"}
            width={150}
            height={100}
            className="mb-3 rounded-md shadow"
          />
        ) : null}

        <input
          type="file"
          accept="image/*"
          name={`floorPlanImage_${index}`}
          onChange={(e) => handleFileInput(e, index, "floorPlan")}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />

        {/* Alt Text */}
        <label className="block mb-2 font-semibold">Alt Name *</label>
        <input
          type="text"
          name="altText"
          value={plan.altText || ""}
          onChange={(e) => handleChange(e, index, "floorPlan")}
          placeholder="Alt text for image"
          className="w-full border border-gray-400 rounded p-2 mb-4"
        />

        {/* Remove button */}
        <button
          type="button"
          onClick={() => {
            const updatedPlans = createPromotion.floorPlans.filter(
              (_, i) => i !== index
            );
            setCreatePromotion((prev) => ({
              ...prev,
              floorPlans: updatedPlans,
            }));
          }}
          className="absolute top-2 right-2 text-red-600 font-semibold"
        >
          ✕
        </button>
      </div>
    ))}

  {/* Add Button */}
  <div className="flex justify-start">
    <button
      type="button"
      onClick={() => {
        if (
          !Array.isArray(createPromotion.floorPlans) ||
          createPromotion.floorPlans.length < 8
        ) {
          setCreatePromotion((prev) => ({
            ...prev,
            floorPlans: [
              ...(prev.floorPlans || []),
              { title: "", heading: "", content: "", altText: "", image: null },
            ],
          }));
        } else {
          Swal.fire(
            "Limit Reached",
            "You can only add up to 8 floor plans",
            "warning"
          );
        }
      }}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      + Add Floor Plan
    </button>
  </div>
   <label className="font-bold underline">Floor Plan SEO</label>
            <div>
              <label>Title *</label>
              <input
                placeholder="Title eg: Waterfront Townhouses & Villas at Damac Islands 2, Dubai"
                onChange={handleChange}
                name="seoTitleFloorPlans"
                value={createPromotion.seoTitleFloorPlans || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Keywords</label>
              <input
                placeholder="Keywords eg: Damac, riverside, ..."
                type="text"
                name="projectkeywordFloorPlans"
                onChange={handleChange}
                value={createPromotion.projectkeywordFloorPlans || ""}
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>

            <label>Description</label>
            <textarea
              placeholder="Floor Flan Description"
              type="text"
              name="projectdescriptionFloorPlans"
              onChange={handleChange}
              value={createPromotion.projectdescriptionFloorPlans || ""}
              cols="30"
              rows="5"
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />

  {/* Back Button */}
  <div className="flex justify-between mt-6">
    <button
      type="button"
      onClick={() => setActiveTab("tab1")}
      className="bg-gray-400 text-white px-4 py-2 rounded mb-3"
    >
      Back
    </button>
    <button
                type="button"
                onClick={() => setActiveTab("tab3")}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
              >
                Next
              </button>
  </div>
</div>
)}

{/* Tab 3 */}
 {activeTab === "tab3" && (
  <div>
     <label className="font-semibold text-lg mb-2 block">Master Plan</label>
      <label>Banner Title*</label>
           <input
                placeholder={`Banner Title eg: ] Project name + Master Plan`}
                name="masterPlanBannerTitle"
                value={createPromotion.masterPlanBannerTitle || ""}
                onChange={handleChange}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
    <label>Section Title *</label>
              <input
                placeholder="Title eg: Master Plan"
                onChange={handleChange}
                name="masterPlanTitle"
                value={createPromotion.masterPlanTitle || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Master Plan Sub Head Paragraph*</label>
          <input
                placeholder="Short description of the Master plan"
                onChange={handleChange}
                name="masterPlanSubTitle"
                value={createPromotion.masterPlanSubTitle || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
   
    <label htmlFor="masterPlanImage" className="cursor-pointer block mb-2">
                    {imageUrls.masterPlanImage ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={imageUrls.masterPlanImage}
                        alt="Banner Preview"
                      />
                    ) : createPromotion.masterPlanImage ? (
                      <Image
                        width={380}
                        height={266}
                        className="rounded-md border border-gray-300 object-cover"
                        src={BASE_URL + createPromotion.masterPlanImage}
                        alt="Banner Image"
                      />
                    ) : (
                      <div className="h-[266px] w-[380px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="masterPlanImage"
                    id="masterPlanImage"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <div className='mt-2'>
                    <label>Alt name Master plan</label>
                    <input
                      placeholder='alt name master plan image'
                      onChange={handleChange}
                      name='altMasterPlanImage'
                      value={createPromotion.altMasterPlanImage || ""}
                      type='text'
                      className='w-full  border border-[#040406] p-[10px] rounded mb-[25px]'
                    />
                  </div>
            <label>Master Plan Description</label>
            <textarea
              placeholder="Master Plan Description"
              type="text"
              name="masterPlanDescription"
              onChange={handleChange}
              value={createPromotion.masterPlanDescription || ""}
              cols="30"
              rows="5"
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />

            <label className="font-bold underline">Master Plan SEO</label>
            <div>
              <label>Title *</label>
              <input
                placeholder="Title eg: Waterfront Townhouses & Villas at Damac Islands 2, Dubai"
                onChange={handleChange}
                name="seoTitleMasterPlan"
                value={createPromotion.seoTitleMasterPlan || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Keywords</label>
              <input
                placeholder="Keywords eg: Damac, riverside, ..."
                type="text"
                name="projectkeywordMasterPlan"
                onChange={handleChange}
                value={createPromotion.projectkeywordMasterPlan || ""}
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>

            <label>Description</label>
            <textarea
              placeholder="Master Flan Description"
              type="text"
              name="projectdescriptionMasterPlan"
              onChange={handleChange}
              value={createPromotion.projectdescriptionMasterPlan || ""}
              cols="30"
              rows="5"
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
            
            {/* Back Button */}
    <div className="flex justify-between mt-6">
      <button
        type="button"
        onClick={() => setActiveTab("tab2")}
        className="bg-gray-400 text-white px-4 py-2 rounded mb-3"
      >
        Back
      </button>
      <button
        type="button"
          onClick={() => setActiveTab("tab4")}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
        >
        Next
      </button>
    </div>
  </div>
                  )}

{/* Tab 4 */}
    {activeTab === "tab4" && (
      <div>
          <label className="font-semibold text-lg mb-2 block">Payment Plan</label>
          <label>Banner Title*</label>
           <input
                placeholder={`Banner Title eg: ] Project name + Payment Plan`}
                name="paymentPlanBannerTitle"
                value={createPromotion.paymentPlanBannerTitle || ""}
                onChange={handleChange}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
          <label>Payment Plan Section Title*</label>
          <input
                placeholder="eg: Payment Plan"
                onChange={handleChange}
                name="paymentPlanTitle"
                value={createPromotion.paymentPlanTitle || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
          <label>Payment Plan Sub Head Paragraph*</label>
          <input
                placeholder="Short description of the Payment plan"
                onChange={handleChange}
                name="paymentPlanSubTitle"
                value={createPromotion.paymentPlanSubTitle || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
          <div className='flex gap-2'>
            <div>
              <label>Column One *</label>
              <input
                placeholder="Header eg: Description"
                onChange={handleChange}
                name="tableColumn1"
                value={createPromotion.tableColumn1 || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>
            <div>
              <label>Column Two *</label>
              <input
                placeholder="Header eg: Milestone Event"
                onChange={handleChange}
                name="tableColumn2"
                value={createPromotion.tableColumn2 || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>
            <div>
              <label>Column Three *</label>
              <input
                placeholder="Header eg: (%) Value"
                onChange={handleChange}
                name="tableColumn3"
                value={createPromotion.tableColumn3 || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>

          </div>
          {Array.isArray(createPromotion.paymentPlan) &&
            createPromotion.paymentPlan.map((plan, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 mb-4 relative bg-[#f9f9f9]"
            >
              <h3 className="font-bold mb-3 text-blue-600">
                Table Row {index + 1}
              </h3>
              <div className='flex gap-2'>
            <div>
              <label>Column One *</label>
              <input
                placeholder={`Table Data eg: 1st installment`}
                name="tableData1"
                value={plan.tableData1 || ""}
                onChange={(e) => handleChange(e, index, "paymentPlan")}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>
            <div>
              <label>Column Two *</label>
              <input
                placeholder="Table Data eg: May 2025"
                name="tableData2"
                value={plan.tableData2 || ""}
                onChange={(e) => handleChange(e, index, "paymentPlan")}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>
            <div>
              <label>Column Three *</label>
              <input
                placeholder="Table Data eg: 10%"
                name="tableData3"
                value={plan.tableData3 || ""}
                onChange={(e) => handleChange(e, index, "paymentPlan")}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>

          </div>

            <button
              type="button"
              onClick={() => {
                const updatedPaymentPlan = createPromotion.paymentPlan.filter(
                  (_, i) => i !== index
                );
                setCreatePromotion((prev) => ({
                  ...prev,
                  paymentPlan: updatedPaymentPlan,
                }));
            }}
            className="absolute top-2 right-2 text-red-600 font-semibold"
           >
            ✕
          </button>

          </div>
            
          ))}
          {/* Add Button */}
  <div className="flex justify-start">
    <button
      type="button"
      onClick={() => {
        if (
          !Array.isArray(createPromotion.paymentPlan) ||
          createPromotion.paymentPlan.length < 20
        ) {
          setCreatePromotion((prev) => ({
            ...prev,
            paymentPlan: [
              ...(prev.paymentPlan || []),
              { tableData1: "", tableData2: "", tableData3: "" },
            ],
          }));
        } else {
          Swal.fire(
            "Limit Reached",
            "You can only add up to 20 floor plans",
            "warning"
          );
        }
      }}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-2"
    >
      + Add Payment Plan
    </button>

    
  </div>
   <label>Payment Plan Common Discription*</label>
        <textarea
          name="paymentPlanDetailDescription"
          value={createPromotion.paymentPlanDetailDescription || ""}
          onChange={handleChange}
          placeholder="Detail description of the payment plan"
          rows="4"
          className="w-full border border-gray-400 rounded p-2 mb-4"
        ></textarea>

          <label className="font-bold underline">Payment Plan SEO</label>
            <div>
              <label>Title *</label>
              <input
                placeholder="Title eg: Waterfront Townhouses & Villas at Damac Islands 2, Dubai"
                onChange={handleChange}
                name="seoTitlePaymentPlan"
                value={createPromotion.seoTitlePaymentPlan || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Keywords</label>
              <input
                placeholder="Keywords eg: Damac, riverside, ..."
                type="text"
                name="projectkeywordPaymentPlan"
                onChange={handleChange}
                value={createPromotion.projectkeywordPaymentPlan || ""}
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>

            <label>Description</label>
            <textarea
              placeholder="Master Flan Description"
              type="text"
              name="projectdescriptionPaymentPlan"
              onChange={handleChange}
              value={createPromotion.projectdescriptionPaymentPlan || ""}
              cols="30"
              rows="5"
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => setActiveTab("tab3")}
            className="bg-gray-400 text-white px-4 py-2 rounded mb-3"
          >
            Back
          </button>
          <button
                type="button"
                onClick={() => setActiveTab("tab5")}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
              >
                Next
          </button>
        </div>
      </div>
                  )}

    {/* Tab 5 */}
    {activeTab === "tab5" && (
      <div>
         <label className="font-semibold text-lg mb-2 block">Amenitie</label>
          <label>Amenitie Section Title*</label>
          <input
                placeholder="eg: Experience Island Living in Dubai"
                onChange={handleChange}
                name="amenitiesSectionTitle"
                value={createPromotion.amenitiesSectionTitle || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
          <label>Amenities Sub Head Paragraph*</label>
           <input
                placeholder={`Alt image`}
                name="amenitiesSectionSubTitle"
                value={createPromotion.amenitiesSectionSubTitle || ""}
                onChange={handleChange}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />

            <label>Banner Title*</label>
           <input
                placeholder={`Banner Title eg: World-Class Amenities for a Luxurious Lifestyle`}
                name="amenitiesBannerTitle"
                value={createPromotion.amenitiesBannerTitle || ""}
                onChange={handleChange}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
        <div className='flex gap-2'>
          <div>
              <label htmlFor="amenitieImage1" className="cursor-pointer block mb-2">
                    {imageUrls.amenitieImage1 ? (
                      <Image
                        width={210}
                        height={434}
                        className="rounded-md border border-gray-300 object-cover"
                        src={imageUrls.amenitieImage1}
                        alt="Banner Preview"
                      />
                    ) : createPromotion.amenitieImage1 ? (
                      <Image
                        width={210}
                        height={434}
                        className="rounded-md border border-gray-300 object-cover"
                        src={BASE_URL + createPromotion.amenitieImage1}
                        alt="Banner Image"
                      />
                    ) : (
                      <div className="h-[434px] w-[210px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="amenitieImage1"
                    id="amenitieImage1"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
              <input
                placeholder={`Alt image`}
                name="altAmenitieImage1"
                value={createPromotion.altAmenitieImage1 || ""}
                onChange={handleChange}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
          </div>
           <div>
              <label htmlFor="amenitieImage2" className="cursor-pointer block mb-2">
                    {imageUrls.amenitieImage2 ? (
                      <Image
                        width={210}
                        height={434}
                        className="rounded-md border border-gray-300 object-cover"
                        src={imageUrls.amenitieImage2}
                        alt="Banner Preview"
                      />
                    ) : createPromotion.amenitieImage2 ? (
                      <Image
                        width={210}
                        height={434}
                        className="rounded-md border border-gray-300 object-cover"
                        src={BASE_URL + createPromotion.amenitieImage2}
                        alt="Banner Image"
                      />
                    ) : (
                      <div className="h-[434px] w-[210px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="amenitieImage2"
                    id="amenitieImage2"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
              <input
                placeholder={`Alt image`}
                name="altAmenitieImage2"
                value={createPromotion.altAmenitieImage2 || ""}
                onChange={handleChange}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
          </div>
           <div>
              <label htmlFor="amenitieImage3" className="cursor-pointer block mb-2">
                    {imageUrls.amenitieImage3 ? (
                      <Image
                        width={210}
                        height={434}
                        className="rounded-md border border-gray-300 object-cover"
                        src={imageUrls.amenitieImage3}
                        alt="Banner Preview"
                      />
                    ) : createPromotion.amenitieImage3 ? (
                      <Image
                        width={210}
                        height={434}
                        className="rounded-md border border-gray-300 object-cover"
                        src={BASE_URL + createPromotion.amenitieImage3}
                        alt="Banner Image"
                      />
                    ) : (
                      <div className="h-[434px] w-[210px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="amenitieImage3"
                    id="amenitieImage3"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
              <input
                placeholder={`Alt image`}
                name="altAmenitieImage3"
                value={createPromotion.altAmenitieImage3 || ""}
                onChange={handleChange}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
          </div>
           <div>
              <label htmlFor="amenitieImage4" className="cursor-pointer block mb-2">
                    {imageUrls.amenitieImage4 ? (
                      <Image
                        width={210}
                        height={434}
                        className="rounded-md border border-gray-300 object-cover"
                        src={imageUrls.amenitieImage4}
                        alt="Banner Preview"
                      />
                    ) : createPromotion.amenitieImage4 ? (
                      <Image
                        width={210}
                        height={434}
                        className="rounded-md border border-gray-300 object-cover"
                        src={BASE_URL + createPromotion.amenitieImage4}
                        alt="Banner Image"
                      />
                    ) : (
                      <div className="h-[434px] w-[210px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="amenitieImage4"
                    id="amenitieImage4"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
              <input
                placeholder={`Alt image`}
                name="altAmenitieImage4"
                value={createPromotion.altAmenitieImage4 || ""}
                onChange={handleChange}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
          </div>
           <div>
              <label htmlFor="amenitieImage5" className="cursor-pointer block mb-2">
                    {imageUrls.amenitieImage5 ? (
                      <Image
                        width={210}
                        height={434}
                        className="rounded-md border border-gray-300 object-cover"
                        src={imageUrls.amenitieImage5}
                        alt="Banner Preview"
                      />
                    ) : createPromotion.amenitieImage5 ? (
                      <Image
                        width={210}
                        height={434}
                        className="rounded-md border border-gray-300 object-cover"
                        src={BASE_URL + createPromotion.amenitieImage5}
                        alt="Banner Image"
                      />
                    ) : (
                      <div className="h-[434px] w-[210px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="amenitieImage5"
                    id="amenitieImage5"
                    onChange={handleFileInput}
                    className="block w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
              <input
                placeholder={`Alt image`}
                name="altAmenitieImage5"
                value={createPromotion.altAmenitieImage5 || ""}
                onChange={handleChange}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
          </div>
          
        </div>

         <label>Amenities Common Discription*</label>
        <textarea
          name="amenitieDetailDescription"
          value={createPromotion.amenitieDetailDescription || ""}
          onChange={handleChange}
          placeholder="Detail description of the payment plan"
          rows="4"
          className="w-full border border-gray-400 rounded p-2 mb-4"
        ></textarea>

        <label className="font-bold underline">Amenities SEO</label>
            <div>
              <label>Title *</label>
              <input
                placeholder="Title eg: Waterfront Townhouses & Villas at Damac Islands 2, Dubai"
                onChange={handleChange}
                name="seoTitleAmenities"
                value={createPromotion.seoTitleAmenities || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Keywords</label>
              <input
                placeholder="Keywords eg: Damac, riverside, ..."
                type="text"
                name="projectkeywordAmenities"
                onChange={handleChange}
                value={createPromotion.projectkeywordAmenities || ""}
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>

            <label>Description</label>
            <textarea
              placeholder="Master Flan Description"
              type="text"
              name="projectdescriptionAmenities"
              onChange={handleChange}
              value={createPromotion.projectdescriptionAmenities || ""}
              cols="30"
              rows="5"
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />

         <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => setActiveTab("tab4")}
            className="bg-gray-400 text-white px-4 py-2 rounded mb-3"
          >
            Back
          </button>
          <button
                type="button"
                onClick={() => setActiveTab("tab6")}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
              >
                Next
          </button>
        </div>
      </div>)}

       {/* TAB 6 - FAQ */}
       {activeTab === "tab6" && (
        <div className="">
          <label>FAQ Section Title</label>
              <input
                placeholder="Frequently Asked Questions"
                type="text"
                name="faqTitle"
                onChange={handleChange}
                value={createPromotion.faqTitle || "Frequently Asked Questions"}
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Question1</label>
              <input
                placeholder="Question1"
                type="text"
                name="q1"
                onChange={handleChange}
                value={createPromotion.q1 || ""}
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Answer1</label>
              <textarea
                placeholder="Answer1"
                type="text"
                name="a1"
                onChange={handleChange}
                value={createPromotion.a1 || ""}
                cols="30"
                rows="2"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Question2</label>
              <input
                placeholder="Question1"
                type="text"
                name="q2"
                onChange={handleChange}
                value={createPromotion.q2 || ""}
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Answer2</label>
              <textarea
                placeholder="Answer2"
                type="text"
                name="a2"
                onChange={handleChange}
                value={createPromotion.a2 || ""}
                cols="30"
                rows="2"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Question3</label>
              <input
                placeholder="Question1"
                type="text"
                name="q3"
                onChange={handleChange}
                value={createPromotion.q3 || ""}
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Answer3</label>
              <textarea
                placeholder="Answer3"
                type="text"
                name="a3"
                onChange={handleChange}
                value={createPromotion.a3 || ""}
                cols="30"
                rows="2"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Question4</label>
              <input
                placeholder="Question4"
                type="text"
                name="q4"
                onChange={handleChange}
                value={createPromotion.q4 || ""}
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Answer4</label>
              <textarea
                placeholder="Answer1"
                type="text"
                name="a4"
                onChange={handleChange}
                value={createPromotion.a4 || ""}
                cols="30"
                rows="2"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Question5</label>
              <input
                placeholder="Question5"
                type="text"
                name="q5"
                onChange={handleChange}
                value={createPromotion.q5 || ""}
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Answer5</label>
              <textarea
                placeholder="Answer5"
                type="text"
                name="a5"
                onChange={handleChange}
                value={createPromotion.a5 || ""}
                cols="30"
                rows="2"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />

              <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => setActiveTab("tab5")}
            className="bg-gray-400 text-white px-4 py-2 rounded mb-3"
          >
            Back
          </button>
          <button
                type="button"
                onClick={() => setActiveTab("tab7")}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
              >
                Next
          </button>
        </div>
        </div>
        
        )}

      {/* TAB 7 - About & SEO */}
       {activeTab === "tab7" && (
        <div className="">
        <h2 className="text-lg font-semibold mb-4 text-[#000]">
           About Page
        </h2>
         <label>Banner Title*</label>
           <input
                placeholder={`Banner Title eg: About Us`}
                name="aboutBannerTitle"
                value={createPromotion.aboutBannerTitle || ""}
                onChange={handleChange}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-4"
            />
            <label className="font-bold underline">About Page SEO</label>
            <div>
              <label>Title *</label>
              <input
                placeholder="Title eg: Waterfront Townhouses & Villas at Damac Islands 2, Dubai"
                onChange={handleChange}
                name="seoTitleAbout"
                value={createPromotion.seoTitleAbout || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Keywords</label>
              <input
                placeholder="Keywords eg: Damac, riverside, ..."
                type="text"
                name="projectkeywordAbout"
                onChange={handleChange}
                value={createPromotion.projectkeywordAbout || ""}
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>

            <label>Description</label>
            <textarea
              placeholder="Project Description"
              type="text"
              name="projectdescriptionAbout"
              onChange={handleChange}
              value={createPromotion.projectdescriptionAbout || ""}
              cols="30"
              rows="5"
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
            <div className="flex justify-between mt-6">

          <button
            type="button"
            onClick={() => setActiveTab("tab6")}
            className="bg-gray-400 text-white px-4 py-2 rounded mb-3"
          >
            Back
          </button>
          <button
                type="button"
                onClick={() => setActiveTab("tab8")}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
              >
                Next
          </button>
        </div>
        </div>
      )}
       {/* TAB 8 - contact us */}
       {activeTab === "tab8" && (
        <div className="">
          <h2 className="text-lg font-semibold mb-4 text-[#000]">
            Contact Page
          </h2>
          <label>Banner Title*</label>
            <input
              placeholder="Contact Us"
              name="contactBannerTitle"
              value={createPromotion.contactBannerTitle || "Contact Us"}
              onChange={handleChange}
              type="text"
              className="w-full border border-[#040406] p-[10px] rounded mb-4"
            />

          <label>Sub Title*</label>
            <input
              placeholder="We love to hear about your dream goals. Please get in touch with one of our Project Consultants."
              name="contactBannerSubTitle"
              value={
                createPromotion.contactBannerSubTitle ||
                "We love to hear about your dream goals. Please get in touch with one of our Project Consultants."
              }
              onChange={handleChange}
              type="text"
              className="w-full border border-[#040406] p-[10px] rounded mb-4"
            />

            <label className="font-bold underline">Contact Page SEO</label>
            <div>
              <label>Title *</label>
              <input
                placeholder="Title eg: Waterfront Townhouses & Villas at Damac Islands 2, Dubai"
                onChange={handleChange}
                name="seoTitleContact"
                value={createPromotion.seoTitleContact || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
              <label>Keywords</label>
              <input
                placeholder="Keywords eg: Damac, riverside, ..."
                type="text"
                name="projectkeywordContact"
                onChange={handleChange}
                value={createPromotion.projectkeywordContact || ""}
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>

            <label>Description</label>
            <textarea
              placeholder="Project Description"
              type="text"
              name="projectdescriptionContact"
              onChange={handleChange}
              value={createPromotion.projectdescriptionContact || ""}
              cols="30"
              rows="5"
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />

             <div className="flex justify-between mt-6">

          <button
            type="button"
            onClick={() => setActiveTab("tab7")}
            className="bg-gray-400 text-white px-4 py-2 rounded mb-3"
          >
            Back
          </button>
         
        </div>

        </div>
       )}

       

          </form>

            <div className="mb-3 flex gap-4 justify-end">
                <button
                onClick={handleReset}
                className="bg-[#00A3FF] hover:bg-[#6A9F43] px-[2.5rem] py-[0.4rem] rounded-md text-[#ffffff]"
                >
                Clear
                </button>
                <button
                onClick={handleSubmit}
                className=" bg-[#00A3FF] hover:bg-[#6A9F43] px-[2.5rem] py-[0.4rem] rounded-md text-[#ffffff]"
                >
                {createPromotion.id ? "Update" : "Submit"}
                </button>
                {message && <p>{message}</p>}
            </div>
        </div>
         <div className="mb-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <ViewPromotion {...{ createPromotion, setCreatePromotion, submit }} />
                  </Suspense>
          </div>
    </div>
  )
}