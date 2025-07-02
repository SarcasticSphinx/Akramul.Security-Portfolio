import { connectToDB } from "@/lib/mongoose";
import Service from "@/models/Service.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const services = await Service.find({});
    // console.log(services);
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch services ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const data = await req.json();
    const newTestimonial = await Service.create(data);
    return NextResponse.json(newTestimonial);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create service: ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete service: ${error}` },
      { status: 500 }
    );
  }
}
