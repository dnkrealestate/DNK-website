"use client";

import React, { Suspense, useEffect, useState } from "react";
import addLogo from "@/public/assets/icons/addlogo.webp";
import { userPartnerServices } from "@/services/partnerServices";
import Swal from "sweetalert2";
import ViewPartner from "./ViewPartner";
import { URL } from "@/url/axios";

const AddPartner = (props) => {
  const initialState = {
    partnername: "",
    image: null,
    partnerdescription: "",
  };

  const [addPartner, setAddPartner] = useState(initialState);
  const [imageUrl, setImageUrl] = useState({ image: null });
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState("");

  const { postPartner, getPartnerR, putPartner } = userPartnerServices();

  useEffect(() => {
    if (props.mode === "update" && props.user_id) {
      fetchPartner(props.user_id);
    }
  }, [props.mode, props.user_id]);

  const fetchPartner = async (id) => {
    try {
      const response = await getPartnerR(id);
      const partnerData = response.data;

      setAddPartner(partnerData); 
      setImageUrl({
        image: partnerData.imageUrl ? URL + partnerData.imageUrl : null,
      });
    } catch (err) {
      console.error("Failed to fetch partner details:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddPartner((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInput = (e) => {
    const field = e.target.name;
    const file = e.target.files[0];

    setAddPartner((prev) => ({ ...prev, [field]: file }));
   setImageUrl((prev) => ({
     ...prev,
     [field]: file ? window.URL.createObjectURL(file) : prev[field],
   }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const submitData = {
      ...addPartner,
      partnername: addPartner.partnername?.replace(/\s+/g, "-"),
    };

    const formdata = new FormData();

    // Append all fields
    for (const [key, value] of Object.entries(submitData)) {
      if (value instanceof File) {
        formdata.append(key, value);
      } else if (typeof value === "string") {
        formdata.append(key, value);
      }
    }

    let response;

    if (addPartner.id) {
      // Update partner
      response = await putPartner(addPartner.id, formdata);
    } else {
      // Create new partner
      if (!submitData.image || !(submitData.image instanceof File)) {
        Swal.fire("Failed", "Please upload a partner logo!", "error");
        return;
      }
      response = await postPartner(formdata);
    }

    if (response.success) {
      Swal.fire("Success", "Partner added/updated successfully", "success");
      handleReset();
      setMessage("Please refresh the page");
      setSubmit(!submit);
      if (addPartner.id) fetchPartner(addPartner.id);
    } else {
      Swal.fire("Failed", "Failed to add/update partner", "error");
    }
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Failed to submit partner details", "error");
  }
};



  const handleReset = () => {
    setAddPartner(initialState);
    setImageUrl({ image: null });
  };

  return (
    <div className="text-[#000]">
      <div>
        <h1 className="text-black font-semibold mb-4">Add Partner</h1>
      </div>

      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Developer Name</label>
          <input
            placeholder="Developer Name"
            type="text"
            name="partnername"
            onChange={handleChange}
            value={addPartner.partnername || ""}
            className="w-full border border-black p-2 rounded mb-3"
          />

          <label htmlFor="image" className="block">
            <img
              className="m-3 w-[200px] h-[70px] bg-black object-contain"
              src={imageUrl?.image || addLogo.src}
              alt="partner logo"
            />
          </label>

          <input
            type="file"
            className="hidden"
            name="image"
            onChange={handleFileInput}
            id="image"
          />
          <label className="block mb-1">Developer Description</label>
          <textarea
            placeholder="Developer Description"
            name="partnerdescription"
            onChange={handleChange}
            value={addPartner.partnerdescription || ""}
            className="w-full border border-black p-2 rounded mb-3"
          />
        </div>

        <button
          type="submit"
          className="bg-[#00A3FF] hover:bg-[#6A9F43] px-10 py-2 rounded-md text-white"
        >
          {addPartner.id ? "Update" : "Submit"}
        </button>
        {message && <p className="mt-3 text-sm text-green-700">{message}</p>}
      </form>

      <Suspense fallback={<div>Loading...</div>}>
        <ViewPartner
          addPartner={addPartner}
          setAddPartner={setAddPartner}
          setImageUrl={setImageUrl} 
          submit={submit}
          params={props.params || "active"}
        />
      </Suspense>
    </div>
  );
};

export default AddPartner;