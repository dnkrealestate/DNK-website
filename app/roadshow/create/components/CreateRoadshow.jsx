"use client";

import React, { Suspense, useEffect, useState } from "react";
import Swal from "sweetalert2";
import RoadshowList from "./RoadshowList";
import { userRoadshowServices } from "@/services/roadshowService";

const CreateRoadshow = (props) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const initialState = {
    name: "",
    address: "",
    date: "",
    date2: "",
    hotelName: "",
    place: "",
  };

  const [addRoadshow, setAddRoadshow] = useState(initialState);

  const { postRoadshow, getRoadshow, putRoadshow } = userRoadshowServices();

  useEffect(() => {
    if (props?.mode === "update" && props?.user_id) {
      fetchRoadshow(props.user_id);
    }
  }, [props?.mode, props?.user_id]);

  const fetchRoadshow = async (id) => {
    try {
      const response = await getRoadshow(id);
      setAddRoadshow({ ...response.data });
    } catch (err) {
      console.error("Failed to fetch roadshow details:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddRoadshow((prev) => ({
      ...prev,
      [name]: value === "" ? null : value,
    }));
  };

  const handleReset = () => {
    setAddRoadshow(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      Object.entries(addRoadshow).forEach(([key, value]) =>
        formdata.append(key, value)
      );

      let response;
      if (addRoadshow?.id) {
        response = await putRoadshow(addRoadshow.id, formdata);
      } else {
        response = await postRoadshow(formdata);
      }

      if (response?.success) {
        Swal.fire("Success", "Successfully added/updated", "success");
        handleReset();
        setSubmit((prev) => !prev);
      } else {
        Swal.fire("Failed", "Failed to add/update roadshow", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Failed", "Error while processing roadshow", "error");
    }
  };

  return (
    <div className="bg-[#1E1E1E] p-4">
      <div className="w-full">
        {/* Create Roadshow Form */}
        <div className="bg-[#1E1E1E] rounded-2xl relative">
          <h3 className="text-[#fff] text-[1.5rem] font-semibold mb-6 text-center">
            Create Roadshow
          </h3>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid sm:grid-cols-2">
              {[
                { name: "name", label: "Roadshow Name" },
                { name: "hotelName", label: "Hotel Name" },
                { name: "address", label: "Hotel Address" },
                { name: "date", label: "Event Date Day 1" },
                { name: "date2", label: "Event Date Day 2" },
                { name: "place", label: "Place Name" },
              ].map((field) => (
                <div key={field.name} className="mx-2 mb-4">
                  <label>{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    placeholder={`${field.label}*`}
                    value={addRoadshow[field.name] || ""}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-[#fff] p-[10px] rounded text-[#fff]"
                  />
                  {errors[field.name] && (
                    <p className="error text-[0.9rem] text-[#FF0202]">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="bg-[#00A3FF] hover:bg-[#6A9F43] px-[2.5rem] py-[0.4rem] rounded-md text-[#ffffff]"
            >
              {addRoadshow?.id ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        {/* Roadshow List */}
        <div className="relative pt-4">
          <Suspense fallback={<div>Loading...</div>}>
            <RoadshowList
              addRoadshow={addRoadshow}
              setAddRoadshow={setAddRoadshow}
              submit={submit}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CreateRoadshow;
