// app/signup/api/route.ts
import { NextRequest, NextResponse } from "next/server";

// In-memory storage for demo (replace with database in production)
const users: { fullName: string; email: string; password: string }[] = [];

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, password } = await req.json();

    // Validation
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    // Store user (in production, hash password and save to database)
    users.push({ fullName, email, password });

    // Generate token (in production, use proper JWT)
    const token = `demo-token-${Date.now()}`;

    // Set cookie
    const res = NextResponse.json(
      { success: true, message: "Account created successfully" },
      { status: 201 }
    );

    res.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}