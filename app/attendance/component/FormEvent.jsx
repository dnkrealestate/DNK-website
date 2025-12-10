"use client";

import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import "react-phone-input-2/lib/style.css"; 
import Select from "react-select";
import { userRoadshowServices } from "@/services/roadshowService"; 

const FormEvent = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const [events, setEvents] = useState([]);
  const [rmOptions, setRmOptions] = useState([]);
  const [addRegister, setAddRegister] = useState({
    fullName: "",
    email: "",
    phone: "91",
    type: "",
    budget: "",
    status: "",
    event: "",
    sourcedRm: "",
    attendedRm: "",
    remark: "",
    eventplace: "",
  });

  const { postRoadshowResgister, getRoadshow, getSourceRM, } =
    userRoadshowServices();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await getRoadshow();
        console.log("Fetched event data:", response.data);
        console.log("Submitting register data:", addRegister);
        if (response.success) {
          setEvents(response.data);
          if (response.data.length > 0) {
            const sortedEvents = response.data.sort(
              (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            );
            const mostRecentEvent = sortedEvents[0];
            setAddRegister((prev) => ({
              ...prev,
              event: mostRecentEvent.name,
              eventplace: mostRecentEvent.place
            }));
            
          }
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEventData();
  }, []);

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

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!addRegister.fullName) formErrors.fullName = "Full Name is required.";
    if (!addRegister.email) {
      formErrors.email = "Email is required.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(addRegister.email))
        formErrors.email = "Invalid email.";
    }
    if (!addRegister.phone) formErrors.phone = "Phone Number is required.";
    if (!addRegister.status) formErrors.status = "Property status is required.";
    if (!addRegister.type) formErrors.type = "Property type is required.";
    if (!addRegister.budget) formErrors.budget = "Budget is required.";
    if (!addRegister.attendedRm)
      formErrors.attendedRm = "Attended RM is required.";
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

  const handleReset = () => {
    setAddRegister((prev) => ({
      ...addRegister,
      fullName: "",
      email: "",
      phone: prev.phone.slice(0, 2),
      type: "",
      budget: "",
      status: "",
      sourcedRm: "",
      attendedRm: "",
      remark: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await postRoadshowResgister({
        fullName: addRegister.fullName,
        email: addRegister.email,
        phone: addRegister.phone,
        eventName: addRegister.event,
        status: addRegister.status,
        type: addRegister.type,
        budget: addRegister.budget,
        remark: addRegister.remark,
        sourcedRm: addRegister.sourcedRm,
        attendedRm: addRegister.attendedRm,
        eventplace: addRegister.eventplace,
      });

      if (response.success) {
        Swal.fire("Success", "Thank you for getting in touch!", "success");
        handleReset();
      } else {
        Swal.fire("Failed", "Registration failed", "error");
      }
    } catch (err) {
      Swal.fire("Failed", "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 rounded-2xl py-10 px-3 sm:px-6 m-4 relative ">
      <h3 className="text-[#ffffff] text-[1.5rem] font-semibold mb-4 text-center">
        Event Attendance Form
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3">
          <div className="mx-2 mb-4">
            <label className="text-[#ffffff]">Full Name</label>
            <input
              placeholder="Full Name*"
              name="fullName"
              type="text"
              className="w-full bg-transparent border border-[#ffffff] py-[6px] px-[10px] rounded  text-[#ffffff] "
              value={addRegister.fullName || ""}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="mx-2 mb-4">
            <label className="text-[#ffffff]">Email</label>
            <input
              placeholder="Email*"
              type="text"
              name="email"
              className="w-full bg-transparent border border-[#ffffff] py-[6px] px-[10px] rounded  text-[#ffffff]"
              value={addRegister.email || ""}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                {errors.email}
              </p>
            )}
          </div>

          <div className="phoneInput mx-2 mb-[25px] sm:mb-0">
            <label className="text-[#ffffff]">Mobile Number</label>
            <PhoneInput
              placeholder="Mobile Number*"
              type="text"
              name="phone"
              country={"in"}
              preferredCountries={["ae", "qa", "in", "sa"]} // Restrict to UAE and Qatar codes
              value={addRegister.phone || ""}
              onChange={handleChangePhone}
              enableAreaCodeStretch
              inputProps={{
                required: true,
              }}
              className="w-full bg-transparent border border-[#ffffff] py-[1px] px-[10px] pl-0 rounded text-[#ffffff]"
            />
            {errors.phone && (
              <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                {errors.phone}
              </p>
            )}
            {!valid && (
              <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                Invalid phone number.
              </p>
            )}
          </div>

          <div className="mx-2 mb-[25px]">
            <label className="text-[#ffffff]">Property Status</label>
            <select
              placeholder="Property Status "
              onChange={handleChange}
              name="status"
              value={addRegister.status || ""}
              type="text"
              className="w-full  border border-[#ffffff] py-[6px] px-[10px] rounded  bg-transparent text-[#ffffff]"
            >
              <option className="text-[#000000]" value={""}>
                Select -
              </option>
              <option
                className="text-[#000000] hover:bg-slate-700"
                value={"Off Plan"}
              >
                Off Plan
              </option>
              <option
                className="text-[#000000] hover:bg-slate-700"
                value={"Under Construction"}
              >
                Under Construction
              </option>
              <option
                className="text-[#000000] hover:bg-slate-700"
                value={"New Launched"}
              >
                New Launched
              </option>
              <option
                className="text-[#000000] hover:bg-slate-700"
                value={"Ready to move"}
              >
                Ready to move
              </option>
            </select>
            {errors.budget && (
              <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                {errors.budget}
              </p>
            )}
          </div>

          <div className="mx-2 mb-[25px]">
            <label className="text-[#ffffff]">Property Type</label>
            <select
              placeholder="Type "
              onChange={handleChange}
              name="type"
              value={addRegister.type || ""}
              type="text"
              className="w-full  border border-[#ffffff] py-[6px] px-[10px] rounded  bg-transparent text-[#ffffff]"
            >
              <option className="text-[#000000]" value={" "}>
                Select -
              </option>
              <option className="text-[#000000]" value={"Apartment"}>
                Apartment
              </option>
              <option className="text-[#000000]" value={"Duplex"}>
                Duplex
              </option>
              <option className="text-[#000000]" value={"Penthouse"}>
                Penthouse
              </option>
              <option className="text-[#000000]" value={"Townhouse"}>
                Townhouse
              </option>
              <option className="text-[#000000]" value={"Villa"}>
                Villa
              </option>
              <option className="text-[#000000]" value={"Plots"}>
                Plots
              </option>
              <option className="text-[#000000]" value={"Commercial-Space"}>
                Commercial Space
              </option>
            </select>
            {errors.type && (
              <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                {errors.type}
              </p>
            )}
          </div>

          <div className="mx-2 mb-[25px]">
            <label className="text-[#ffffff]">Budget</label>
            <select
              placeholder="Budget "
              onChange={handleChange}
              name="budget"
              value={addRegister.budget || ""}
              type="text"
              className="w-full  border border-[#ffffff] py-[6px] px-[10px] rounded  bg-transparent text-[#ffffff]"
            >
              <option className="text-[#000000]" value={""}>
                Select -
              </option>
              <option className="text-[#000000]" value={"0-1M"}>
                0 - 1M AED
              </option>
              <option className="text-[#000000]" value={"1M-2M"}>
                1M - 2M AED
              </option>
              <option className="text-[#000000]" value={"3M-5M"}>
                3M - 5M AED
              </option>
              <option className="text-[#000000]" value={"Above-5M"}>
                Above 5M AED
              </option>
            </select>
            {errors.budget && (
              <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                {errors.budget}
              </p>
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
          <div className="mx-2 mb-4">
            <label className="text-[#ffffff]">Attended RM</label>
            <input
              placeholder="Attended RM"
              name="attendedRm"
              type="text"
              className="w-full bg-transparent border border-[#ffffff] py-[6px] px-[10px] rounded  text-[#ffffff] "
              value={addRegister.attendedRm || ""}
              onChange={handleChange}
            />
            {errors.attendedRm && (
              <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                {errors.attendedRm}
              </p>
            )}
          </div>
          <div className="mx-2 mb-[25px]">
            <label className="text-[#ffffff]">Event Location</label>
            <input
              placeholder="Event Location"
              onChange={handleChange}
              name="event"
              value={addRegister.event || ""}
              className="w-full border border-[#ffffff] py-[6px] px-[10px] rounded bg-transparent text-[#ffffff]"
              disabled
            ></input>
            {errors.event && (
              <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                {errors.event}
              </p>
            )}
          </div>
        </div>
        <div className="mx-2 mb-0">
          <label className="text-[#ffffff]">Remarks</label>
          <textarea
            placeholder="Remarks"
            name="remark"
            type="text"
            className="w-full bg-transparent border border-[#ffffff] p-[10px] rounded  text-[#ffffff] h-[100px]"
            value={addRegister.remark || ""}
            onChange={handleChange}
          />
          {/* {errors.remark && (
                <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                  {errors.remark}
                </p>
              )} */}
        </div>
        <div className="mx-2 mb-[0px]">
          <input
            placeholder="Event Place"
            onChange={handleChange}
            name="eventplace"
            value={addRegister.eventplace || ""}
            className="w-full py-[0px] px-[0px] rounded bg-transparent text-gray-600 text-[0.5rem]"
            disabled
          />
        </div>

        <button
          className="bg-[#CE8745] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#CE8745] w-full p-[10px] mt-[5px] rounded duration-100 flex justify-center"
          disabled={loading}
        >
          {loading ? (
            <div className="loader !w-[24px] !h-[24px]"></div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default FormEvent;
