"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import newsImage from "@/public/assets/icons/image_demo.webp";
import { URL } from "@/url/axios";
import { userNewsServices } from "@/services/newsServices";
import Swal from "sweetalert2";
import ViewNewsList from "./ViewNewsList";

const AddNews = ({mode, user_id}) => {
  const [err, setErr] = useState(false);
  const initialState = {
    newstitle: "",
    newsthumbnail: null,
    published: "",
    newspara1: "",
    newspara2: "",
    newspara3: "",
    newskeyword: "",
    newsdescription: "",
    newsurl: "",
    type: "",
    alt: "",
  };

  const [createNews, setCreateNews] = useState(initialState);
  const [imageUrls, setImageUrls] = useState({ newsthumbnail: null });
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState("");
  const [urlError, setUrlError] = useState("");
  const [formErrors, setFormErrors] = useState({
    newstitle: "",
    newsthumbnail: "",
    published: "",
    newspara1: "",
    newspara2: "",
    newspara3: "",
    newsurl: "",
    type: "",
  });

  const { postNews, getNewsR, putNews } = userNewsServices();

  useEffect(() => {
    if (mode === "update" && user_id) {
      fetchProjectDetails(user_id);
    }
  }, [mode, user_id]);

  const fetchProjectDetails = async (id) => {
    try {
      const response = await getNewsR(id);
      setCreateNews(response.data);
      setImageUrls({
        newsthumbnail: response.data.imageUrl?.newsthumbnail || null,
      });
    } catch (err) {
      console.error("Failed to fetch News details:", err);
    }
  };

  const handleFileInput = (e) => {
    const field = e.target.name;
    const file = e.target.files[0];
    setCreateNews((prev) => ({ ...prev, [field]: file }));
    setImageUrls((prev) => ({
      ...prev,
      [field]: file ? window.URL.createObjectURL(file) : null,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateNews((prev) => ({
      ...prev,
      [name]: value === "" ? null : value,
    }));
  };

  const validateForm = () => {
    const { newstitle, newsthumbnail, published, newsurl, type } = createNews;
    const forbiddenSymbols = /[^a-zA-Z0-9\- ]/;
    const errors = { ...formErrors };

    errors.newstitle = newstitle ? "" : "Title is required.";
    errors.newsthumbnail = newsthumbnail ? "" : "Thumbnail is required.";
    errors.published = published ? "" : "Publish date is required.";

    if (!newsurl) {
      errors.newsurl = "URL is required.";
    } else if (forbiddenSymbols.test(newsurl)) {
      errors.newsurl = "The URL contains invalid characters.";
    } else {
      errors.newsurl = "";
    }

    errors.type = type ? "" : "Type is required.";
    setFormErrors(errors);

    // Return true if all errors are empty
    return Object.values(errors).every((err) => !err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      Object.entries(createNews).forEach(([key, value]) => {
        if (value instanceof File || typeof value === "string") {
          formData.append(key, value);
        }
      });

      let response;
      if (createNews.id) {
        formData.append("_id", createNews.id);
        response = await putNews(createNews.id, formData);
      } else {
        response = await postNews(formData);
      }

      if (response.success) {
        Swal.fire("Success", "Successfully added/updated", "success");
        handleReset();
        setMessage("Please refresh the page");
        setSubmit(!submit);
        fetchProjectDetails();
      } else {
        Swal.fire("Failed", "Failed to add/update news", "error");
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "An error occurred.";
      setError(errorMsg);
      Swal.fire("Error", errorMsg, "error");
    }
  };

  const handleReset = () => {
    setCreateNews(initialState);
    setImageUrls({ newsthumbnail: null });
  };

  return (
    <div className="text-[#000]">
      <h1 className="text-[#000] font-semibold">Add News</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Thumbnail */}
        <div>
          <label>News thumbnail *</label>
          <label htmlFor="newsthumbnail" className="cursor-pointer block">
            <Image
              width={380}
              height={266}
              className=" object-cover"
              src={
                imageUrls.newsthumbnail ||
                (createNews.newsthumbnail
                  ? `${URL}${createNews.newsthumbnail}`
                  : newsImage.src)
              }
              alt="news-thumbnail"
            />
          </label>
          <input
            type="file"
            name="newsthumbnail"
            id="newsthumbnail"
            onChange={handleFileInput}
            className="w-full  border border-[#040406] p-[10px] rounded mb-[25px] mt-2"
          />
          {formErrors.newsthumbnail && (
            <span className="text-red-600 text-sm">
              {formErrors.newsthumbnail}
            </span>
          )}
        </div>

        {/* Title */}
        <div className="mb-6">
          <label>News headline *</label>
          <input
            type="text"
            name="newstitle"
            value={createNews.newstitle || ""}
            onChange={handleChange}
            className="w-full  border border-[#040406] p-[10px] rounded"
            placeholder="News headline"
          />
          {formErrors.newstitle && (
            <span className="text-red-600 text-sm">{formErrors.newstitle}</span>
          )}
        </div>

        {/* Type */}
        <div className="mb-6">
          <label>News Type *</label>
          <select
            name="type"
            value={createNews.type || ""}
            onChange={handleChange}
            className="w-full  border border-[#040406] p-[10px] rounded"
          >
            <option value="">Select</option>
            <option value="Market Insights">Market Insights</option>
            <option value="General">General</option>
            <option value="News">News</option>
            <option value="Off-Plan">Off-Plan</option>
          </select>
          {formErrors.type && (
            <span className="text-red-600 text-sm">{formErrors.type}</span>
          )}
        </div>

        {/* Publish Date */}
        <div className="mb-6">
          <label>Publish Date *</label>
          <input
            type="text"
            name="published"
            value={createNews.published || ""}
            onChange={handleChange}
            className="w-full  border border-[#040406] p-[10px] rounded"
            placeholder="e.g. Sun 05 Jan 2025"
          />
          {formErrors.published && (
            <span className="text-red-600 text-sm">{formErrors.published}</span>
          )}
        </div>

        {/* Paragraphs */}
        {[1, 2, 3].map((num) => (
          <div className="mb-6" key={`para${num}`}>
            <label>Paragraph {num}</label>
            <textarea
              name={`newspara${num}`}
              value={createNews[`newspara${num}`] || ""}
              onChange={handleChange}
              rows={4}
              className="w-full  border border-[#040406] p-[10px] rounded"
              placeholder={`Paragraph ${num}`}
            />
          </div>
        ))}

        {/* SEO Fields */}
        <div className="mb-6">
          <label>Canonical URL</label>
          <input
            type="text"
            name="newsurl"
            value={createNews.newsurl || ""}
            onChange={handleChange}
            className="w-full  border border-[#040406] p-[10px] rounded"
            placeholder="Unique SEO URL (avoid symbols)"
          />
          {formErrors.newsurl && (
            <span className="text-red-600 text-sm">{formErrors.newsurl}</span>
          )}
        </div>

        <div className="mb-6">
          <label>Keywords</label>
          <input
            type="text"
            name="newskeyword"
            value={createNews.newskeyword || ""}
            onChange={handleChange}
            className="w-full  border border-[#040406] p-[10px] rounded"
            placeholder="e.g., Damac, riverside"
          />
        </div>

        <div className="mb-6">
          <label>Description</label>
          <textarea
            name="newsdescription"
            value={createNews.newsdescription || ""}
            onChange={handleChange}
            rows={3}
            className="w-full border border-[#040406] p-[10px] rounded"
            placeholder="SEO Description"
          />
        </div>

        <div className="mb-6">
          <label>Alt Image</label>
          <input
            type="text"
            name="alt"
            value={createNews.alt || ""}
            onChange={handleChange}
            className="w-full  border border-[#040406] p-[10px] rounded"
            placeholder="Image alt text"
          />
        </div>

        {err && <span className="text-red-600">{err}</span>}

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="bg-blue-500 hover:bg-green-600 px-6 py-2 text-white rounded"
          >
            Clear
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-green-600 px-6 py-2 text-white rounded"
          >
            {createNews.id ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}

      <div className="my-6">
        <Suspense fallback={<div>Loading...</div>}>
          <ViewNewsList
            createNews={createNews}
            setCreateNews={setCreateNews}
            submit={submit}
            />
        </Suspense>
      </div>
    </div>
  );
};

export default AddNews;
