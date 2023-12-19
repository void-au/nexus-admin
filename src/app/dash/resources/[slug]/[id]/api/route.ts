import { get_connection } from "@/engine/database/database";
import { get_resource } from "@/engine/resources/resources";

export async function GET(
    request: Request,
    { params }: { params: { slug: string, id: string } }
) {
    const slug = params?.slug; // 'a', 'b', or 'c'
    const resource = get_resource(slug);

    const db = await get_connection();

    const result = await db.query(`SELECT * FROM "${resource?.table_name}" WHERE id= '${params.id}'`);

    return Response.json({
        data: result?.rows?.[0],
    });
}