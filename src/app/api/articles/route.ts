import { connectToDB } from "@/lib/mongoose";
import Article from "@/models/Articles.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const articles = await Article.find({});
    // console.log(articles);
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch articles ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const data = await req.json();
    const newTestimonial = await Article.create(data);
    return NextResponse.json(newTestimonial);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create Article: ${error}` },
      { status: 500 }
    );
  }
}

