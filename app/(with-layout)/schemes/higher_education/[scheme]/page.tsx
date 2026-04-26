import SchemeDetailPage from "../../../../(common)/detailedScheme"; 
import { IWW } from "../../../../(common)/detailedScheme";
import axios from "axios";



//     title: "Kisan Credit Card (KCC) Scheme – A Comprehensive Guide",
//     shortName: "KCC",
//     keyInfo: {
//       duration: "Up to 5 years",
//       amount: "Up to ₹3,00,000",
//       applyFrom: "1998",
//       lastDate: "As per bank",
//     },
//     shortDescription:
//       "The Kisan Credit Card (KCC) Scheme, launched in 1998, is a vital government initiative designed to provide farmers with timely and adequate credit support to meet their agricultural needs.",
//     portalLink: "https://rbi.org.in",
//     detailedDescription: [
//       "Launched in 1998 to provide timely and hassle-free credit support to farmers based on land holding and cropping pattern.",
//       "Short-term crop loan limit generally up to ₹3 lakh, with flexible limits based on land, crops, and scale of finance.",
//       "Typical interest rate around 7% per annum on crop loans, with additional interest subvention and prompt repayment incentives reducing effective rate for eligible farmers.",
//       "Card validity usually up to 5 years with periodic review and enhancement for rising costs or change in cropping pattern.",
//     ],
//     benefits: [
//       "Subsidized interest on crop loans, with government interest subvention and prompt repayment incentives lowering effective rates for eligible farmers.",
//       "Flexible repayment schedule aligned with crop harvest and marketing seasons, reducing stress on farmers’ cash flow.",
//       "Single KCC limit usable for crop production, post-harvest expenses, consumption needs, and allied activities such as dairy, poultry, and fisheries.",
//       "Simplified and recurrent access to working capital through a revolving credit facility instead of repeated loan applications.",
//     ],
//     eligibilityCriteria: [
//       "Individuals or joint borrowers who are owner-cultivators of agricultural land.",
//       "Tenant farmers, oral lessees and sharecroppers as per bank and state guidelines.",
//       "Age generally between 18 and 75 years, with a co-borrower required if above upper age limit as per bank norms.",
//     ],
//     nonEligible: [
//       "Borrowers with willful default or adverse credit history as per bank appraisal.",
//       "Activities not related to agriculture or allied sectors, as per scheme guidelines.",
//     ],
//     requiredDocuments: [
//       {
//         name: "Identity Proof",
//         description:
//           "Valid government-issued photo identity document of the farmer (e.g. Aadhaar, voter ID, PAN).",
//         image: "/Images/farmer_welf/kcc-id-proof.jpg",
//         officialLink: "https://uidai.gov.in",
//         videoGuide: "",
//         importance: "High",
//       },
//       {
//         name: "Address Proof",
//         description:
//           "Document confirming the current residential address of the farmer (e.g. ration card, utility bill, voter ID).",
//         image: "/Images/farmer_welf/kcc-address-proof.jpg",
//         officialLink: "https://www.india.gov.in",
//         videoGuide: "",
//         importance: "High",
//       },
//       {
//         name: "Land Ownership Proof",
//         description:
//           "Land records or other documents showing cultivable land or tenancy rights in the farmer’s name as per bank norms.",
//         image: "/Images/farmer_welf/kcc-land-proof.jpg",
//         officialLink: "https://bhulekh.mahabhumi.gov.in",
//         videoGuide: "",
//         importance: "High",
//       },
//       {
//         name: "Photographs",
//         description:
//           "Recent passport-sized photographs of the farmer as required by the bank.",
//         image: "/Images/farmer_welf/kcc-photo.jpg",
//         officialLink: "",
//         videoGuide: "",
//         importance: "Medium",
//       },
//       {
//         name: "Bank Account Details",
//         description:
//           "First page of bank passbook or statement showing account number, IFSC and farmer’s name.",
//         image: "/Images/farmer_welf/kcc-bank.jpg",
//         officialLink: "",
//         videoGuide: "",
//         importance: "High",
//       },
//     ],
//     applicationProcess: {
//       online: [
//         "Visit the eligible bank’s online portal or Kisan Rin related portal if available.",
//         "Register or log in and select the Kisan Credit Card (KCC) application option.",
//         "Fill out the application form with personal, landholding, and cropping details.",
//         "Upload KYC documents, land records, and bank account details as required.",
//         "Submit the application and track sanction status through the portal or SMS alerts.",
//       ],
//       offline: [
//         "Visit a nearby bank branch that offers Kisan Credit Card services.",
//         "Collect and fill out the KCC application form with details of landholding and crops grown.",
//         "Attach required documents including identity proof, address proof, land ownership records, and bank account details.",
//         "Submit the application to the bank officer for appraisal and verification.",
//         "Await sanction, execution of documents, and issuance of the Kisan Credit Card cum passbook or Rupay card.",
//       ],
//     },
//     faqs: [
//       {
//         question: "What is the maximum loan limit under KCC for crop loans?",
//         answer:
//           "KCC crop loan limits are typically fixed based on landholding, cropping pattern, and scale of finance, and many banks permit limits up to about ₹3 lakh for short-term crop credit, subject to internal policy.",
//       },
//       {
//         question: "Is collateral required for KCC?",
//         answer:
//           "Collateral requirements depend on the loan amount and bank guidelines; loans up to specified thresholds may be eligible for collateral-free coverage under applicable schemes.",
//       },
//     ],
//     imageUrl: "/Images/farmer_welf/kisan_Credit_Card.jpg",
//     launchedYear: 1998,
//     category: "Credit & Loan Schemes",
//     detailedPage: "/schemes/kisan-credit-card",
//     icon: "Banknote",
//   };

  export default async function LadkiBahinPage({ params }: { params:Promise< { scheme: string }>}) {
  const {scheme}=await params;
  const response = await axios.get(`http://localhost:3000/schemes/higher_education/${scheme}/api`);
  const schemes = response.data;
  const SCHEME_DATA:IWW=schemes;
  console.log("HigherEducation schemes loaded:", schemes);

  return <SchemeDetailPage IWW={SCHEME_DATA} />;
}
 