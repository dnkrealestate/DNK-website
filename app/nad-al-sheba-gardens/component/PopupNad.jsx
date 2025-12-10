import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { userUserServices } from "@/services/userServices";
import PopupImg from "@/public/assets/pojects/NadAlSheba/nad-popup.webp";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

export const PopupNad = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const { contactData } = userUserServices();
  const [errors, setErrors] = useState({});
  const pathname = usePathname();

  const pageTitle = `Website Lead from ${ pathname }`;

  const validateForm = () => {
    let formErrors = {};
    if (!fullName) formErrors.fullName = "Full Name is required.";
    if (!email) {
      formErrors.email = "Email is required.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) formErrors.email = "Invalid email.";
    }
    if (!phoneNumber) formErrors.phoneNumber = "Phone Number is required.";
    if (!city) formErrors.city = "City is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const addLeadtobitrix = async (name, email, phone, city) => {
    const apiUrl =
      "https://crm.dnkre.com/rest/1/tu18jyuvffebb7mc/crm.lead.add.json";

    const leadData = {
      fields: {
        TITLE: `${pageTitle}`,
        NAME: name,
        PHONE: [
          {
            VALUE: phone,
            VALUE_TYPE: "WORK",
          },
        ],
        UF_CRM_LEAD_1724493296911: city,
        EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any necessary headers like authentication tokens here
          // 'Authorization': `Bearer ${yourToken}`
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        // Check if the response status is OK
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json(); // Parse the JSON response
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      await contactData({
        fullName,
        email,
        phoneNumber,
        city,
      });

      Swal.fire({
        title: "Thank you",
        html: "<p>Our expert will contact you shortly</p>",
        icon: "success",
      });
      addLeadtobitrix(fullName, email, phoneNumber, city);
      // Clear the form fields
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCity("");
      onClose();
    } catch (err) {
      console.error("Error submitting form:", err);
      Swal.fire("Failed", "Check your internet connection", "error");
    } finally {
      setLoading(false);
    }

    track("Contact form submitted", { location: pathname });
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative  w-full max-w-2xl md:max-w-5xl max-h-full rounded-lg shadow bg-[#2D2D2D] grid md:grid-cols-2 m-3 overflow-hidden">
        <div className="hidden md:block">
          <div className="hidden md:block relative w-full h-full">
            <Image
              src={PopupImg}
              alt="Nad Popup"
              fill
              quality={85}
              objectFit="cover"
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-end p-4 md:p-5 rounded-t ">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <IoClose className="text-[1.5rem]" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="!pt-0 p-4 md:p-5 space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col justify-between mx-[0px] md:mx-[10px] mt-3 md:mt-0">
                <div>
                  <p className="m-0 !text-[#258493]">More About</p>
                  <h2 className="text-[#fff] text-[1.4rem]">
                    Nad Al Sheba Gardens
                  </h2>
                  <input
                    placeholder="Full Name*"
                    type="text"
                    className="w-full bg-transparent border border-[#ffffff] p-[10px] rounded  text-[#ffffff]"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {errors.fullName && (
                    <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                      {errors.fullName}
                    </p>
                  )}
                  <input
                    placeholder="Email Address*"
                    type="text"
                    className="w-full bg-transparent border border-[#ffffff] p-[10px] rounded mt-[25px] text-[#ffffff]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                      {errors.email}
                    </p>
                  )}

                  <div className=" phoneInput">
                    <PhoneInput
                      placeholder="Mobile Number*"
                      type="text"
                      country={"ae"}
                      value={phoneNumber}
                      onChange={handleChange}
                      enableAreaCodeStretch
                      inputProps={{
                        required: true,
                      }}
                      className="w-full bg-transparent border border-[#ffffff] p-[5px] pl-0 mt-[25px] rounded text-[#ffffff]"
                    />
                    {errors.phoneNumber && (
                      <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                        {errors.phoneNumber}
                      </p>
                    )}
                    {!valid && (
                      <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                        Invalid phone number.
                      </p>
                    )}
                  </div>
                  <input
                    placeholder="City"
                    type="text"
                    className="w-full bg-transparent border border-[#ffffff] p-[10px] rounded mt-[25px] text-[#ffffff]"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {errors.city && (
                    <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                      {errors.city}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    className="bg-[#258493] hover:bg-[#ffffff] hover:text-[#258493] w-full p-[10px] mt-[25px] rounded duration-100 flex justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="loader !w-[24px] !h-[24px] FormSubmitButton"></div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupNad;
