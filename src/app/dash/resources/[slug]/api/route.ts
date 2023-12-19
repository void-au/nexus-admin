import { get_connection } from "@/engine/database/database";
import { get_resource } from "@/engine/resources/resources";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const slug = params?.slug; // 'a', 'b', or 'c'
    const resource = get_resource(slug);

    console.log("Got table name", slug, resource?.table_name);

    const db = await get_connection();

    const result = await db.query(`SELECT * FROM "${resource?.table_name}"`);

    return Response.json({
        data: result.rows,
    })

    // return Response.json({
    // })
}