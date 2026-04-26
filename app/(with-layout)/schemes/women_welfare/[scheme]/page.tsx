import SchemeDetailPage from "../../../../(common)/detailedScheme"; 
import { IWW } from "../../../../(common)/detailedScheme";
import axios from "axios";


  export default async function WWPage({ params }: { params:Promise< { scheme: string }>}) {
  const {scheme}=await params;
  const response = await axios.get(`http://localhost:3000/schemes/women_welfare/${scheme}/api`);
  const schemes = response.data;
  const SCHEME_DATA:IWW=schemes;
  console.log("Farmer schemes loaded:", schemes);

  return <SchemeDetailPage IWW={SCHEME_DATA} />;
}
 