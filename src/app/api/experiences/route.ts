import { connectToDB } from "@/lib/mongoose";
import Experience from "@/models/Experience.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const experiences = await Experience.find({});
    // console.log(experiences);
    console.log("received request from admin route");
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch experiences ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const data = await req.json();
    const newExperience = await Experience.create(data);
    return NextResponse.json(newExperience);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create Experience: ${error}` },
      { status: 500 }
    );
  }
}

