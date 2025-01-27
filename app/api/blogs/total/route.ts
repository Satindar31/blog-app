import { getTotalBlogs } from "@/helpers/getBlogs";
import { log } from "@logtail/next";

export async function GET() {
  try {
    const blogs = await getTotalBlogs({ end: "backend" });
    return new Response(JSON.stringify({ blogs }));
  } catch (err: any) {
    return new Response(JSON.stringify({ err: err.message }), {
      status: 500,
    });
  }
}
