"use client";

import React, { useEffect, useState } from "react";
import logoDefult from "@/public/assets/logo/dnklogo_1.webp";
import { useProjectServices } from "@/services/projectServices";
import Swal from "sweetalert2";
import { URL } from "@/url/axios";
import Image from "next/image";

const AddLogo = () => {
  const [logo, setLogo] = useState({ image: null });
  const [logoId, setLogoId] = useState(null);
  const [imageUrl, setImageUrl] = useState(logoDefult);

  const { postLogo, putLogo, getLogoR, deleteLogo } = useProjectServices();

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    try {
      const response = await getLogoR();
      if (response.success && response.data.length > 0) {
        const logoData = response.data[0];
        setLogo({ image: logoData.image });
        setLogoId(logoData._id);
      }
    } catch (err) {
      console.error("Failed to fetch logo:", err);
    }
  };

  const handleFileInput = (e) => {
    const field = e.target.name;
    const file = e.target.files[0];

    setLogo((prev) => ({ ...prev, [field]: file }));

    if (typeof window !== "undefined" && file) {
      const fileURL = window.URL.createObjectURL(file);
      setImageUrl(fileURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      if (logo.image instanceof File) {
        formdata.append("image", logo.image);
      } else {
        Swal.fire("Failed", "Please upload a valid image file!", "error");
        return;
      }

      const response = logoId
        ? await putLogo(logoId, formdata)
        : await postLogo(formdata);

      if (response.success) {
        Swal.fire("Success", "Successfully added/updated", "success");
        fetchLogo();
      } else {
        Swal.fire("Failed", "Failed to add/update logo", "error");
      }
    } catch (err) {
      Swal.fire(
        "Failed",
        err?.response?.data?.message || "Logo upload operation failed",
        "error"
      );
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteLogo();
      if (response.success) {
        Swal.fire("Success", response.message || "Deleted logo", "success");
        setLogo({ image: null });
        setLogoId(null);
        setImageUrl(logoDefult);
      } else {
        Swal.fire("Failed", "Failed to delete logo", "error");
      }
    } catch (err) {
      Swal.fire(
        "Failed",
        err?.response?.data?.message || "Failed to delete logo",
        "error"
      );
    }
  };

  return (
    <div>
      <h1 className="text-[#000] font-semibold">
        {logoId ? "Update" : "Change"} Site Logo
      </h1>

      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">
                      <Image
                          height={400}
                          width={400}
              className="w-fit h-[400px] bg-slate-600"
              src={
                typeof imageUrl === "string"
                  ? imageUrl
                  : logo.image
                  ? URL + logo.image
                  : logoDefult
              }
              alt="Site Logo"
            />
          </label>
          <input
            type="file"
            className="hidden"
            name="image"
            onChange={handleFileInput}
            id="image"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-[#00A3FF] hover:bg-[#6A9F43] px-10 py-2 rounded-md text-white mt-6"
          >
            {logoId ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      {logoId && (
        <button
          onClick={handleDelete}
          className="bg-[#00A3FF] hover:bg-[#6A9F43] px-10 py-2 rounded-md text-white mt-6"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default AddLogo;