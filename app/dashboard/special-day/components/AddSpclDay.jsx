"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import eventDefult from "@/public/assets/icons/adposter.webp";
import { useProjectServices } from "@/services/projectServices";
import Swal from "sweetalert2";
import { URL } from "@/url/axios";

const AddSpclDay = () => {
  const [event, setEvent] = useState({ image: null });
  const [eventId, setEventId] = useState(null);
  const [imageUrl, setImageUrl] = useState(eventDefult);

  const { postEvent, putEvent, getEventR, deleteEvent } = useProjectServices();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await getEventR();

      if (response.success) {
        const eventData = response.data;

        if (eventData.length > 0) {
          const eventImage = eventData[0].image;
          const eventId = eventData[0]._id;
          setEvent({ image: eventImage });
          setEventId(eventId);
          setImageUrl(window.URL + eventImage);
        }
      }
    } catch (err) {
      console.error("Failed to fetch event:", err);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    if (file) {
      setEvent({ image: file });
      setImageUrl(window.URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      if (event.image instanceof File) {
        formdata.append("image", event.image);
      } else {
        Swal.fire("Failed", "Please upload a valid image file!", "error");
        return;
      }

      let response;
      if (eventId) {
        response = await putEvent(eventId, formdata);
      } else {
        response = await postEvent(formdata);
      }

      if (response.success) {
        Swal.fire("Success", "Successfully added/updated", "success");
        fetchEvent();
      } else {
        Swal.fire("Failed", "Failed to add/update event", "error");
      }
    } catch (err) {
      Swal.fire(
        "Failed",
        err?.response?.data?.message || "Event upload operation failed",
        "error"
      );
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteEvent();
      if (response.success) {
        Swal.fire(
          "Success",
          response.message || "Deleted successfully",
          "success"
        );
        setEvent({ image: null });
        setEventId(null);
        setImageUrl(eventDefult);
      } else {
        Swal.fire("Failed", "Failed to delete the event", "error");
      }
    } catch (err) {
      Swal.fire(
        "Failed",
        err?.response?.data?.message || "Failed to delete the event",
        "error"
      );
    }
  };

  return (
    <div>
      <h1 className="text-[#000] font-semibold">
        {eventId ? "Update" : "Add"} Home Event Notification
      </h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="image" className="block cursor-pointer">
            <Image
              src={typeof imageUrl === "string" ? imageUrl : eventDefult}
              alt="event image"
              width={800}
              height={400}
              className="h-[400px] object-contain bg-slate-600"
            />
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-[#00A3FF] hover:bg-[#6A9F43] px-[2.5rem] py-[0.4rem] rounded-md text-white mt-6"
          >
            {eventId ? "Update" : "Submit"}
          </button>

          {eventId && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 px-[2.5rem] py-[0.4rem] rounded-md text-white mt-6"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddSpclDay;
