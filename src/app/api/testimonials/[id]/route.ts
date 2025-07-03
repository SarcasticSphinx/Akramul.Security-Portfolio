import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Testimonial from "@/models/Testimonial.model"; // Ensure this path is correct

// PUT request handler for /api/testimonials/[id]
export async function PUT(req: NextRequest) {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // extract [id]
    // Basic validation for ID presence
    if (!id) {
      console.error("PUT: ID is missing in URL parameters.");
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updateData = await req.json(); // Get the update data from the request body

    // It's good practice to prevent the _id from being updated from the body,
    // as the primary ID comes from the URL. Mongoose often ignores it, but explicit is better.
    if (updateData._id) {
      delete updateData._id;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id, // Use the ID from the URL to find the document
      updateData, // The data to update
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose schema validators on the update
      }
    );

    if (!updatedTestimonial) {
      console.warn(`PUT: Testimonial with ID ${id} not found.`);
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    console.log(`PUT: Testimonial with ID ${id} updated successfully.`);
    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    console.error(`PUT: Failed to update Testimonial with ID ${"N/A"}:`, error);
    return NextResponse.json(
      {
        error: `Failed to update Testimonial: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}

// DELETE request handler for /api/testimonials/[id]
export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // extract [id]
    // Basic validation for ID presence
    if (!id) {
      console.error("DELETE: ID is missing in URL parameters.");
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      console.warn(`DELETE: Testimonial with ID ${id} not found.`);
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    console.log(`DELETE: Testimonial with ID ${id} deleted successfully.`);
    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error(
      `DELETE: Failed to delete Testimonial with ID ${"N/A"}:`,
      error
    );
    return NextResponse.json(
      {
        error: `Failed to delete Testimonial: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
