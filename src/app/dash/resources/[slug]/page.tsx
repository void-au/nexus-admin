"use client";

import { Loader } from "@/comps/Loader";
import { Table } from "@/comps/ResourceTable";
import { get_resource } from "@/engine/resources/resources";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Params {
    slug: string;
}

export const ResourcePage = ({ params }: { params: Params }) => {
    const router = useRouter();
    const resource = get_resource(params.slug);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any[]>([]);

    const get_data = async () => {
        if (!loading) setLoading(true);
        const data = await fetch(`/dash/resources/${resource?.slug}/api`);
        const json = await data.json();
        setData(json.data || []);
        setLoading(false);
    }

    // Handle a row item being clicked
    const handle_click = (row: any) => {
        // Get the id of the row, could be anything; id, ID, _id, etc.
        const id = row?.id || row?.ID || row?._id || null;
        if (!id) return;

        router.push(`/dash/resources/${resource?.slug}/${id}`);
    }

    useEffect(() => {
        get_data();
    }, []);

    return (
        <div className="resource-page">
            <h1>{resource?.name}</h1>
            <Table data={data} columns={resource?.list_fields || []} loading={loading} onClick={handle_click} show_options />
        </div >
    );
}

export default ResourcePage;
