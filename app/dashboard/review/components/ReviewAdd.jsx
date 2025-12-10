"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import avatar from "@/public/assets/icons/avatar.webp";
import { userReviewServices } from "@/services/reviewServices";
import Swal from "sweetalert2";
import ViewReview from "./ViewReview";

const ReviewAdd = (props) => {
  const initialState = {
    image: null,
    name: "",
    message: "",
  };

  const [addReview, setAddReview] = useState(initialState);
  const [imageUrl, setImageUrl] = useState({ image: null });
  const [submit, setSubmit] = useState(false);

  const { postReview, getReviewR, putReview } = userReviewServices();

  useEffect(() => {
    if (props.mode === "update" && props.user_id) {
      fetchReview(props.user_id);
    }
  }, [props.mode, props.user_id]);

  const fetchReview = async (id) => {
    try {
      const response = await getReviewR(id);
      if (response?.data) {
        setAddReview(response.data);
        setImageUrl({
          image: response.data.imageUrl?.image || null,
        });
      }
    } catch (err) {
      console.error("Failed to fetch review details:", err);
    }
  };

  const handleChange = (e) => {
    setAddReview({
      ...addReview,
      [e.target.name]: e.target.value || null,
    });
  };

  const handleFileInput = (e) => {
    const field = e.target.name;
    const file = e.target.files[0];
    setAddReview((prev) => ({ ...prev, [field]: file }));

    if (file) {
      setImageUrl((prev) => ({
        ...prev,
        [field]: window.URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      for (const [key, value] of Object.entries(addReview)) {
        if (value instanceof File || typeof value === "string") {
          formdata.append(key, value);
        } else {
          Swal.fire("Failed", "Please provide all required fields!", "error");
          return;
        }
      }

      let response;
      if (addReview.id) {
        response = await putReview(addReview.id, formdata);
      } else {
        response = await postReview(formdata);
      }

      if (response.success) {
        Swal.fire("Success", "Review added/updated successfully!", "success");
        handleReset();
        setSubmit(!submit);
        if (props.user_id) fetchReview(props.user_id);
      } else {
        Swal.fire("Failed", "Operation failed", "error");
      }
    } catch (err) {
      Swal.fire("Failed", "Error submitting review", "error");
    }
  };

  const handleReset = () => {
    setAddReview(initialState);
    setImageUrl({ image: null });
  };

  return (
    <div className="p-4 text-[#000]">
      <h1 className="text-black font-semibold text-lg mb-4">Add Review</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-6"
      >
        <div className="mb-4">
          <label htmlFor="image" className="cursor-pointer inline-block">
            <Image
              src={imageUrl.image || avatar}
              alt="user-icon"
              width={80}
              height={80}
              className="rounded-full"
            />
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            onChange={handleFileInput}
            accept="image/*"
          />
        </div>

        <div>
          <label htmlFor="name">Author Name</label>
          <input
            type="text"
            name="name"
            value={addReview.name || ""}
            onChange={handleChange}
            placeholder="Author Name"
            className="w-full border border-black p-2 rounded mb-4"
          />
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            value={addReview.message || ""}
            onChange={handleChange}
            placeholder="Message"
            rows={5}
            className="w-full border border-black p-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="bg-blue-500 hover:bg-green-600 px-10 py-2 text-white rounded"
          >
            Clear
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-green-600 px-10 py-2 text-white rounded"
          >
            {addReview.id ? "Update" : "Submit"}
          </button>
        </div>
      </form>
      <Suspense fallback={<div>Loading...</div>}>
        <ViewReview {...{ addReview, setAddReview, submit }} />
      </Suspense>
    </div>
  );
};

export default ReviewAdd;