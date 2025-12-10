"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import TeamViewList from "./TeamViewList";
import userProfile from "@/public/assets/icons/userprofile.webp";
import userProfileCover from "@/public/assets/icons/userprofilecover.webp";
import { userTeamServices } from "@/services/teamServices";
import { URL } from "@/url/axios";

export default function AddTeam({ mode = "create", user_id = null }) {
  const initialState = {
    image: null,
    sliderimg: null,
    name: "",
    position: "",
    experience: "",
    specialization: "",
    language: "",
    email: "",
    phone: "",
    department: "",
    aboutpara1: "",
    aboutpara2: "",
    aboutpara3: "",
    ordernumber: "",
  };

  const [createTeam, setCreateTeam] = useState(initialState);
  const [imageUrl, setImageUrl] = useState({
    image: null,
    sliderimg: null,
  });
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState("");

  const { postTeamList, putTeamList, getTeamListR } = userTeamServices();

  useEffect(() => {
    if (mode === "update" && user_id) {
      fetchTeamDetails(user_id);
    }
  }, [mode, user_id]);

  const fetchTeamDetails = async (id) => {
    try {
      const response = await getTeamListR(id);
      const teamData = response.data;
      setCreateTeam(teamData);
      setImageUrl({
        image: teamData.image ? URL + teamData.image : null,
        sliderimg: teamData.sliderimg ? URL + teamData.sliderimg : null,
      });
    } catch (err) {
      console.error("Failed to fetch team details:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateTeam((prev) => ({ ...prev, [name]: value || null }));
  };

  const handleFileInput = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setCreateTeam((prev) => ({ ...prev, [name]: file }));
    setImageUrl((prev) => ({
      ...prev,
      [name]: file ? window.URL.createObjectURL(file) : prev[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      for (const [key, value] of Object.entries(createTeam)) {
        if (value instanceof File || typeof value === "string") {
          formdata.append(key, value);
        } else {
          Swal.fire("Failed", "Please upload all images!", "error");
          return;
        }
      }

      let response;
      if (createTeam.id) {
        formdata.append("_id", createTeam.id);
        response = await putTeamList(createTeam.id, formdata);
      } else {
        response = await postTeamList(formdata);
      }

      if (response.success) {
        Swal.fire("Success", "Successfully added/updated", "success");
        handleReset();
        setMessage("Please refresh the page");
        setSubmit(!submit);
        if (createTeam.id) fetchTeamDetails(createTeam.id);
      } else {
        Swal.fire("Failed", "Failed to add/update project", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const handleReset = () => {
    setCreateTeam(initialState);
    setImageUrl({ image: null, sliderimg: null });
  };

  return (
    <div className="text-[#000]">
      <h1 className="text-[#000] font-semibold">Add Team</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex gap-3 ">
          <div>
            <label htmlFor="image">
              <Image
                src={
                  imageUrl.image
                    ? imageUrl.image
                    : createTeam.image
                    ? URL + createTeam.image
                    : userProfile
                }
                alt="user"
                width={230}
                height={330}
              />
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFileInput}
              hidden
            />
          </div>
          <div>
            <label htmlFor="sliderimg">
              <Image
                src={
                  imageUrl.sliderimg
                    ? imageUrl.sliderimg
                    : createTeam.sliderimg
                    ? URL + createTeam.sliderimg
                    : userProfileCover
                }
                alt="slider"
                width={230}
                height={330}
              />
            </label>
            <input
              type="file"
              name="sliderimg"
              id="sliderimg"
              onChange={handleFileInput}
              hidden
            />
          </div>
        </div>

        {/* Input Fields */}
        {[
          { label: "Order Number", name: "ordernumber" },
          { label: "Full Name", name: "name" },
          { label: "Position", name: "position" },
          { label: "Year of experience", name: "experience" },
          { label: "Specialization", name: "specialization" },
          { label: "Language", name: "language" },
          { label: "Email", name: "email" },
          { label: "Number", name: "phone" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label>{label}</label>
            <input
              type="text"
              name={name}
              value={createTeam[name] || ""}
              onChange={handleChange}
              placeholder={label}
              className="w-full border border-[#040406] p-[10px] rounded mb-[25px]"
            />
          </div>
        ))}

        <label>Department</label>
        <select
          name="department"
          value={createTeam.department || ""}
          onChange={handleChange}
          className="w-full border border-[#040406] p-[10px] rounded mb-[25px]"
        >
          <option value="">Select</option>
          <option value="management">Management</option>
          <option value="hr">HR Department</option>
          <option value="marketing">Marketing Department</option>
          <option value="Sales">Sales Department</option>
        </select>

        {["aboutpara1", "aboutpara2", "aboutpara3"].map((para, index) => (
          <div key={para}>
            <label>About paragraph {index + 1}</label>
            <textarea
              name={para}
              value={createTeam[para] || ""}
              onChange={handleChange}
              rows="5"
              className="w-full border border-[#040406] p-[10px] rounded mb-[25px]"
              placeholder={`Paragraph ${index + 1}`}
            />
          </div>
        ))}

        <div className="mb-3 flex gap-4 justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="bg-[#00A3FF] hover:bg-[#6A9F43] px-[2.5rem] py-[0.4rem] rounded-md text-white"
          >
            Clear
          </button>
          <button
            type="submit"
            className="bg-[#00A3FF] hover:bg-[#6A9F43] px-[2.5rem] py-[0.4rem] rounded-md text-white"
          >
            {createTeam.id ? "Update" : "Submit"}
          </button>
          {message && <p>{message}</p>}
        </div>
      </form>
      <Suspense fallback={<div>Loading...</div>}>
        <TeamViewList {...{ createTeam, setCreateTeam, submit }} />
      </Suspense>
    </div>
  );
}
