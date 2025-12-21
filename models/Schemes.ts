// models/Scheme.ts
export interface IRequiredDocument {
  name: string;
  description: string;
  image?: string;
  officialLink?: string;
  videoGuide?: string;
  importance?: "High" | "Medium" | "Low";
}

export interface IApplicationProcess {
  online: string[];
  offline: string[];
}

export interface IFaq {
  question: string;
  answer: string;
}

export interface IKeyInfo {
  duration: string;
  amount: string;
  applyFrom?: string;
  lastDate?: string;
}

export interface IScheme {
  _id?: string;
  title: string;
  shortName: string;
  keyInfo: IKeyInfo;
  shortDescription: string;
  detailedDescription: string[];
  portalLink: string;
  benefits: string[];
  eligibilityCriteria: string[];
  nonEligible: string[];
  requiredDocuments: IRequiredDocument[];
  applicationProcess: IApplicationProcess;
  faqs: IFaq[];
  imageUrl: string;
  launchedYear: string;
  category: string;
  detailedPage: string;
  icon: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
}