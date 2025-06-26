import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Testimonial from "@/models/Testimonial.model";

export async function GET() {
  try {
    await connectToDB();
    const testimonials = await Testimonial.find({});
    console.log(testimonials)
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch testimonials ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const data = await req.json();
    const newTestimonial = await Testimonial.create(data);
    return NextResponse.json(newTestimonial);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
