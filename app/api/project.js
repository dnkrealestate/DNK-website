import { URL } from "@/url/axios";

export async function fetchProjects() {

    const res = await fetch(`${URL}task/get-task-public`, {
        next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.success ? data.data : [];
}