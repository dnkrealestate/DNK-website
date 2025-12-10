"use client";

import React, { useEffect, useState } from "react";
import HomeBannerDefult from "@/public/assets/icons/coverimage.webp";
import { useProjectServices } from "@/services/projectServices";
import Swal from "sweetalert2";
import { URL } from "@/url/axios";
import Image from "next/image";

export const AddHomeBanner = () => {
  const [homeBanner, setHomeBanner] = useState({ image: null });
  const [homeBannerId, setHomeBannerId] = useState(null);
  const [imageUrl, setImageUrl] = useState(HomeBannerDefult);

  const { putHomeBanner, postHomeBannerImage, getHomeBannerR } =
    useProjectServices();

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await getHomeBannerR();

      if (response.success) {
        const homeBannerData = response.data;

        if (homeBannerData.length > 0) {
          const homeBannerImage = homeBannerData[0].image;
          const homeBannerId = homeBannerData[0]._id;
          setHomeBanner({ image: homeBannerImage });
          setHomeBannerId(homeBannerId);
          // Only set image preview if it's a string (not yet updated via file)
          setImageUrl(URL + homeBannerImage);
        }
      }
    } catch (err) {
      console.error("Failed to fetch Home Banner image:", err);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    if (file) {
      setHomeBanner({ image: file });
      setImageUrl(window.URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();

      if (homeBanner.image instanceof File) {
        formdata.append("image", homeBanner.image);
      } else {
        Swal.fire("Failed", "Please upload a valid image file!", "error");
        return;
      }

      let response;
      if (homeBannerId) {
        response = await putHomeBanner(homeBannerId, formdata);
      } else {
        response = await postHomeBannerImage(formdata);
      }

      if (response.success) {
        Swal.fire("Success", "Successfully added/updated", "success");
        fetchBanner();
      } else {
        Swal.fire("Failed", "Failed to add/update home banner", "error");
      }
    } catch (err) {
      Swal.fire(
        "Failed",
        err?.response?.data?.message || "Banner upload operation failed",
        "error"
      );
    }
  };

  return (
    <div className="text-[#000]">
      <h1 className="text-[#000] font-semibold">
        {homeBannerId ? "Update" : "Add"} Home Banner Image
      </h1>

      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">
            <Image
              width={800}
              height={400}
              className="w-full h-[400px] object-cover cursor-pointer"
              src={typeof imageUrl === "string" ? imageUrl : HomeBannerDefult}
              alt="HomeBanner"
            />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          <button
            type="submit"
            className="bg-[#00A3FF] hover:bg-[#6A9F43] px-10 py-2 rounded-md text-white mt-6"
          >
            {homeBannerId ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHomeBanner;