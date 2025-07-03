import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Admin from "@/models/Admin.model";

export async function GET() {
  try {
    await connectToDB();
    const admins = await Admin.find({});
    return NextResponse.json(admins);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch admins ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDB();

    const updateData = await req.json();

    // Prevent the _id from being updated from the body
    if (updateData._id) {
      delete updateData._id;
    }

    // Find the first admin document
    const firstAdmin = await Admin.findOne({});
    if (!firstAdmin) {
      return NextResponse.json({ error: "No admin found" }, { status: 404 });
    }

    // Update the first admin with the provided data
    Object.assign(firstAdmin, updateData);
    await firstAdmin.save();

    return NextResponse.json(firstAdmin);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to update Admin: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
