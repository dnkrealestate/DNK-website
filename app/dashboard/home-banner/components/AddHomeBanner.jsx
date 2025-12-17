"use client";

import React, { useEffect, useState } from "react";
import HomeBannerDefault from "@/public/assets/icons/coverimage.webp";
import AboutBannerDefault from "@/public/assets/icons/adposter.webp";
import { useProjectServices } from "@/services/projectServices";
import Swal from "sweetalert2";
import { WWURL } from "@/url/axios";
import Image from "next/image";

export const AddHomeBanner = () => {
  const [homeBanner, setHomeBanner] = useState({
    image: null,
    mobileImage: null,
    aboutImage: null,
    bannerTitle: "",
    bannerSubTitle: "",
  });

  const [homeBannerId, setHomeBannerId] = useState(null);
  const [imageUrl, setImageUrl] = useState(HomeBannerDefault);
  const [mobileImageUrl, setMobileImageUrl] = useState(AboutBannerDefault);
  const [aboutImageUrl, setAboutImageUrl] = useState(AboutBannerDefault);

  const { putHomeBanner, postHomeBannerImage, getHomeBannerR } =
    useProjectServices();

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await getHomeBannerR();
      if (response.success && response.data.length > 0) {
        const data = response.data[0];

        setHomeBanner({
          image: data.image || null,
          mobileImage: data.mobileImage || null,
          aboutImage: data.aboutImage || null,
          bannerTitle: data.bannerTitle || "",
          bannerSubTitle: data.bannerSubTitle || "",
        });

        setHomeBannerId(data._id);

        if (data.image) setImageUrl(WWURL + data.image);
        if (data.mobileImage) setMobileImageUrl(WWURL + data.mobileImage);
        if (data.aboutImage) setAboutImageUrl(WWURL + data.aboutImage);
      }
    } catch (err) {
      console.error("Failed to fetch Home Banner:", err);
    }
  };

  const handleFileInput = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setHomeBanner((prev) => ({ ...prev, [type]: file }));

    if (type === "image") {
      setImageUrl(URL.createObjectURL(file));
    } else if (type === "mobileImage") {
      setMobileImageUrl(URL.createObjectURL(file));
    } else if (type === "aboutImage") {
      setAboutImageUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHomeBanner((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();

      if (homeBanner.image instanceof File)
        formdata.append("image", homeBanner.image);

      if (homeBanner.mobileImage instanceof File)
        formdata.append("mobileImage", homeBanner.mobileImage);

      if (homeBanner.aboutImage instanceof File)
        formdata.append("aboutImage", homeBanner.aboutImage);

      formdata.append("bannerTitle", homeBanner.bannerTitle);
      formdata.append("bannerSubTitle", homeBanner.bannerSubTitle);

      let response;
      if (homeBannerId) {
        response = await putHomeBanner(homeBannerId, formdata);
      } else {
        response = await postHomeBannerImage(formdata);
      }

      if (response.success) {
        Swal.fire("Success", "Home banner saved successfully", "success");
        fetchBanner();
      } else {
        Swal.fire("Failed", "Failed to save home banner", "error");
      }
    } catch (err) {
      Swal.fire(
        "Failed",
        err?.response?.data?.message || "Banner upload failed",
        "error"
      );
    }
  };

  return (
    <div className="text-black py-5">
      <h1 className="font-semibold mb-4 text-black">
        {homeBannerId ? "Update" : "Add"} Home Page Data
      </h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Main Banner Image */}
        <div className="mb-6">
          <label htmlFor="image">
            <Image
              width={800}
              height={400}
              className="w-full h-[400px] object-cover cursor-pointer rounded border"
              src={imageUrl}
              alt="Home Banner"
            />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileInput(e, "image")}
            className="hidden"
          />
        </div>

         {/* Mobile Banner */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Mobile Screen Banner</label>
          <label htmlFor="mobileImage">
            <Image
              width={800}
              height={400}
              className="w-fit h-[400px] object-cover cursor-pointer rounded border"
              src={mobileImageUrl}
              alt="Mobile Banner"
            />
          </label>
          <input
            type="file"
            id="mobileImage"
            accept="image/*"
            onChange={(e) => handleFileInput(e, "mobileImage")}
            className="hidden"
          />
        </div>

        {/* Banner Title */}
        <label className="block mb-1 font-medium">Banner Title *</label>
        <input
          name="bannerTitle"
          value={homeBanner.bannerTitle}
          onChange={handleChange}
          type="text"
          className="w-full border border-[#040406] p-2 rounded mb-4"
          placeholder="Banner Title"
          required
        />

        {/* Banner Sub Title */}
        <label className="block mb-1 font-medium">Banner Sub Title *</label>
        <textarea
              placeholder="Banner Sub Title"
              type="text"
              name="bannerSubTitle"
              onChange={handleChange}
              value={homeBanner.bannerSubTitle || ""}
              cols="30"
              rows="3"
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />

        {/* About Image */}
        <div className="mb-6">
          <label htmlFor="aboutImage">
            <Image
              width={800}
              height={400}
              className="w-fit h-[400px] object-cover cursor-pointer rounded border"
              src={aboutImageUrl}
              alt="About Banner"
            />
          </label>
          <input
            type="file"
            id="aboutImage"
            name="aboutImage"
            accept="image/*"
            onChange={(e) => handleFileInput(e, "aboutImage")}
            className="hidden"
          />
        </div>

        <button
          type="submit"
          className="bg-[#00A3FF] hover:bg-[#6A9F43] px-10 py-2 rounded text-white"
        >
          {homeBannerId ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddHomeBanner;
