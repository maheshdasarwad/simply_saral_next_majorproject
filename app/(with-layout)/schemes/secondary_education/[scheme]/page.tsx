export const dynamic = 'force-dynamic';
export const revalidate = 3600;
import SchemeDetailPage from "../../../../(common)/detailedScheme"; 
import { IWW } from "../../../../(common)/detailedScheme";
import con from "@/lib/conn.js";
import SEM from "@/models/SecondaryEducation.js";
import { notFound } from "next/navigation";

export default async function SEPage({ params }: { params:Promise< { scheme: string }>}) {
  await con()
  const {scheme}=await params;
  const data = await SEM.findById(scheme).lean();

    if (!data) {
      notFound();
    }

    const SCHEME_DATA = JSON.parse(JSON.stringify(data)) as IWW;
    
    return <SchemeDetailPage IWW={SCHEME_DATA} module="secondary_education"/>;
}
 