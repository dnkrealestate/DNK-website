"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdDelete } from "react-icons/md";
import projectImage from "/public/assets/icons/image_demo.webp";
import logoIcon from "/public/assets/icons/addlogo.webp";
import cvrImage from "/public/assets/icons/coverimage.webp";
import { useProjectServices } from "@/services/projectServices";
import { userPartnerServices } from "@/services/partnerServices";
import { URL } from "@/url/axios";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function SectionHeading({ title, description }) {
  return (
    <div className="mb-4 mt-8 border-b border-[#E5E8EE] pb-2 first:mt-0">
      <h2 className="text-base font-semibold text-[#1A2233]">{title}</h2>
      {description && (
        <p className="text-xs text-[#8791A1]">{description}</p>
      )}
    </div>
  );
}

export default function AddProject({ mode = "create", user_id = null }) {
  const router = useRouter();
  const [err, setErr] = useState(false);
  const [partnerList, setPartnerList] = useState([]);
  const [searchedDeveloperList, setSearchedDeveloperList] = useState([]);
  const [selectedDeveloperImage, setSelectedDeveloperImage] = useState("");
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { getPartnerR, getPartnerName } = userPartnerServices();
  const { postProjectList, putProjectList, getProjectByIdR, deleteProjectList } =
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
    mobilecoverimage: null,
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
    isDraft: false,
  };


  const [createProject, setCreateProject] = useState(initialState);
  const [imageUrls, setImageUrls] = useState({
    thumbnail: null,
    coverimage: null,
    mobilecoverimage: null,
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
    setSaving(true);
    try {
      const formdata = new FormData();
      for (const [key, value] of Object.entries(createProject)) {
        // _id/id are handled separately below for updates — appending them
        // here too would duplicate the field and break the backend's $set.
        if (key === "_id" || key === "id") continue;
        if (value instanceof File || typeof value === "string") {
          formdata.append(key, value);
        }
      }
      formdata.append("isDraft", createProject.isDraft ? "true" : "false");

      let response;
      const isUpdate = Boolean(createProject.id);
      if (isUpdate) {
        formdata.append("_id", createProject.id);
        response = await putProjectList(createProject.id, formdata);
      } else {
        response = await postProjectList(formdata);
      }

      if (response.success) {
        Swal.fire("Success", isUpdate ? "Project updated." : "Project created.", "success");
        if (isUpdate) {
          fetchProjectDetails(createProject.id);
        } else {
          handleReset();
          router.push("/dashboard/addProject");
        }
      } else {
        Swal.fire("Failed", response.message || "Failed to add/update project", "error");
      }
    } catch (err) {
      console.error("❌ Error submitting form:", err);

      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: errorMessage,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!createProject.id) return;
    const result = await Swal.fire({
      title: "Delete this project?",
      text: "This can't be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    });
    if (!result.isConfirmed) return;

    setDeleting(true);
    try {
      const response = await deleteProjectList(createProject.id);
      if (response.success) {
        Swal.fire("Deleted", "Project has been deleted.", "success");
        router.push("/dashboard/addProject");
      } else {
        Swal.fire("Failed", response.message || "Failed to delete project.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong while deleting.", "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleReset = () => {
    setCreateProject(initialState);
    setImageUrls({
      thumbnail: null,
      coverimage: null,
      mobilecoverimage: null,
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
      const response = await getProjectByIdR(id);
      if (!response.success) {
        Swal.fire("Failed", "Could not load project.", "error");
        return;
      }
      const project = response.data;
      // Existing image fields already resolve via `URL + createProject.<field>` in the
      // markup below, so imageUrls only needs to hold freshly-selected local blob previews.
      setCreateProject({ ...project, id: project._id });
      setImageUrls({
        thumbnail: null,
        coverimage: null,
        mobilecoverimage: null,
        gallary1: null,
        gallary2: null,
        gallary3: null,
        developerlogo: null,
        projectlogo: null,
      });
    } catch (err) {
      if (err?.response?.status === 404) {
        Swal.fire("Not found", "This project no longer exists.", "error");
        router.push("/dashboard/addProject");
      } else {
        console.error("Failed to fetch project details:", err);
        Swal.fire("Error", "Failed to load project details.", "error");
      }
    }
  };

  const isEditMode = Boolean(createProject.id);

  return (
    <div className="text-[#000]">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <button
            type="button"
            onClick={() => router.push("/dashboard/addProject")}
            className="mb-2 flex items-center gap-1.5 text-sm text-[#5B6472] hover:text-[#0F2C45]"
          >
            <MdArrowBack /> Back to all projects
          </button>
          <h1 className="text-xl font-semibold text-[#1A2233]">
            {isEditMode
              ? `Edit Project${createProject.projectname ? `: ${createProject.projectname}` : ""}`
              : "Add New Project"}
          </h1>
          <p className="mt-1 text-sm text-[#7A8494]">
            {isEditMode
              ? "Update this listing's details, media, and content."
              : "Fill in the details to publish a new listing."}
          </p>
        </div>
        {isEditMode && (
          <Button
            type="button"
            variant="danger"
            size="sm"
            loading={deleting}
            onClick={handleDelete}
          >
            <MdDelete /> Delete project
          </Button>
        )}
      </div>

      <form
        action="/task/add-task"
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <Card className="p-6">
        <SectionHeading
          title="Media & Branding"
          description="Thumbnail and project logo shown across listing cards."
        />
        <div className="w-fit mb-3 grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Thumbnail *</label>
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
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Thumbnail alt Name</label>
              <input
                placeholder="Thumbnail alt Name"
                onChange={handleChange}
                name="altthumbnail"
                value={createProject.altthumbnail || ""}
                type="text"
                className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Project Logo *</label>
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
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Logo alt Name</label>
              <input
                placeholder="Logo alt Name"
                onChange={handleChange}
                name="altprojectlogo"
                value={createProject.altprojectlogo || ""}
                type="text"
                className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
              />
            </div>
          </div>
        </div>
        </Card>

        <Card className="p-6">
        <SectionHeading
          title="Classification & Status"
          description="How this listing is categorized and its key facts."
        />
        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Project Runing Status</label>
        <select
          placeholder="Type "
          onChange={handleChange}
          name="runingstatus"
          value={createProject.runingstatus || ""}
          type="text"
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        >
          <option value={" "}></option>
          <option value={"newlaunch"}>New Launch</option>
          <option value={"soldout"}>Sold Out</option>
        </select>
        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Status *</label>
        <select
          placeholder="Status"
          onChange={handleChange}
          name="status"
          required
          value={createProject.status || ""}
          type="select"
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        >
          <option value={""}></option>
          <option value={"buy"}>Buy</option>
          <option value={"off-plan"}>Off-Plan</option>
          {/* <option value={"sell"}>Sell</option> */}
          <option value={"rent"}>Rent</option>
        </select>

        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Project Name *</label>
        <input
          placeholder="Project Name"
          onChange={handleChange}
          name="projectname"
          value={createProject.projectname || ""}
          type="text"
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Developer *</label>
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
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
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

        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Type</label>
        <div className="grid grid-cols-6 gap-2">
          <select
            placeholder="Type "
            onChange={handleChange}
            name="type"
            value={createProject.type || ""}
            type="text"
            className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
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
            className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
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
            className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
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
            className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
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
            className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
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
            className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
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
        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Bedroom</label>
        <input
          placeholder="1 - 4 BR"
          onChange={handleChange}
          name="bedroom"
          value={createProject.bedroom || ""}
          type="text"
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Handover date</label>
        <input
          placeholder="eg: Dec - 2027"
          onChange={handleChange}
          name="handover"
          value={createProject.handover || ""}
          type="text"
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Total Area</label>
        <input
          placeholder="eg: 2,319 to 3,324 Sq Ft"
          onChange={handleChange}
          name="totalarea"
          value={createProject.totalarea || ""}
          type="text"
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Starting Price *</label>
        <input
          placeholder="eg: AED 1.2M"
          onChange={handleChange}
          name="startingprice"
          value={createProject.startingprice || ""}
          type="text"
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />

        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Down Payment</label>
        <input
          placeholder="eg: 20%"
          onChange={handleChange}
          name="downpayment"
          value={createProject.downpayment || ""}
          type="text"
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />

        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Payment Plan</label>
        <input
          placeholder="eg: 80/20"
          onChange={handleChange}
          name="paymentplan"
          value={createProject.paymentplan || ""}
          type="text"
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        </Card>

        <Card className="p-6">
        <SectionHeading
          title="Banner & Gallery"
          description="Hero banner, mobile cover, and gallery images for the project page."
        />
        <div className="flex gap-3 mb-4">
          <div className="w-fit mb-3">
            <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Cover Image *</label>
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
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Cover image alt Name</label>
              <input
                placeholder="Cover image alt Name"
                onChange={handleChange}
                name="altcoverimage"
                value={createProject.altcoverimage || ""}
                type="text"
                className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="w-fit mb-3">
            <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Mobile Cover Image *</label>
            <label htmlFor="mobileCoverImage" className="cursor-pointer">
              <Image
                width={700}
                height={266}
                src={
                  imageUrls?.mobilecoverimage ||
                  (createProject.mobilecoverimage
                    ? URL + createProject.mobilecoverimage
                    : projectImage)
                }
                alt="mobile cover image"
              />
            </label>
            <input
              type="file"
              className=""
              onChange={handleFileInput}
              id="mobileCoverImage"
              name="mobilecoverimage"
            />
          </div>
        </div>

        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Banner title *</label>
        <input
          placeholder="Project name by developer name eg: Sun city By Damac Property"
          type="text"
          name="bannertitile"
          onChange={handleChange}
          value={createProject.bannertitile || ""}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />

        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Banner sub title *</label>
        <input
          placeholder="property detailes eg: 1-3 Bedroom Apartment"
          type="text"
          name="bannersubtitile"
          onChange={handleChange}
          value={createProject.bannersubtitile || ""}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        <div className="flex gap-2">
          <div className="flex gap-3 mb-4">
            <div className="w-fit mb-3">
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Gallary Image 1 *</label>
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
                <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Gallary Image 1 alt Name</label>
                <input
                  placeholder="Gallary Image 1 alt Name"
                  onChange={handleChange}
                  name="altgallary1"
                  value={createProject.altgallary1 || ""}
                  type="text"
                  className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mb-4">
            <div className="w-fit mb-3">
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Gallary Image 2 *</label>
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
                <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Gallary Image 2 alt Name</label>
                <input
                  placeholder="Gallary Image 2 alt Name"
                  onChange={handleChange}
                  name="altgallary2"
                  value={createProject.altgallary2 || ""}
                  type="text"
                  className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mb-4">
            <div className="w-fit mb-3">
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Gallary Image 3 *</label>
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
                <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Gallary Image 3 alt Name</label>
                <input
                  placeholder="Gallary Image 3 alt Name"
                  onChange={handleChange}
                  name="altgallary3"
                  value={createProject.altgallary3 || ""}
                  type="text"
                  className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
                />
              </div>
            </div>
          </div>
        </div>
        </Card>

        <Card className="p-6">
        <SectionHeading
          title="Content"
          description="Headline and about copy shown on the project page."
        />
        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">YouTube Link ID</label>
        <input
          placeholder="eg:S1Q2HR8H-EM"
          type="text"
          name="youtubeid"
          onChange={handleChange}
          value={createProject.youtubeid || ""}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />

        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Main head</label>
        <input
          placeholder="eg: Elevate your Lifestyle at {property location name}"
          type="text"
          name="mainhead"
          onChange={handleChange}
          value={createProject.mainhead || ""}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />

        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">About Paragraph 1</label>
        <textarea
          placeholder="About Paragraph 1"
          type="text"
          name="about"
          onChange={handleChange}
          value={createProject.about || ""}
          cols="30"
          rows="5"
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />

        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">About Paragraph 2</label>
        <textarea
          placeholder="About Paragraph 2"
          type="text"
          name="about1"
          onChange={handleChange}
          value={createProject.about1 || ""}
          cols="30"
          rows="5"
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />

        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">About Paragraph 3</label>
        <textarea
          placeholder="About Paragraph 3"
          type="text"
          name="about2"
          onChange={handleChange}
          value={createProject.about2 || ""}
          cols="30"
          rows="5"
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        </Card>

        <Card className="p-6">
        <SectionHeading
          title="Location & Nearby"
          description="Where the project is, and what's close by."
        />
        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Location Name *</label>
        <input
          placeholder="eg: Business Bay, Dubai"
          onChange={handleChange}
          name="locationname"
          value={createProject.locationname || ""}
          type="text"
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />

        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Location Map Link</label>
        <input
          placeholder="Google map embed a map src= link "
          type="text"
          name="location"
          onChange={handleChange}
          value={createProject.location || ""}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Nearby option1</label>
            <input
              placeholder="eg: School"
              type="text"
              name="nearby1"
              onChange={handleChange}
              value={createProject.nearby1 || ""}
              className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Nearby option1 Description</label>
            <input
              placeholder="eg: 10 Minutes"
              type="text"
              name="dec1"
              onChange={handleChange}
              value={createProject.dec1 || ""}
              className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Nearby option2</label>
            <input
              placeholder="eg: School"
              type="text"
              name="nearby2"
              onChange={handleChange}
              value={createProject.nearby2 || ""}
              className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Nearby option2 Description</label>
            <input
              placeholder="eg: 10 Minutes"
              type="text"
              name="dec2"
              onChange={handleChange}
              value={createProject.dec2 || ""}
              className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Nearby option3</label>
            <input
              placeholder="eg: School"
              type="text"
              name="nearby3"
              onChange={handleChange}
              value={createProject.nearby3 || ""}
              className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Nearby option3 Description</label>
            <input
              placeholder="eg: 10 Minutes"
              type="text"
              name="dec3"
              onChange={handleChange}
              value={createProject.dec3 || ""}
              className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Nearby option4</label>
            <input
              placeholder="eg: School"
              type="text"
              name="nearby4"
              onChange={handleChange}
              value={createProject.nearby4 || ""}
              className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Nearby option4 Description</label>
            <input
              placeholder="eg: 10 Minutes"
              type="text"
              name="dec4"
              onChange={handleChange}
              value={createProject.dec4 || ""}
              className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
            />
          </div>
        </div>
        </Card>

        <Card className="p-6">
        <SectionHeading
          title="Key Highlights"
          description="Short bullet points shown as project highlights."
        />
        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Section Head Name</label>
        <input
          placeholder="Key Highlights"
          type="text"
          name="pointhead"
          onChange={handleChange}
          value={createProject.pointhead || ""}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        <input
          placeholder="point 1"
          type="text"
          name="point1"
          onChange={handleChange}
          value={createProject.point1 || ""}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />

        <input
          placeholder="Points 2"
          type="text"
          name="point2"
          onChange={handleChange}
          value={createProject.point2 || ""}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        <input
          placeholder="Points 2"
          type="text"
          name="point3"
          onChange={handleChange}
          value={createProject.point3 || ""}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        <input
          placeholder="Points 4"
          type="text"
          name="point4"
          onChange={handleChange}
          value={createProject.point4 || ""}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        <input
          placeholder="Point 5"
          type="text"
          name="point5"
          onChange={handleChange}
          value={createProject.point5 || ""}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        <input
          placeholder="Point 6"
          type="text"
          name="point6"
          onChange={handleChange}
          value={createProject.point6 || ""}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        <input
          placeholder="Point 7"
          type="text"
          name="point7"
          onChange={handleChange}
          value={createProject.point7 || ""}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        <input
          placeholder="point 8"
          type="text"
          name="point8"
          onChange={handleChange}
          value={createProject.point8 || ""}
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        </Card>

        <Card className="p-6">
        <SectionHeading
          title="FAQs"
          description="Up to five frequently asked questions for this project."
        />
        <div className="">
          <label className="mb-1.5 block text-sm font-medium text-[#33394B]">FAQ Section Title</label>
              <input
                placeholder="Frequently Asked Questions"
                type="text"
                name="faqTitle"
                onChange={handleChange}
                value={createProject.faqTitle || ""}
                className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
              />
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Question1</label>
              <input
                placeholder="Question1"
                type="text"
                name="q1"
                onChange={handleChange}
                value={createProject.q1 || ""}
                className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
              />
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Answer1</label>
              <textarea
                placeholder="Answer1"
                type="text"
                name="a1"
                onChange={handleChange}
                value={createProject.a1 || ""}
                cols="30"
                rows="2"
                className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
              />
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Question2</label>
              <input
                placeholder="Question1"
                type="text"
                name="q2"
                onChange={handleChange}
                value={createProject.q2 || ""}
                className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
              />
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Answer2</label>
              <textarea
                placeholder="Answer2"
                type="text"
                name="a2"
                onChange={handleChange}
                value={createProject.a2 || ""}
                cols="30"
                rows="2"
                className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
              />
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Question3</label>
              <input
                placeholder="Question1"
                type="text"
                name="q3"
                onChange={handleChange}
                value={createProject.q3 || ""}
                className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
              />
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Answer3</label>
              <textarea
                placeholder="Answer3"
                type="text"
                name="a3"
                onChange={handleChange}
                value={createProject.a3 || ""}
                cols="30"
                rows="2"
                className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
              />
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Question4</label>
              <input
                placeholder="Question4"
                type="text"
                name="q4"
                onChange={handleChange}
                value={createProject.q4 || ""}
                className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
              />
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Answer4</label>
              <textarea
                placeholder="Answer4"
                type="text"
                name="a4"
                onChange={handleChange}
                value={createProject.a4 || ""}
                cols="30"
                rows="2"
                className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
              />
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Question5</label>
              <input
                placeholder="Question5"
                type="text"
                name="q5"
                onChange={handleChange}
                value={createProject.q5 || ""}
                className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
              />
              <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Answer5</label>
              <textarea
                placeholder="Answer5"
                type="text"
                name="a5"
                onChange={handleChange}
                value={createProject.a5 || ""}
                cols="30"
                rows="2"
                className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
              />
        </div>
        </Card>

        <Card className="p-6">
        <SectionHeading
          title="SEO & Description"
          description="Search keywords and the full project description."
        />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Keywords</label>
          <input
            placeholder="Keywords eg: Damac, riverside, ..."
            type="text"
            name="projectkeyword"
            onChange={handleChange}
            value={createProject.projectkeyword || ""}
            className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
          />
        </div>

        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">Description</label>
        <textarea
          placeholder="Project Description"
          type="text"
          name="projectdescription"
          onChange={handleChange}
          value={createProject.projectdescription || ""}
          cols="30"
          rows="5"
          className="w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10 mb-5"
        />
        </Card>

        {err && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {err}
          </div>
        )}

        <div className="sticky bottom-0 z-10 -mx-4 mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-[#E5E8EE] bg-[#F5F6F8]/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
          <label className="mr-auto flex items-center gap-2 text-sm font-medium text-[#33394B]">
            <input
              type="checkbox"
              name="isDraft"
              checked={Boolean(createProject.isDraft)}
              onChange={(e) =>
                setCreateProject((prev) => ({ ...prev, isDraft: e.target.checked }))
              }
              className="h-4 w-4 rounded border-[#D7DCE3]"
            />
            Save as draft (hidden from the live site)
          </label>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Clear
          </Button>
          <Button type="submit" loading={saving}>
            {createProject.isDraft
              ? "Save Draft"
              : isEditMode
              ? "Update & Publish"
              : "Publish Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
