import SchemeDetailPage from "../../../../(common)/detailedScheme"; 
import { IWW } from "../../../../(common)/detailedScheme";
import axios from "axios";

export default async function SEPage({ params }: { params:Promise< { scheme: string }>}) {
  const {scheme}=await params;
  const response = await axios.get(`http://localhost:3000/schemes/secondary_education/${scheme}/api`);
  const schemes = response.data;
  const SCHEME_DATA:IWW=schemes;
  console.log("Secondary Education schemes loaded:", schemes);

  return <SchemeDetailPage IWW={SCHEME_DATA} />;
}
 