import con from "../../../../../../lib/conn.js";
import WWM from "../../../../../../models/WomenWelfare.js";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ scheme: string }> }
) {
  const { scheme } = await params;          
  console.log("Scheme ID:", scheme);

  await con();
  const data = await WWM.findById(scheme);
  console.log(data);

  if (!data) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(data);
}
