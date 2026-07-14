"use client";

import React, { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { MdPersonSearch } from "react-icons/md";
import { userRoadshowServices } from "@/services/roadshowService";
import { findBestNameMatch } from "@/utils/matchRmName";

const BUYING_TIMELINE_OPTIONS = [
  { label: "Immediate", value: "Immediate" },
  { label: "Next 30 Days", value: "Next 30 Days" },
  { label: "Flexible", value: "Flexible" },
];

const selectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: "0.5rem",
    minHeight: "42px",
    boxShadow: "none",
    ":hover": { borderColor: "rgba(255,255,255,0.3)" },
  }),
  singleValue: (base) => ({ ...base, color: "#fff" }),
  input: (base) => ({ ...base, color: "#fff" }),
  placeholder: (base) => ({ ...base, color: "rgba(255,255,255,0.4)" }),
  menu: (base) => ({ ...base, zIndex: 999 }),
  option: (base, state) => ({
    ...base,
    color: "#000",
    backgroundColor: state.isFocused ? "#f5f5f5" : "white",
    cursor: "pointer",
  }),
};

const inputClass =
  "w-full rounded-lg border border-white/15 bg-black/20 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/40 focus:outline-none";

function FieldLabel({ children }) {
  return (
    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/50">
      {children}
    </label>
  );
}

function FieldError({ children }) {
  if (!children) return null;
  return <p className="mt-1 text-xs text-red-400">{children}</p>;
}

function SectionHeading({ children }) {
  return (
    <h4 className="mb-3 mt-6 border-b border-white/10 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40 first:mt-0">
      {children}
    </h4>
  );
}

const FormEvent = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const [rmOptions, setRmOptions] = useState([]);
  const [addRegister, setAddRegister] = useState({
    fullName: "",
    email: "",
    phone: "91",
    type: "",
    budget: "",
    buyingTimeline: "",
    status: "",
    event: "",
    sourcedRm: "",
    attendedRm: "",
    remark: "",
    eventplace: "",
  });

  // Previously self-registered clients, for the Full Name autocomplete.
  const [registeredClients, setRegisteredClients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionBoxRef = useRef(null);

  const { postRoadshowResgister, getRoadshow, getActiveRM, getClientRegister } =
    userRoadshowServices();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await getRoadshow();
        if (response.success && response.data.length > 0) {
          const sortedEvents = response.data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          const mostRecentEvent = sortedEvents[0];
          setAddRegister((prev) => ({
            ...prev,
            event: mostRecentEvent.name,
            eventplace: mostRecentEvent.place,
          }));
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEventData();
  }, []);

  // Live, active-employee RM list (used for both Sourced RM and Attended RM).
  useEffect(() => {
    const fetchRmData = async () => {
      try {
        const response = await getActiveRM();
        if (response.success) {
          setRmOptions(response.data.map((rm) => ({ label: rm.name, value: rm.name })));
        } else {
          console.error("Failed to fetch RM list");
        }
      } catch (err) {
        console.error("Error loading RM list", err);
      }
    };
    fetchRmData();
  }, []);

  // Clients who already self-registered online, for the Full Name autocomplete.
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getClientRegister();
        if (response.success) {
          setRegisteredClients(response.data);
        }
      } catch (err) {
        console.error("Error loading registered clients:", err);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleFullNameChange = (e) => {
    const { value } = e.target;
    setAddRegister((prev) => ({ ...prev, fullName: value }));

    const term = value.trim().toLowerCase();
    if (term.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const currentPlace = addRegister.eventplace?.trim().toLowerCase();

    const matches = registeredClients
      .filter(
        (client) => client.eventplace?.trim().toLowerCase() === currentPlace
      )
      .filter((client) => client.fullName?.toLowerCase().includes(term))
      .slice(0, 6);

    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  };

  const handleSelectSuggestion = (client) => {
    // The client's recorded sourcedRm is often messy (first-name-only, typos),
    // so reconcile it against the live RM list rather than storing it as-is —
    // that way the dropdown actually shows it selected instead of blank.
    const matchedRm = findBestNameMatch(
      client.sourcedRm,
      rmOptions.map((opt) => opt.value)
    );

    setAddRegister((prev) => ({
      ...prev,
      fullName: client.fullName || "",
      email: client.email || "",
      phone: client.phone || prev.phone,
      sourcedRm: matchedRm || client.sourcedRm || prev.sourcedRm,
    }));
    setShowSuggestions(false);
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
      buyingTimeline: "",
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
        buyingTimeline: addRegister.buyingTimeline,
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
    <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-8">
      <h3 className="mb-1 text-center text-xl font-semibold text-white">
        Event Attendance
      </h3>
      <p className="mb-6 text-center text-sm text-white/40">
        Check in a registered client, or add a new walk-in.
      </p>

      <form onSubmit={handleSubmit}>
        <SectionHeading>Client Details</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="relative" ref={suggestionBoxRef}>
            <FieldLabel>Full Name</FieldLabel>
            <div className="relative">
              <input
                placeholder="Start typing to search..."
                name="fullName"
                type="text"
                autoComplete="off"
                className={`${inputClass} pr-8`}
                value={addRegister.fullName || ""}
                onChange={handleFullNameChange}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              />
              <MdPersonSearch className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30" />
            </div>

            {showSuggestions && (
              <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-white/15 bg-[#1C1D22] shadow-xl">
                {suggestions.map((client) => (
                  <button
                    type="button"
                    key={client._id}
                    onClick={() => handleSelectSuggestion(client)}
                    className="flex w-full flex-col items-start gap-0.5 border-b border-white/5 px-3 py-2 text-left transition-colors last:border-b-0 hover:bg-white/10"
                  >
                    <span className="text-sm text-white">{client.fullName}</span>
                    <span className="text-xs text-white/40">
                      {client.phone} {client.email ? `· ${client.email}` : ""}
                    </span>
                  </button>
                ))}
              </div>
            )}
            <FieldError>{errors.fullName}</FieldError>
          </div>

          <div>
            <FieldLabel>Email</FieldLabel>
            <input
              placeholder="Email*"
              type="text"
              name="email"
              className={inputClass}
              value={addRegister.email || ""}
              onChange={handleChange}
            />
            <FieldError>{errors.email}</FieldError>
          </div>

          <div className="phoneInput phoneInputBordered">
            <FieldLabel>Mobile Number</FieldLabel>
            <PhoneInput
              placeholder="Mobile Number*"
              type="text"
              name="phone"
              country={"in"}
              preferredCountries={["ae", "qa", "in", "sa"]}
              value={addRegister.phone || ""}
              onChange={handleChangePhone}
              enableAreaCodeStretch
              inputProps={{ required: true }}
              containerClass="w-full"
            />
            <FieldError>{errors.phone}</FieldError>
            {!valid && <FieldError>Invalid phone number.</FieldError>}
          </div>
        </div>

        <SectionHeading>Property Interest</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <FieldLabel>Property Status</FieldLabel>
            <select
              onChange={handleChange}
              name="status"
              value={addRegister.status || ""}
              className={inputClass}
            >
              <option className="text-black" value="">Select -</option>
              <option className="text-black" value="Off Plan">Off Plan</option>
              <option className="text-black" value="Under Construction">Under Construction</option>
              <option className="text-black" value="New Launched">New Launched</option>
              <option className="text-black" value="Ready to move">Ready to move</option>
            </select>
            <FieldError>{errors.status}</FieldError>
          </div>

          <div>
            <FieldLabel>Property Type</FieldLabel>
            <select
              onChange={handleChange}
              name="type"
              value={addRegister.type || ""}
              className={inputClass}
            >
              <option className="text-black" value="">Select -</option>
              <option className="text-black" value="Apartment">Apartment</option>
              <option className="text-black" value="Duplex">Duplex</option>
              <option className="text-black" value="Penthouse">Penthouse</option>
              <option className="text-black" value="Townhouse">Townhouse</option>
              <option className="text-black" value="Villa">Villa</option>
              <option className="text-black" value="Plots">Plots</option>
              <option className="text-black" value="Commercial-Space">Commercial Space</option>
            </select>
            <FieldError>{errors.type}</FieldError>
          </div>

          <div>
            <FieldLabel>Budget</FieldLabel>
            <select
              onChange={handleChange}
              name="budget"
              value={addRegister.budget || ""}
              className={inputClass}
            >
              <option className="text-black" value="">Select -</option>
              <option className="text-black" value="0-1M">0 - 1M AED</option>
              <option className="text-black" value="1M-2M">1M - 2M AED</option>
              <option className="text-black" value="3M-5M">3M - 5M AED</option>
              <option className="text-black" value="Above-5M">Above 5M AED</option>
            </select>
            <FieldError>{errors.budget}</FieldError>
          </div>

          
        </div>
          <div className="mt-4">
            <FieldLabel>When do you plan to buy?</FieldLabel>
            <CreatableSelect
              options={BUYING_TIMELINE_OPTIONS}
              placeholder="Select or type your own"
              value={
                addRegister.buyingTimeline
                  ? { label: addRegister.buyingTimeline, value: addRegister.buyingTimeline }
                  : null
              }
              onChange={(selected) =>
                setAddRegister((prev) => ({
                  ...prev,
                  buyingTimeline: selected?.value || "",
                }))
              }
              styles={selectStyles}
            />
          </div>
        <SectionHeading>Relationship DNK Real Estate</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <FieldLabel>Sourced RM</FieldLabel>
            <Select
              options={rmOptions}
              placeholder="Select RM"
              value={rmOptions.find((opt) => opt.value === addRegister.sourcedRm) || null}
              onChange={(selected) =>
                setAddRegister((prev) => ({ ...prev, sourcedRm: selected?.value }))
              }
              styles={selectStyles}
            />
          </div>

          <div>
            <FieldLabel>Attended RM</FieldLabel>
            <Select
              options={rmOptions}
              placeholder="Select RM"
              value={rmOptions.find((opt) => opt.value === addRegister.attendedRm) || null}
              onChange={(selected) =>
                setAddRegister((prev) => ({ ...prev, attendedRm: selected?.value }))
              }
              styles={selectStyles}
            />
            <FieldError>{errors.attendedRm}</FieldError>
          </div>

          <div>
            <FieldLabel>Event Location</FieldLabel>
            <input
              value={addRegister.event || ""}
              className={`${inputClass} opacity-60`}
              disabled
            />
          </div>
        </div>

        <div className="mt-4">
          <FieldLabel>Remarks</FieldLabel>
          <textarea
            placeholder="Remarks"
            name="remark"
            className={`${inputClass} h-24 resize-y`}
            value={addRegister.remark || ""}
            onChange={handleChange}
          />
        </div>

        <input type="hidden" name="eventplace" value={addRegister.eventplace || ""} />

        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#CE8745] p-2.5 font-semibold text-white transition-colors duration-150 hover:bg-white hover:text-[#CE8745] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
        >
          {loading ? <div className="loader !h-[24px] !w-[24px]"></div> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FormEvent;
