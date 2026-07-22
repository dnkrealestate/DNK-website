"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdSearch, MdAdd, MdApartment } from "react-icons/md";
import { useProjectServices } from "@/services/projectServices";
import { URL } from "@/url/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "off-plan", label: "Off-Plan" },
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
  { value: "draft", label: "Drafts" },
];

const STATUS_TONE = { "off-plan": "off-plan", buy: "buy", rent: "rent", sell: "sell" };

export default function ProjectGrid() {
  const router = useRouter();
  const { getProjectSummaryListR } = useProjectServices();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await getProjectSummaryListR();
        if (!cancelled && response.success) {
          setProjects(
            response.data.sort(
              (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            )
          );
        }
      } catch (err) {
        console.error("Failed to fetch project list:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = projects
    .filter((p) => {
      if (filter === "all") return true;
      if (filter === "draft") return Boolean(p.isDraft);
      return p.status === filter;
    })
    .filter((p) =>
      (p.projectname || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <PageHeader
        title="All Projects"
        description="Browse and manage your property listings."
        actions={
          <Button onClick={() => router.push("/dashboard/addProject/new")}>
            <MdAdd className="text-lg" /> Add Project
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex flex-wrap gap-1 rounded-lg bg-[#E9ECF1] p-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-white text-[#0F2C45] shadow-sm"
                  : "text-[#5B6472] hover:text-[#0F2C45]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative w-full max-w-xs">
          <MdSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA4B2]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-[#D7DCE3] bg-white py-2 pl-9 pr-3 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-sm text-[#8791A1]">
          Loading projects...
        </div>
      ) : filtered.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <MdApartment className="text-4xl text-[#C4CAD4]" />
          <p className="text-sm text-[#8791A1]">
            {projects.length === 0
              ? "No projects yet. Create your first listing."
              : "No projects match your search."}
          </p>
          {projects.length === 0 && (
            <Button onClick={() => router.push("/dashboard/addProject/new")}>
              <MdAdd className="text-lg" /> Add Project
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((project) => (
            <button
              key={project._id}
              onClick={() => router.push(`/dashboard/addProject/${project._id}`)}
              className="group text-left"
            >
              <Card className="overflow-hidden transition-shadow group-hover:shadow-md">
                <div className="relative h-36 w-full bg-[#F0F2F5]">
                  {project.isDraft && (
                    <span className="absolute left-2 top-2 z-10 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
                      Draft
                    </span>
                  )}
                  {project.thumbnail ? (
                    <div>
                      <Badge className="z-10 absolute right-2 top-2" tone={STATUS_TONE[project.status] || "default"}>
                        {project.status || "—"}
                      </Badge>

                      <Image
                        src={URL + project.thumbnail}
                        alt={project.altthumbnail || project.projectname}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <MdApartment className="text-3xl text-[#C4CAD4]" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className=" flex items-start justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold text-[#1A2233] !mb-1">
                      {project.projectname}
                    </h3>
                    
                  </div>
                  <p className="truncate text-xs text-[#7A8494] mb-0">
                    {project.developer || "No developer set"}
                  </p> 
                  {project.handover && (
                    <p className="mt-1.5 text-xs text-[#8791A1]">
                      Handover: {project.handover}
                    </p>
                  )}
                </div>
              </Card>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
