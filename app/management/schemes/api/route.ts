import { NextResponse } from "next/server";
import con from "@/lib/conn"
import FWM from "@/models/FarmerWelfare"
import WWM from "@/models/WomenWelfare"
import SEM from "@/models/SecondaryEducation"
import HEM from "@/models/HigherEducation"

export async function GET() {
  con();

 try {
  const ww = await WWM.find().select("_id title shortName detailedPage category keyInfo ");
  const fw = await FWM.find().select("_id title shortName detailedPage category keyInfo ");
  const se = await SEM.find().select("_id title shortName detailedPage category keyInfo");
  const he = await HEM.find().select("_id title shortName detailedPage category keyInfo ");

  const allSchemes = [
    ...ww.map(item => ({ ...item.toObject(), type: "WW" })),
    ...fw.map(item => ({ ...item.toObject(), type: "FW" })),
    ...se.map(item => ({ ...item.toObject(), type: "SE" })),
    ...he.map(item => ({ ...item.toObject(), type: "HE" })),
  ];

  return NextResponse.json(allSchemes);
} catch (error) {
  return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
}
}
