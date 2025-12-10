"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import Select from "react-select";
import { userRoadshowServices } from "@/services/roadshowService";
import "react-phone-input-2/lib/style.css"; 
import { track } from "@vercel/analytics";

const FormRoadshow = () => {
  const params = useParams();
  const slug = params?.slug;

  const [RoadshowLink, setRoadshowLinkData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const [eventList, setEventList] = useState([]);
  const [searchedEventList, setSearchedEventList] = useState([]);

  const {
    postClientResgister,
    getRoadshow,
    getRoadshowLinkById,
    checkDuplicateClient,
    getSourceRM,
  } = userRoadshowServices();

  const initialState = {
    fullName: "",
    email: "",
    phone: "91",
    event: "",
    attendDate: "",
    attendTime: "",
    sourcedRm: "",
    budget: "",
    hotelName: "",
    eventplace: params?.slug,
    address: "",
    place: "",
  };

  const [addRegister, setAddRegister] = useState(initialState);
  const [rmOptions, setRmOptions] = useState([]);

  useEffect(() => {
    console.log("Params:", params);
    if (slug) {
      fetchRoadshowLinkData(slug);
    }
  }, [slug, params]);

  const fetchRoadshowLinkData = async (slug) => {
    try {
      const response = await getRoadshowLinkById(slug);
      if (response.success && response.data) {
        const RoadshowLink = response.data;
        setRoadshowLinkData(RoadshowLink);
        setAddRegister((prev) => ({
          ...prev,
          event: RoadshowLink.name || "",
          hotelName: RoadshowLink.hotelName || "",
          place: RoadshowLink.place || "",
          address: RoadshowLink.address || "",
          eventplace: RoadshowLink.place || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching roadshow link data:", error);
    }
  };

  useEffect(() => {
    getEventData();
  }, []);

  const getEventData = async () => {
    try {
      const response = await getRoadshow();
      if (response.success) {
        setEventList(response.data);
        setSearchedEventList(response.data);
      }
    } catch (err) {
      console.error("Error fetching event list:", err);
    }
  };

 useEffect(() => {
   fetchSourceRMData();
 }, []);
  
   const fetchSourceRMData = async () => {
     try {
       const response = await getSourceRM();
       if (response.success) {
         const formatted = response.data.map((rm) => ({
           label: rm.name,
           value: rm.name,
         }));
         setRmOptions(formatted);
       } else {
         console.error("Failed to fetch RM list");
       }
     } catch (err) {
       console.error("Error loading RM list", err);
     }
   };

  const validateForm = () => {
    const formErrors = {};
    if (!addRegister.fullName) formErrors.fullName = "Full Name is required.";
    if (!addRegister.email) {
      formErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addRegister.email)) {
      formErrors.email = "Invalid email.";
    }
    if (!addRegister.phone) formErrors.phone = "Phone Number is required.";
    if (!addRegister.attendDate)
      formErrors.attendDate = "Event attend date is required.";
    if (!addRegister.attendTime)
      formErrors.attendTime = "Event attend time is required.";
    if (!addRegister.sourcedRm)
      formErrors.sourcedRm = "Sourced RM is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePhone = (value) => {
    setAddRegister((prev) => ({ ...prev, phone: value }));
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const pattern = /^\+?[1-9]\d{1,14}$/;
    return pattern.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const duplicateCheck = await checkDuplicateClient({
        email: addRegister.email,
        eventName: addRegister.event,
      });

      if (duplicateCheck.duplicate) {
        Swal.fire(
          "Error",
          "You have already registered for this event.",
          "error"
        );
      } else {
        const response = await postClientResgister({
          ...addRegister,
          eventName: addRegister.event,
          eventplace: params?.slug,
        });

        if (response.success) {
          Swal.fire("Success", "Thank you for getting in touch!", "success");
          handleReset();
        } else {
          Swal.fire("Failed", "Registration failed", "error");
        }
      }
       track(`Roadshow form submitted ${slug}`, {
         track: `page: ${slug},
        name: ${addRegister.fullName},
         phone: ${addRegister.phone},
         email: ${addRegister.email},`,
       });
    } catch (err) {
      console.error(err);
      Swal.fire("Failed", "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAddRegister((prev) => ({
      ...initialState,
      event: prev.event,
      phone: prev.phone.slice(0, 2),
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-2">
        {/* Full Name */}
        <div className="mx-2 mb-4">
          <label className="text-white">Full Name</label>
          <input
            placeholder="Full Name*"
            name="fullName"
            type="text"
            className="w-full bg-transparent border border-white p-2 rounded text-white"
            value={addRegister.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mx-2 mb-4">
          <label className="text-white">Email</label>
          <input
            placeholder="Email*"
            name="email"
            type="email"
            className="w-full bg-transparent border border-white p-2 rounded text-white"
            value={addRegister.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mx-2 mb-4 phoneInput">
          <label className="text-white">Phone</label>
          <PhoneInput
            placeholder="Mobile Number*"
            type="text"
            name="phone"
            country={"in"}
            preferredCountries={["ae", "qa", "in", "sa"]}
            value={addRegister.phone || ""}
            onChange={handleChangePhone}
            enableAreaCodeStretch
            inputProps={{ name: "phone", required: true }}
            className="w-full bg-transparent border border-[#ffffff] p-[5px] pl-0 rounded text-[#ffffff]"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
          {!valid && (
            <p className="text-red-500 text-sm">Invalid phone number.</p>
          )}
        </div>

        {/* Attend Date */}
        <div className="mx-2 mb-4">
          <label className="text-white">Attend Date</label>
          <Select
            placeholder="Select Date"
            options={[
              RoadshowLink?.date && {
                label: RoadshowLink.date,
                value: RoadshowLink.date,
              },
              RoadshowLink?.date2 && {
                label: RoadshowLink.date2,
                value: RoadshowLink.date2,
              },
            ].filter(Boolean)}
            value={
              [
                { label: RoadshowLink?.date, value: RoadshowLink?.date },
                { label: RoadshowLink?.date2, value: RoadshowLink?.date2 },
              ].find((opt) => opt.value === addRegister.attendDate) || null
            }
            onChange={(selected) =>
              setAddRegister((prev) => ({
                ...prev,
                attendDate: selected?.value || "",
              }))
            }
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "transparent",
                borderColor: "white",
                color: "white",
              }),
              singleValue: (base) => ({ ...base, color: "white" }),
              input: (base) => ({ ...base, color: "white" }),
              menu: (base) => ({ ...base, zIndex: 999 }),
              option: (base, state) => ({
                ...base,
                color: "#000",
                backgroundColor: state.isFocused ? "#f5f5f5" : "white",
                cursor: "pointer",
              }),
            }}
          />
          {errors.attendDate && (
            <p className="text-red-500 text-sm">{errors.attendDate}</p>
          )}
        </div>

        {/* Attend Time */}
        <div className="mx-2 mb-4">
          <label className="text-white">Attend Time</label>
          <Select
            placeholder="Select Time"
            options={[
              "10am-11am",
              "11am-12pm",
              "12pm-1pm",
              "1pm-2pm",
              "2pm-3pm",
              "3pm-4pm",
              "4pm-5pm",
              "5pm-6pm",
              "6pm-7pm",
              "7pm-8pm",
              "8pm-9pm",
            ].map((time) => ({ label: time, value: time }))}
            value={
              addRegister.attendTime
                ? {
                    label: addRegister.attendTime,
                    value: addRegister.attendTime,
                  }
                : null
            }
            onChange={(selected) =>
              setAddRegister((prev) => ({
                ...prev,
                attendTime: selected?.value || "",
              }))
            }
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "transparent",
                borderColor: "white",
                color: "white",
              }),
              singleValue: (base) => ({ ...base, color: "white" }),
              input: (base) => ({ ...base, color: "white" }),
              menu: (base) => ({ ...base, zIndex: 999 }),
              option: (base, state) => ({
                ...base,
                color: "#000",
                backgroundColor: state.isFocused ? "#f5f5f5" : "white",
                cursor: "pointer",
              }),
            }}
          />
          {errors.attendTime && (
            <p className="text-red-500 text-sm">{errors.attendTime}</p>
          )}
        </div>

        {/* Sourced RM */}
        <div className="mb-4 mx-2">
          <label className="block text-white mb-0">Sourced RM</label>
          <Select
            options={rmOptions}
            placeholder="Select RM"
            value={
              rmOptions.find((opt) => opt.value === addRegister.sourcedRm) ||
              null
            }
            onChange={(selected) =>
              setAddRegister((prev) => ({
                ...prev,
                sourcedRm: selected?.value,
              }))
            }
            styles={{
              color: "white",
              control: (base) => ({
                ...base,
                backgroundColor: "transparent",
                borderColor: "white",
                color: "white",
              }),
              singleValue: (base) => ({ ...base, color: "white" }),
              input: (base) => ({ ...base, color: "white" }),
              menu: (base) => ({ ...base, zIndex: 999 }),
              option: (base, state) => ({
                ...base,
                color: "#000",
                backgroundColor: state.isFocused ? "#f5f5f5" : "white",
                cursor: "pointer",
              }),
            }}
          />
        </div>

        
      </div>
      {/* Budget */}
        <div className="mx-2 mb-4">
          <label className="text-white">Enter Your Budget</label>
          <input
            placeholder="Enter Your Budget"
            name="budget"
            type="text"
            className="w-full bg-transparent border border-white p-2 rounded text-white"
            value={addRegister.budget}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.budget}</p>
          )}
        </div>

      {/* Hidden Event Input */}
      <input type="hidden" name="event" value={addRegister.event} />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-[#CE8745] text-white hover:bg-white hover:text-[#CE8745] w-full p-2 mt-6 rounded transition-all"
        disabled={loading}
      >
        {loading ? <div className="loader w-6 h-6 border-white m-auto" /> : "Submit"}
      </button>
    </form>
  );
};

export default FormRoadshow;
