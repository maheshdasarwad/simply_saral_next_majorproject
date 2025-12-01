import mongoose from "mongoose";

const requiredDocumentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    officialLink: { type: String },
    videoGuide: { type: String },
    importance: { type: String, enum: ["High", "Medium", "Low"] },
  },
  { _id: false }
);

const applicationProcessSchema = new mongoose.Schema(
  {
    online: [{ type: String }],
    offline: [{ type: String }],
  },
  { _id: false }
);

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const keyInfoSchema = new mongoose.Schema(
  {
    duration: { type: String, required: true },
    amount: { type: String, required: true },
    applyFrom: { type: String },
    lastDate: { type: String },
  },
  { _id: false }
);

// Farmer Welfare schema aligned with WW style

const FWSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortName: { type: String, required: true },        
  keyInfo: keyInfoSchema,                            
  shortDescription: { type: String, required: true },
  detailedDescription: [{ type: String }],           
  portalLink: { type: String, required: true },
  benefits: [{ type: String }],
  eligibilityCriteria: [{ type: String }],
  nonEligible: [{ type: String }],
  requiredDocuments: [requiredDocumentSchema],
  applicationProcess: applicationProcessSchema,
  faqs: [faqSchema],
  imageUrl: { type: String },
  launchedYear: { type: Number },                     
  category: { type: String },
  detailedPage: { type: String },
  icon: { type: String },
});

const FWModel =
  mongoose.models.FWModel || mongoose.model("FWModel", FWSchema);

export default FWModel;
