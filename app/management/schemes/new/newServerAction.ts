"use server";

import { SchemeFormData } from "./page";
import { IRequiredDocument, IFaq } from "@/app/(common)/detailedScheme";
import { v2 as cloudinary } from "cloudinary";
import connection from "@/lib/conn";
import farmerWelfare from "@/models/FarmerWelfare";
import womenWelfare from "@/models/WomenWelfare";
import secondaryEducation from "@/models/SecondaryEducation";
import higherEducation from "@/models/HigherEducation";

const modelMap = {
  farmer: farmerWelfare,
  women: womenWelfare,
  secondary: secondaryEducation,
  higher: higherEducation,
} as const;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

function parseJSON<T>(value: FormDataEntryValue | null): T {
  if (!value || typeof value !== "string") {
    throw new Error("Invalid JSON field");
  }
  return JSON.parse(value) as T;
}

export default async function newServerAction(formData: FormData): Promise<void> {
  await connection();
 
  //Identify the module
  const group = formData.get("group") as keyof typeof modelMap;
  const Model = modelMap[group];

  if (!Model) {
    throw new Error("Invalid group");
  }

  //Image upload 

  const imageFile = formData.get("image");

  if (!(imageFile instanceof File) || imageFile.size === 0) {
    throw new Error("Image is required");
  }

  const buffer = Buffer.from(await imageFile.arrayBuffer());

  const uploadResult = await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "scheme-images" }, (err, result) => {
          if (err || !result) reject(err);
          else resolve(result as { secure_url: string });
        })
        .end(buffer);
    }
  );


  // Parse eligibility (contains both eligible and nonEligible)
  const eligibilityData = parseJSON<{
    eligible: string[];
    nonEligible: string[];
  }>(formData.get("eligibility"));

  // Parse application process (contains both online and offline)
  const applicationProcessData = parseJSON<{
    online: string[];
    offline: string[];
  }>(formData.get("applicationProcess"));

  const schemeData: SchemeFormData = {
    title: formData.get("title") as string,
    shortName: formData.get("shortName") as string,
    shortDescription: formData.get("shortDescription") as string,
    detailedDescription: parseJSON<string[]>(
      formData.get("detailedDescription")
    ),
    portalLink: formData.get("portalLink") as string,
    imageUrl: uploadResult.secure_url,
    launchedYear: formData.get("launchedYear") as string,
    category: group,
    detailedPage: "/v/v",
    icon: formData.get("icon") as string,
    keyInfo: {
      duration: formData.get("duration") as string,
      amount: formData.get("amount") as string,
      applyFrom: formData.get("applyFrom") as string,
      lastDate: formData.get("lastDate") as string,
    },
    benefits: parseJSON<string[]>(formData.get("benefits")),
    eligibilityCriteria: eligibilityData.eligible, 
    nonEligible: eligibilityData.nonEligible,
    requiredDocuments: parseJSON<IRequiredDocument[]>(
      formData.get("documents") 
    ),
    applicationProcess: applicationProcessData,
    faqs: parseJSON<IFaq[]>(formData.get("faqs")),
  };

  await Model.create(schemeData);
}