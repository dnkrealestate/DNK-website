"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AdPoster from "@/public/assets/icons/adposter.webp";
import Swal from "sweetalert2";
import { useProjectServices } from "@/services/projectServices";
import { URL as API_URL } from "@/url/axios";

const AddAdImage = () => {
  const [adPoster, setAdPoster] = useState({ image: null });
  const [adId, setAdId] = useState(null);
  const [imageUrl, setImageUrl] = useState({ image: AdPoster });

  const { getAdR, putAd, postAdImage } = useProjectServices();

  useEffect(() => {
    fetchAd();
  }, []);

  const fetchAd = async () => {
    try {
      const response = await getAdR();
      if (response.success && response.data.length > 0) {
        const adData = response.data[0];
        setAdPoster({ image: adData.image });
        setAdId(adData._id);
      }
    } catch (err) {
      console.error("Failed to fetch ad image:", err);
    }
  };

  const handleFileInput = (e) => {
    const field = e.target.name;
    const file = e.target.files[0];
    setAdPoster((prev) => ({ ...prev, [field]: file }));
    setImageUrl((prev) => ({
      ...prev,
      [field]: file ? window.URL.createObjectURL(file) : prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!(adPoster.image instanceof File)) {
        Swal.fire("Failed", "Please upload a valid image!", "error");
        return;
      }

      const formData = new FormData();
      formData.append("image", adPoster.image);

      let response;
      if (adId) {
        response = await putAd(adId, formData);
      } else {
        response = await postAdImage(formData);
      }

      if (response.success) {
        Swal.fire("Success", "Advertisement updated successfully!", "success");
        fetchAd();
      } else {
        Swal.fire("Failed", "Update failed", "error");
      }
    } catch (err) {
      Swal.fire(
        "Failed",
        err?.response?.data?.message || "Error updating ad image",
        "error"
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-black font-semibold text-lg mb-4">
        {adId ? "Update" : "Add"} Advertisement Image
      </h1>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col items-start"
      >
        <label htmlFor="image" className="cursor-pointer">
          <Image
            src={
              imageUrl?.image && typeof imageUrl.image === "string"
                ? imageUrl.image
                : adPoster.image
                ? `${API_URL}/${adPoster.image}`
                : AdPoster
            }
            alt="Advertisement"
            width={400}
            height={400}
            className="rounded border object-cover"
          />
        </label>

        <input
          type="file"
          name="image"
          id="image"
          className="hidden"
          accept="image/*"
          onChange={handleFileInput}
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-green-600 text-white px-10 py-2 mt-6 rounded"
        >
          {adId ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddAdImage;
