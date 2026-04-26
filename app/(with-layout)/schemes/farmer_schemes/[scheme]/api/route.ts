import con from "../../../../../../lib/conn.js";
import FWM from "../../../../../../models/FarmerWelfare.js";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ scheme: string }> }
) {
  const { scheme } = await params;          
  console.log("Scheme ID:", scheme);

  await con();
  const data = await FWM.findById(scheme);
  console.log(data);

  if (!data) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(data);
}
