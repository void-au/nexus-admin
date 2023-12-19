"use client"
import { Loader } from "@/comps/Loader";
import { get_resource } from "@/engine/resources/resources";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Params {
    slug: string;
    id: string;
}

export const SingleResourcePage = ({ params }: { params: Params }) => {
    const router = useRouter();
    const resource = get_resource(params.slug);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null!);

    console.log("Got the params:", params);

    const get_data = async () => {
        if (!loading) setLoading(true);
        const data = await fetch(`/dash/resources/${resource?.slug}/${params?.id}/api`);
        const json = await data.json();
        setData(json.data || []);
        setLoading(false);
    }

    useEffect(() => {
        get_data();
    }, []);

    return (<div>
        <h1>Single Resource Page</h1>
        {loading && <Loader />}
        <div>
            {JSON.stringify(data)}
        </div>
    </div>)
}

export default SingleResourcePage;