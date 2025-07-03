import { connectToDB } from "@/lib/mongoose";
import Experience from "@/models/Experience.model";
import { NextRequest, NextResponse } from "next/server";

// PUT request handler for /api/experiences/[id]
export async function PUT(req: NextRequest) {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // extract [id]
    // Ensure an ID is present (though Next.js usually handles this by not matching the route if no ID is there)
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updateData = await req.json(); // Get the update data from the request body

    // Optional: If _id is sent in updateData from frontend, it's good practice to remove it
    // as the ID for the update comes from the URL. Mongoose usually ignores it, but it's cleaner.
    if (updateData._id) {
      delete updateData._id;
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      id, // Use the ID from the URL params to find the document
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update operations
      }
    );

    if (!updatedExperience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedExperience);
  } catch (error) {
    console.error("Error updating experience:", error); // Log the error for debugging
    return NextResponse.json(
      {
        error: `Failed to update experience: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}

// DELETE request handler for /api/experiences/[id]
export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // extract [id]
    if (!id) {
      // Again, Next.js typically handles this by not matching the route, but a check is harmless.
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedExperience = await Experience.findByIdAndDelete(id);

    if (!deletedExperience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error); // Log the error for debugging
    return NextResponse.json(
      {
        error: `Failed to delete Experience: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
