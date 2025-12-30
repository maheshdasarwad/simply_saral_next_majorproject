import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import con from "@/lib/conn"
import FWM from "@/models/FarmerWelfare"
import WWM from "@/models/WomenWelfare"
import SEM from "@/models/SecondaryEducation"
import HEM from "@/models/HigherEducation"

export async function GET() {
  con();
  try {
    const client = await clerkClient(); 
    const users = await client.users.getUserList({
      limit: 1, // only need totalCount
    });
    const ww=await WWM.countDocuments();
    const fm=await FWM.countDocuments();
    const se=await SEM.countDocuments();
    const he=await HEM.countDocuments();
    return NextResponse.json({
      totalUsers: users.totalCount,schemecount:ww+fm+se+he
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
