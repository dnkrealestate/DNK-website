"use client";

import { use } from "react";
import AddProject from "../components/AddProject";

export default function EditProjectPage({ params }) {
  const { id } = use(params);
  return <AddProject mode="update" user_id={id} />;
}
