// app/api/schemes/route.ts - SIMPLIFIED VERSION
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable');
}

let cachedConnection: mongoose.Connection | null = null;

async function connectDB() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    cachedConnection = mongoose.connection;
    console.log('MongoDB connected successfully');
    return cachedConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Simple schema for testing
const TestSchema = new mongoose.Schema({
  title: String,
  shortName: String,
  category: String,
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  imageUrl: String,
  keyInfo: {
    duration: String,
    amount: String,
  },
});

const TestModel = mongoose.models.TestModel || mongoose.model('TestModel', TestSchema);

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    console.log('Fetching schemes...');
    
    // First, let's check if we have any data
    const count = await TestModel.countDocuments({});
    console.log(`Total documents: ${count}`);
    
    if (count === 0) {
      // Create some test data if none exists
      console.log('Creating test data...');
      await TestModel.create([
        {
          title: 'Test Farmer Scheme',
          shortName: 'TFS',
          category: 'farmer_schemes',
          isActive: true,
          imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
          keyInfo: {
            duration: '1 Year',
            amount: '₹50,000'
          }
        },
        {
          title: 'Test Education Scheme',
          shortName: 'TES',
          category: 'education',
          isActive: true,
          imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400',
          keyInfo: {
            duration: 'Academic Year',
            amount: '₹25,000'
          }
        }
      ]);
    }
    
    // Now fetch the data
    const schemes = await TestModel.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await TestModel.countDocuments({});
    
    // Transform the data
    const transformedSchemes = schemes.map(scheme => ({
      ...scheme,
      _id: scheme._id.toString(),
      createdAt: scheme.createdAt ? scheme.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: scheme.updatedAt ? scheme.updatedAt.toISOString() : new Date().toISOString(),
    }));
    
    console.log(`Returning ${transformedSchemes.length} schemes`);
    
    return NextResponse.json({
      schemes: transformedSchemes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      categories: ['farmer_schemes', 'education', 'women_welfare', 'higher_education'],
    });
    
  } catch (error) {
    console.error('Error in API route:', error);
    
    // Return proper JSON error
    return NextResponse.json(
      { 
        error: 'Failed to fetch schemes',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    console.log('Creating scheme:', body);
    
    const newScheme = await TestModel.create({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: body.isActive !== undefined ? body.isActive : true,
    });
    
    return NextResponse.json({
      success: true,
      scheme: {
        ...newScheme.toObject(),
        _id: newScheme._id.toString(),
      }
    });
    
  } catch (error) {
    console.error('Error creating scheme:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create scheme',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}