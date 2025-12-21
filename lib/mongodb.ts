// lib/db.ts
import mongoose from 'mongoose';
import FWModel from '@/models/FarmerWelfare';
import HEModel from '@/models/HigherEducation';
import SEModel from '@/models/SecondaryEducation';
import WWModel from '@/models/WomenWelfare';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Unified model mapping
const modelMap = {
  'farmer_schemes': FWModel,
  'higher_education': HEModel,
  'secondary_education': SEModel,
  'women_welfare': WWModel,
  'all': null // Will query all models
};

export function getModelByCategory(category: string) {
  const model = modelMap[category as keyof typeof modelMap];
  if (!model && category !== 'all') {
    throw new Error(`Invalid category: ${category}`);
  }
  return model;
}

// Get all categories
export function getAllCategories() {
  return Object.keys(modelMap).filter(key => key !== 'all');
}