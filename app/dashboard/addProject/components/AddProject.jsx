"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import projectImage from "/public/assets/icons/image_demo.webp";
import logoIcon from "/public/assets/icons/addlogo.webp";
import cvrImage from "/public/assets/icons/coverimage.webp";
import { useProjectServices } from "@/services/projectServices";
import { userPartnerServices } from "@/services/partnerServices";
import { URL } from "@/url/axios";
import ViewList from "../../components/ViewList";

export default function AddProject({ mode , user_id}) {
  const [err, setErr] = useState(false);
  const [partnerList, setPartnerList] = useState([]);
  const [searchedDeveloperList, setSearchedDeveloperList] = useState([]);
  const [selectedDeveloperImage, setSelectedDeveloperImage] = useState("");
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState("");

  const { getPartnerR, getPartnerName } = userPartnerServices();
  const { postProjectList, putProjectList, getProjectList, deletProjectList } =
    useProjectServices();

  const initialState = {
    projectname: "",
    thumbnail: null,
    developer: "",
    type: "",
    type2: "",
    type3: "",
    type4: "",
    type5: "",
    type6: "",
    bedroom: "",
    handover: "",
    totalarea: "",
    coverimage: null,
    bannertitile: "",
    bannersubtitile: "",
    gallary1: null,
    gallary2: null,
    gallary3: null,
    mainhead: "",
    about: "",
    about1: "",
    about2: "",
    location: "",
    nearby1: "",
    dec1: "",
    nearby2: "",
    dec2: "",
    nearby3: "",
    dec3: "",
    nearby4: "",
    dec4: "",
    status: "",
    startingprice: "",
    locationname: "",
    pointhead: "",
    point1: "",
    point2: "",
    point3: "",
    point4: "",
    point5: "",
    point6: "",
    point7: "",
    point8: "",
    runingstatus: "",
    youtubeid: "",
    developerlogo: "",
    projectlogo: "",
    paymentplan: "",
    downpayment: "",
    projectkeyword: "",
    projectdescription: "",
    altprojectlogo: "",
    altthumbnail: "",
    altcoverimage: "",
    altgallary1: "",
    altgallary2: "",
    altgallary3: "",
  };


  const [createProject, setCreateProject] = useState(initialState);
  const [imageUrls, setImageUrls] = useState({
    thumbnail: null,
    coverimage: null,
    gallary1: null,
    gallary2: null,
    gallary3: null,
    developerlogo: null,
    projectlogo: null,
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === "developer") {
      if (value === "") {
        setCreateProject((prev) => ({
          ...prev,
          [name]: null,
          developerlogo: "",
        }));
        setSelectedDeveloperImage("");
      } else {
        try {
          const response = await getPartnerName(value);
          if (response.success) {
            setCreateProject((prev) => ({
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
    } else {
      setCreateProject((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileInput = (e) => {
    const field = e.target.name;
    const file = e.target.files[0];

    setCreateProject((prev) => ({ ...prev, [field]: file }));
    setImageUrls((prev) => ({
      ...prev,
      [field]: file ? window.URL.createObjectURL(file) : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      for (const [key, value] of Object.entries(createProject)) {
        if (value instanceof File || typeof value === "string") {
          formdata.append(key, value);
        }
      }

      let response;
      if (createProject.id) {
        formdata.append("_id", createProject.id);
        response = await putProjectList(createProject.id, formdata);
      } else {
        response = await postProjectList(formdata);
      }

      if (response.success) {
        Swal.fire("Success", "Successfully added/updated", "success");
        handleReset();
        setMessage("Please refresh the page");
        setSubmit(!submit);
      } else {
        Swal.fire("Failed", "Failed to add/update project", "error");
      }
    } catch (err) {
      Swal.fire("Failed", "Failed to add/update project", "error");
    }
  };

  const handleReset = () => {
    setCreateProject(initialState);
    setImageUrls({
      thumbnail: null,
      coverimage: null,
      gallary1: null,
      gallary2: null,
      gallary3: null,
      developerlogo: null,
      projectlogo: null,
    });
  };

  useEffect(() => {
    if (mode === "update" && user_id) {
      fetchProjectDetails(user_id);
    }
    setSearchedDeveloperList(partnerList);
  }, [mode, user_id, partnerList]);

  useEffect(() => {
    getData();
  }, [submit]);

  const getData = async () => {
    try {
      const response = await getPartnerR();
      if (response.success) {
        setPartnerList(response.data);
      }
    } catch (err) {
      console.error("Error loading partners:", err);
    }
  };

  const fetchProjectDetails = async (id) => {
    try {
      const response = await getProjectList(id);
      setCreateProject(response.data);
      setImageUrls({
        thumbnail: response.data.imageUrl?.thumbnail || null,
        coverimage: response.data.imageUrl?.coverimage || null,
        gallary1: response.data.imageUrl?.gallary1 || null,
        gallary2: response.data.imageUrl?.gallary2 || null,
        gallary3: response.data.imageUrl?.gallary3 || null,
        developerlogo: response.data.imageUrl?.developerlogo || null,
        projectlogo: response.data.imageUrl?.projectlogo || null,
      });
    } catch (err) {
      console.error("Failed to fetch project details:", err);
    }
  };

  return (
    <div className="text-[#000]">
      <div>
        <h1 className="text-[#000] font-semibold">Add Project</h1>
      </div>
      <form
        action="/task/add-task"
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="w-fit mb-3 grid grid-cols-2 gap-2">
          <div>
            <label>Thumbnail *</label>
            <label htmlFor="thumbnail" className="cursor-pointer">
              <Image
                width={380}
                height={266}
                src={
                  imageUrls.thumbnail ||
                  (createProject.thumbnail
                    ? URL + createProject.thumbnail
                    : projectImage)
                }
                alt="user-icon"
              />
            </label>
            <input
              type="file"
              placeholder="choose an thumbnail to upload"
              className=""
              name="thumbnail"
              onChange={handleFileInput}
              id="thumbnail"
            />
            <div className="mt-2">
              <label>Thumbnail alt Name</label>
              <input
                placeholder="Thumbnail alt Name"
                onChange={handleChange}
                name="altthumbnail"
                value={createProject.altthumbnail || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>
          </div>
          <div>
            <label>Project Logo *</label>
            <label htmlFor="projectlogo" className="cursor-pointer">
              <Image
                width={200}
                height={70}
                className=" bg-[#868686]"
                src={
                  imageUrls.projectlogo ||
                  (createProject.projectlogo
                    ? URL + createProject.projectlogo
                    : logoIcon)
                }
                alt="user-icon"
              />
            </label>
            <input
              type="file"
              placeholder="choose an project logo to upload"
              className=""
              name="projectlogo"
              onChange={handleFileInput}
              id="projectlogo"
            />
            <div className="mt-2">
              <label>Logo alt Name</label>
              <input
                placeholder="Logo alt Name"
                onChange={handleChange}
                name="altprojectlogo"
                value={createProject.altprojectlogo || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>
          </div>
        </div>
        <label>Project Runing Status</label>
        <select
          placeholder="Type "
          onChange={handleChange}
          name="runingstatus"
          value={createProject.runingstatus || ""}
          type="text"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        >
          <option value={" "}></option>
          <option value={"newlaunch"}>New Launch</option>
          <option value={"soldout"}>Sold Out</option>
        </select>
        <label>Status *</label>
        <select
          placeholder="Status"
          onChange={handleChange}
          name="status"
          required
          value={createProject.status || ""}
          type="select"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        >
          <option value={""}></option>
          <option value={"buy"}>Buy</option>
          <option value={"off-plan"}>Off-Plan</option>
          {/* <option value={"sell"}>Sell</option> */}
          <option value={"rent"}>Rent</option>
        </select>

        <label>Project Name *</label>
        <input
          placeholder="Project Name"
          onChange={handleChange}
          name="projectname"
          value={createProject.projectname || ""}
          type="text"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
        <label>Developer *</label>
        {selectedDeveloperImage ? (
          <div className="developer-image">
            <Image
              width={200}
              height={70}
              className="bg-[#000]"
              src={URL + encodeURIComponent(selectedDeveloperImage)}
              alt="Selected Developer"
            />
          </div>
        ) : createProject?.developerlogo ? (
          <Image
            className="bg-[#000]"
            width={200}
            height={70}
            src={URL + createProject.developerlogo}
            alt="Developer"
          />
        ) : (
          <p>No developer image available</p> // Optional: Show a fallback message or image
        )}
        <select
          placeholder="Developer"
          onChange={handleChange}
          name="developer"
          value={createProject.developer || ""}
          type="text"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        >
          <option value={""}></option>
          {searchedDeveloperList.length > 0 ? (
            searchedDeveloperList.map((data, i) => (
              <option key={i} value={data.partnername || ""}>
                {data.partnername.replace(/-/g, " ") || "No name available"}
              </option>
            ))
          ) : (
            <option value="">No developer list added</option>
          )}
        </select>

        <label>Type</label>
        <div className="grid grid-cols-6 gap-2">
          <select
            placeholder="Type "
            onChange={handleChange}
            name="type"
            value={createProject.type || ""}
            type="text"
            className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
          >
            <option value={""}></option>
            <option value={"apartment"}>Apartment</option>
            <option value={"studio"}>Studio</option>
            <option value={"villa"}>Villa</option>
            <option value={"townhouse"}>Townhouse</option>
            <option value={"penthouse"}>Penthouse</option>
            <option value={"duplex"}>Duplex</option>
            <option value={"PresidentialSuite"}>Presidential Suite</option>
            <option value={"Retail-Space"}>Retail Space</option>
            <option value={"Commercial-Space"}>Commercial Space</option>
            <option value={"Suite"}>Suite</option>
            <option value={"SkyVilla"}>Sky Villa</option>
            <option value={"Plot"}>Plot</option>
          </select>

          <select
            placeholder="Type "
            onChange={handleChange}
            name="type2"
            value={createProject.type2 || ""}
            type="text"
            className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
          >
            <option value={""}></option>
            <option value={"apartment"}>Apartment</option>
            <option value={"studio"}>Studio</option>
            <option value={"villa"}>Villa</option>
            <option value={"townhouse"}>Townhouse</option>
            <option value={"penthouse"}>Penthouse</option>
            <option value={"duplex"}>Duplex</option>
            <option value={"Presidential-Suite"}>Presidential Suite</option>
            <option value={"Retail-Space"}>Retail Space</option>
            <option value={"Commercial-Space"}>Commercial Space</option>
            <option value={"Suite"}>Suite</option>
            <option value={"SkyVilla"}>Sky Villa</option>
            <option value={"Plot"}>Plot</option>
          </select>

          <select
            placeholder="Type "
            onChange={handleChange}
            name="type3"
            value={createProject.type3 || ""}
            type="text"
            className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
          >
            <option value={""}></option>
            <option value={"apartment"}>Apartment</option>
            <option value={"studio"}>Studio</option>
            <option value={"villa"}>Villa</option>
            <option value={"townhouse"}>Townhouse</option>
            <option value={"penthouse"}>Penthouse</option>
            <option value={"duplex"}>Duplex</option>
            <option value={"PresidentialSuite"}>Presidential Suite</option>
            <option value={"Retail-Space"}>Retail Space</option>
            <option value={"Commercial-Space"}>Commercial Space</option>
            <option value={"Suite"}>Suite</option>
            <option value={"SkyVilla"}>Sky Villa</option>
            <option value={"Plot"}>Plot</option>
          </select>

          <select
            placeholder="Type "
            onChange={handleChange}
            name="type4"
            value={createProject.type4 || ""}
            type="text"
            className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
          >
            <option value={""}></option>
            <option value={"apartment"}>Apartment</option>
            <option value={"studio"}>Studio</option>
            <option value={"villa"}>Villa</option>
            <option value={"townhouse"}>Townhouse</option>
            <option value={"penthouse"}>Penthouse</option>
            <option value={"duplex"}>Duplex</option>
            <option value={"PresidentialSuite"}>Presidential Suite</option>
            <option value={"Retail-Space"}>Retail Space</option>
            <option value={"Commercial-Space"}>Commercial Space</option>
            <option value={"Suite"}>Suite</option>
            <option value={"SkyVilla"}>Sky Villa</option>
            <option value={"Plot"}>Plot</option>
          </select>

          <select
            placeholder="Type "
            onChange={handleChange}
            name="type5"
            value={createProject.type5 || ""}
            type="text"
            className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
          >
            <option value={""}></option>
            <option value={"apartment"}>Apartment</option>
            <option value={"studio"}>Studio</option>
            <option value={"villa"}>Villa</option>
            <option value={"townhouse"}>Townhouse</option>
            <option value={"penthouse"}>Penthouse</option>
            <option value={"duplex"}>Duplex</option>
            <option value={"PresidentialSuite"}>Presidential Suite</option>
            <option value={"Retail-Space"}>Retail Space</option>
            <option value={"Commercial-Space"}>Commercial Space</option>
            <option value={"Suite"}>Suite</option>
            <option value={"SkyVilla"}>Sky Villa</option>
            <option value={"Plot"}>Plot</option>
          </select>

          <select
            placeholder="Type "
            onChange={handleChange}
            name="type6"
            value={createProject.type6 || ""}
            type="text"
            className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
          >
            <option value={""}></option>
            <option value={"apartment"}>Apartment</option>
            <option value={"studio"}>Studio</option>
            <option value={"villa"}>Villa</option>
            <option value={"townhouse"}>Townhouse</option>
            <option value={"penthouse"}>Penthouse</option>
            <option value={"duplex"}>Duplex</option>
            <option value={"PresidentialSuite"}>Presidential Suite</option>
            <option value={"Retail-Space"}>Retail Space</option>
            <option value={"Commercial-Space"}>Commercial Space</option>
            <option value={"Suite"}>Suite</option>
            <option value={"SkyVilla"}>Sky Villa</option>
            <option value={"Plot"}>Plot</option>
          </select>
        </div>
        <label>Bedroom</label>
        <input
          placeholder="1 - 4 BR"
          onChange={handleChange}
          name="bedroom"
          value={createProject.bedroom || ""}
          type="text"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
        <label>Handover date</label>
        <input
          placeholder="eg: Dec - 2027"
          onChange={handleChange}
          name="handover"
          value={createProject.handover || ""}
          type="text"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
        <label>Total Area</label>
        <input
          placeholder="eg: 2,319 to 3,324 Sq Ft"
          onChange={handleChange}
          name="totalarea"
          value={createProject.totalarea || ""}
          type="text"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
        <label>Starting Price *</label>
        <input
          placeholder="eg: AED 1.2M"
          onChange={handleChange}
          name="startingprice"
          value={createProject.startingprice || ""}
          type="text"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />

        <label>Down Payment</label>
        <input
          placeholder="eg: 20%"
          onChange={handleChange}
          name="downpayment"
          value={createProject.downpayment || ""}
          type="text"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />

        <label>Payment Plan</label>
        <input
          placeholder="eg: 80/20"
          onChange={handleChange}
          name="paymentplan"
          value={createProject.paymentplan || ""}
          type="text"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />

        <div className="flex gap-3 mb-4">
          <div className="w-fit mb-3">
            <label>Cover Image *</label>
            <label htmlFor="coverImage" className="cursor-pointer">
              <Image
                width={700}
                height={266}
                src={
                  imageUrls?.coverimage ||
                  (createProject.coverimage
                    ? URL + createProject.coverimage
                    : cvrImage)
                }
                alt="cover image"
              />
            </label>
            <input
              type="file"
              className=""
              onChange={handleFileInput}
              id="coverImage"
              name="coverimage"
            />
            <div className="mt-2">
              <label>Cover image alt Name</label>
              <input
                placeholder="Cover image alt Name"
                onChange={handleChange}
                name="altcoverimage"
                value={createProject.altcoverimage || ""}
                type="text"
                className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
              />
            </div>
          </div>
        </div>

        <label>Banner title *</label>
        <input
          placeholder="Project name by developer name eg: Sun city By Damac Property"
          type="text"
          name="bannertitile"
          onChange={handleChange}
          value={createProject.bannertitile || ""}
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />

        <label>Banner sub title *</label>
        <input
          placeholder="property detailes eg: 1-3 Bedroom Apartment"
          type="text"
          name="bannersubtitile"
          onChange={handleChange}
          value={createProject.bannersubtitile || ""}
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
        <div className="flex gap-2">
          <div className="flex gap-3 mb-4">
            <div className="w-fit mb-3">
              <label>Gallary Image 1 *</label>
              <label htmlFor="Gallary" className="cursor-pointer">
                <div className="relative">
                  <Image
                    width={380}
                    height={266}
                    className=""
                    src={
                      imageUrls.gallary1 ||
                      (createProject.gallary1
                        ? URL + createProject.gallary1
                        : projectImage)
                    }
                    style={{
                      objectFit: "cover",
                      display: "block",
                    }}
                    alt="gallary image"
                  />
                </div>
              </label>
              <input
                type="file"
                className=""
                onChange={handleFileInput}
                id="gallaryImage1"
                name="gallary1"
              />
              <div className="mt-2">
                <label>Gallary Image 1 alt Name</label>
                <input
                  placeholder="Gallary Image 1 alt Name"
                  onChange={handleChange}
                  name="altgallary1"
                  value={createProject.altgallary1 || ""}
                  type="text"
                  className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mb-4">
            <div className="w-fit mb-3">
              <label>Gallary Image 2 *</label>
              <label htmlFor="gallary" className="cursor-pointer">
                <div className="relative">
                  <Image
                    width={380}
                    height={266}
                    className=""
                    src={
                      imageUrls.gallary2 ||
                      (createProject.gallary2
                        ? URL + createProject.gallary2
                        : projectImage)
                    }
                    style={{
                      objectFit: "cover",
                      display: "block",
                    }}
                    alt="gallary image"
                  />
                </div>
              </label>
              <input
                type="file"
                className=""
                onChange={handleFileInput}
                id="gallaryImage2"
                name="gallary2"
              />
              <div className="mt-2">
                <label>Gallary Image 2 alt Name</label>
                <input
                  placeholder="Gallary Image 2 alt Name"
                  onChange={handleChange}
                  name="altgallary2"
                  value={createProject.altgallary2 || ""}
                  type="text"
                  className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mb-4">
            <div className="w-fit mb-3">
              <label>Gallary Image 3 *</label>
              <label htmlFor="gallary" className="cursor-pointer">
                <div className="relative">
                  <Image
                    width={380}
                    height={266}
                    className=""
                    src={
                      imageUrls.gallary3 ||
                      (createProject.gallary3
                        ? URL + createProject.gallary3
                        : projectImage)
                    }
                    style={{
                      objectFit: "cover",
                      display: "block",
                    }}
                    alt="gallary image"
                  />
                </div>
              </label>
              <input
                type="file"
                className=""
                onChange={handleFileInput}
                id="gallaryImage3"
                name="gallary3"
              />
              <div className="mt-2">
                <label>Gallary Image 3 alt Name</label>
                <input
                  placeholder="Gallary Image 3 alt Name"
                  onChange={handleChange}
                  name="altgallary3"
                  value={createProject.altgallary3 || ""}
                  type="text"
                  className=" border border-[#040406] p-[10px] rounded mb-[25px]"
                />
              </div>
            </div>
          </div>
        </div>
        <label>YouTube Link ID</label>
        <input
          placeholder="eg:S1Q2HR8H-EM"
          type="text"
          name="youtubeid"
          onChange={handleChange}
          value={createProject.youtubeid || ""}
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />

        <label>Main head</label>
        <input
          placeholder="eg: Elevate your Lifestyle at {property location name}"
          type="text"
          name="mainhead"
          onChange={handleChange}
          value={createProject.mainhead || ""}
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />

        <label>About Paragraph 1</label>
        <textarea
          placeholder="About Paragraph 1"
          type="text"
          name="about"
          onChange={handleChange}
          value={createProject.about || ""}
          cols="30"
          rows="5"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />

        <label>About Paragraph 2</label>
        <textarea
          placeholder="About Paragraph 2"
          type="text"
          name="about1"
          onChange={handleChange}
          value={createProject.about1 || ""}
          cols="30"
          rows="5"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />

        <label>About Paragraph 3</label>
        <textarea
          placeholder="About Paragraph 3"
          type="text"
          name="about2"
          onChange={handleChange}
          value={createProject.about2 || ""}
          cols="30"
          rows="5"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
        <label>Location Name *</label>
        <input
          placeholder="eg: Business Bay, Dubai"
          onChange={handleChange}
          name="locationname"
          value={createProject.locationname || ""}
          type="text"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />

        <label>Location Map Link</label>
        <input
          placeholder="Google map embed a map src= link "
          type="text"
          name="location"
          onChange={handleChange}
          value={createProject.location || ""}
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label>Nearby option1</label>
            <input
              placeholder="eg: School"
              type="text"
              name="nearby1"
              onChange={handleChange}
              value={createProject.nearby1 || ""}
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
          </div>
          <div className="col-span-2">
            <label>Nearby option1 Description</label>
            <input
              placeholder="eg: 10 Minutes"
              type="text"
              name="dec1"
              onChange={handleChange}
              value={createProject.dec1 || ""}
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label>Nearby option2</label>
            <input
              placeholder="eg: School"
              type="text"
              name="nearby2"
              onChange={handleChange}
              value={createProject.nearby2 || ""}
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
          </div>
          <div className="col-span-2">
            <label>Nearby option2 Description</label>
            <input
              placeholder="eg: 10 Minutes"
              type="text"
              name="dec2"
              onChange={handleChange}
              value={createProject.dec2 || ""}
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label>Nearby option3</label>
            <input
              placeholder="eg: School"
              type="text"
              name="nearby3"
              onChange={handleChange}
              value={createProject.nearby3 || ""}
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
          </div>
          <div className="col-span-2">
            <label>Nearby option3 Description</label>
            <input
              placeholder="eg: 10 Minutes"
              type="text"
              name="dec3"
              onChange={handleChange}
              value={createProject.dec3 || ""}
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label>Nearby option4</label>
            <input
              placeholder="eg: School"
              type="text"
              name="nearby4"
              onChange={handleChange}
              value={createProject.nearby4 || ""}
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
          </div>
          <div className="col-span-2">
            <label>Nearby option4 Description</label>
            <input
              placeholder="eg: 10 Minutes"
              type="text"
              name="dec4"
              onChange={handleChange}
              value={createProject.dec4 || ""}
              className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
            />
          </div>
        </div>

        <label>Section Head Name</label>
        <input
          placeholder="Key Highlights"
          type="text"
          name="pointhead"
          onChange={handleChange}
          value={createProject.pointhead || ""}
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
        <input
          placeholder="point 1"
          type="text"
          name="point1"
          onChange={handleChange}
          value={createProject.point1 || ""}
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />

        <input
          placeholder="Points 2"
          type="text"
          name="point2"
          onChange={handleChange}
          value={createProject.point2 || ""}
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
        <input
          placeholder="Points 2"
          type="text"
          name="point3"
          onChange={handleChange}
          value={createProject.point3 || ""}
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
        <input
          placeholder="Points 4"
          type="text"
          name="point4"
          onChange={handleChange}
          value={createProject.point4 || ""}
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
        <input
          placeholder="Point 5"
          type="text"
          name="point5"
          onChange={handleChange}
          value={createProject.point5 || ""}
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
        <input
          placeholder="Point 6"
          type="text"
          name="point6"
          onChange={handleChange}
          value={createProject.point6 || ""}
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
        <input
          placeholder="Point 7"
          type="text"
          name="point7"
          onChange={handleChange}
          value={createProject.point7 || ""}
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
        <input
          placeholder="point 8"
          type="text"
          name="point8"
          onChange={handleChange}
          value={createProject.point8 || ""}
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
        <label className="font-bold underline">SEO</label>
        <div>
          <label>Keywords</label>
          <input
            placeholder="Keywords eg: Damac, riverside, ..."
            type="text"
            name="projectkeyword"
            onChange={handleChange}
            value={createProject.projectkeyword || ""}
            className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
          />
        </div>

        <label>Description</label>
        <textarea
          placeholder="Project Description"
          type="text"
          name="projectdescription"
          onChange={handleChange}
          value={createProject.projectdescription || ""}
          cols="30"
          rows="5"
          className="w-full  border border-[#040406] p-[10px] rounded mb-[25px]"
        />
      </form>
      {err && <span>{err}</span>}

      <div className="mb-3 flex gap-4 justify-end">
        <button
          onClick={handleReset}
          className=" bg-[#00A3FF] hover:bg-[#6A9F43] px-[2.5rem] py-[0.4rem] rounded-md text-[#ffffff]"
        >
          Clear
        </button>
        <button
          onClick={handleSubmit}
          className=" bg-[#00A3FF] hover:bg-[#6A9F43] px-[2.5rem] py-[0.4rem] rounded-md text-[#ffffff]"
        >
          {createProject.id ? "Update" : "Submit"}
        </button>
        {message && <p>{message}</p>}
      </div>
      <div className="mb-4">
        <Suspense fallback={<div>Loading...</div>}>
          <ViewList {...{ createProject, setCreateProject, submit }} />
          </Suspense>
      </div>
    </div>
  );
}
