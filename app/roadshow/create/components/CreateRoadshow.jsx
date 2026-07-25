"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import RoadshowList from "./RoadshowList";
import { userRoadshowServices } from "@/services/roadshowService";
import Card from "@/app/dashboard/components/ui/Card";
import PageHeader from "@/app/dashboard/components/ui/PageHeader";
import Button from "@/app/dashboard/components/ui/Button";
import { Input, Select } from "@/app/dashboard/components/ui/Field";
import { TIMEZONE_OPTIONS } from "@/utils/timezones";

const FIELDS = [
  { name: "name", label: "Roadshow Name" },
  { name: "hotelName", label: "Hotel Name" },
  { name: "address", label: "Hotel Address" },
  { name: "date", label: "Event Date Day 1" },
  { name: "date2", label: "Event Date Day 2" },
  { name: "place", label: "Place Name" },
];

const CreateRoadshow = (props) => {
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [submit, setSubmit] = useState(false);

  const initialState = {
    name: "",
    address: "",
    date: "",
    date2: "",
    hotelName: "",
    place: "",
    timezone: "",
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
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

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
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Create Roadshow"
        description="Set up a new roadshow event, or edit an existing one from the list below."
      />

      <Card className="p-5 sm:p-6">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FIELDS.map((field) => (
              <Input
                key={field.name}
                label={field.label}
                name={field.name}
                placeholder={field.label}
                value={addRoadshow[field.name] || ""}
                onChange={handleChange}
              />
            ))}

            <Select
              label="Venue Timezone"
              name="timezone"
              value={addRoadshow.timezone || ""}
              onChange={handleChange}
            >
              <option value="">Select timezone</option>
              {TIMEZONE_OPTIONS.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label} ({tz.abbr})
                </option>
              ))}
            </Select>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <Button type="submit" loading={saving}>
              {addRoadshow?.id ? "Update Roadshow" : "Create Roadshow"}
            </Button>
            {addRoadshow?.id && (
              <Button type="button" variant="secondary" onClick={handleReset}>
                Cancel edit
              </Button>
            )}
          </div>
        </form>
      </Card>

      <div className="mt-6">
        <RoadshowList
          addRoadshow={addRoadshow}
          setAddRoadshow={setAddRoadshow}
          submit={submit}
        />
      </div>
    </div>
  );
};

export default CreateRoadshow;
