"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { userRoadshowServices } from "@/services/roadshowService";
import SourceRMList from "./SourceRMList";
import Card from "@/app/dashboard/components/ui/Card";
import PageHeader from "@/app/dashboard/components/ui/PageHeader";
import Button from "@/app/dashboard/components/ui/Button";
import { Input } from "@/app/dashboard/components/ui/Field";

const AddSourceRM = (props) => {
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [submit, setSubmit] = useState(false);

  const initialState = {
    name: "",
    email: "",
  };

  const [addSourceRM, setAddSourceRM] = useState(initialState);

  const { postSourceRM, getSourceRM, updateSourceRM } = userRoadshowServices();

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
    setErrors({});
  };

  const validate = () => {
    let newErrors = {};

    if (!addSourceRM.name) {
      newErrors.name = "Name is required";
    }

    if (!addSourceRM.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(addSourceRM.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
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
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Add Source RM"
        description="Manage the relationship managers who can be credited as a lead source."
      />

      <Card className="p-5 sm:p-6">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Source RM Name"
              required
              name="name"
              placeholder="Source RM Name"
              value={addSourceRM.name || ""}
              onChange={handleChange}
            />
            {errors.name && <p className="-mt-3 text-xs text-red-500">{errors.name}</p>}

            <Input
              label="Email"
              required
              name="email"
              type="email"
              placeholder="Email"
              value={addSourceRM.email || ""}
              onChange={handleChange}
            />
            {errors.email && <p className="-mt-3 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <Button type="submit" loading={saving}>
              {addSourceRM?.id ? "Update" : "Add Source RM"}
            </Button>
            {addSourceRM?.id && (
              <Button type="button" variant="secondary" onClick={handleReset}>
                Cancel edit
              </Button>
            )}
          </div>
        </form>
      </Card>

      <div className="mt-6">
        <SourceRMList
          addSourceRM={addSourceRM}
          setAddSourceRM={setAddSourceRM}
          submit={submit}
        />
      </div>
    </div>
  );
};

export default AddSourceRM;
