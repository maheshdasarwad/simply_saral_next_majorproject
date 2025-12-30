export const dynamic = "force-dynamic";
export const revalidate = 3600;

import SchemeDetailPage, { IWW } from "../../../../(common)/detailedScheme";
import con from "@/lib/conn";
import FWM from "@/models/FarmerWelfare";
import { notFound } from "next/navigation";

export default async function LadkiBahinPage({params,}: {params: { scheme: string };
}) {

  await con();
  const {scheme}=await params;
  const data = await FWM.findById(scheme).lean();

  if (!data) {
    notFound();
  }

  const SCHEME_DATA = JSON.parse(JSON.stringify(data)) as IWW;
  
  return <SchemeDetailPage IWW={SCHEME_DATA} module="farmer_schemes"/>;
}
