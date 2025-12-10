"use client";

import React, { Suspense, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { userRoadshowServices } from "@/services/roadshowService";
import SourceRMList from "./SourceRMList";

const AddSourceRM = (props) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const initialState = {
    name: "",
  };

  const [addSourceRM, setAddSourceRM] = useState(initialState);

  const { postSourceRM, getSourceRM, updateSourceRM, deleteSourceRM } = userRoadshowServices();

  useEffect(() => {
    if (props?.mode === "update" && props?.user_id) {
      fetchSourceRM(props.user_id);
    }
  }, [props?.mode, props?.user_id]);

  const fetchSourceRM = async (id) => {
    try {
      const response = await getSourceRM(id);
      setAddSourceRM({ ...response.data });
    } catch (err) {
      console.error("Failed to fetch roadshow details:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddSourceRM((prev) => ({
      ...prev,
      [name]: value === "" ? null : value,
    }));
  };

  const handleReset = () => {
    setAddSourceRM(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      Object.entries(addSourceRM).forEach(([key, value]) =>
        formdata.append(key, value)
      );

      let response;
      if (addSourceRM?.id) {
        response = await updateSourceRM(addSourceRM.id, formdata);
      } else {
        response = await postSourceRM(formdata);
      }

      if (response?.success) {
        Swal.fire("Success", "Successfully added/updated", "success");
        handleReset();
        setSubmit((prev) => !prev);
      } else {
        Swal.fire("Failed", "Failed to add/update sourceRM", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Failed", "Error while processing sourceRM", "error");
    }
  };

  return (
    <div className="bg-[#1E1E1E] p-4">
      <div className="w-full">
        {/* Create sourceRM Form */}
        <div className="bg-[#1E1E1E] rounded-2xl relative">
          <h3 className="text-[#fff] text-[1.5rem] font-semibold mb-6 text-center">
            Add sourceRM
          </h3>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid sm:grid-cols-2">
              {[{ name: "name", label: "SourceRM Name" }].map((field) => (
                <div key={field.name} className="mx-2 mb-4">
                  <label>{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    placeholder={`${field.label}*`}
                    value={addSourceRM[field.name] || ""}
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
              {addSourceRM?.id ? "Update" : "Add"}
            </button>
          </form>
        </div>

        {/* Roadshow List */}
        <div className="relative pt-4">
          <Suspense fallback={<div>Loading...</div>}>
            <SourceRMList
              addSourceRM={addSourceRM}
              setAddSourceRM={setAddSourceRM}
              submit={submit}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AddSourceRM;
