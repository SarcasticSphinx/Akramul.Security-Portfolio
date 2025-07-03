import { connectToDB } from "@/lib/mongoose";
import Service from "@/models/Service.model"; // Ensure this path is correct
import { NextRequest, NextResponse } from "next/server";

// PUT request handler for /api/services/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } } // Get the dynamic ID from the URL parameters
) {
  try {
    await connectToDB();
    const { id } = params; // Extract the ID from the URL

    // Basic validation for ID presence
    if (!id) {
      console.error("PUT (Service): ID is missing in URL parameters.");
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updateData = await req.json(); // Get the update data from the request body

    // It's good practice to prevent the _id from being updated from the body,
    // as the primary ID comes from the URL. Mongoose often ignores it, but explicit is better.
    if (updateData._id) {
      delete updateData._id;
    }

    const updatedService = await Service.findByIdAndUpdate(
      id, // Use the ID from the URL to find the document
      updateData, // The data to update
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose schema validators on the update
      }
    );

    if (!updatedService) {
      console.warn(`PUT (Service): Service with ID ${id} not found.`);
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    console.log(`PUT (Service): Service with ID ${id} updated successfully.`);
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error(
      `PUT (Service): Failed to update service with ID ${params.id || "N/A"}:`,
      error
    );
    return NextResponse.json(
      {
        error: `Failed to update service: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}

// DELETE request handler for /api/services/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } } // Get the dynamic ID from the URL parameters
) {
  try {
    await connectToDB();
    const { id } = params; // Extract the ID from the URL

    // Basic validation for ID presence
    if (!id) {
      console.error("DELETE (Service): ID is missing in URL parameters.");
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      console.warn(`DELETE (Service): Service with ID ${id} not found.`);
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    console.log(
      `DELETE (Service): Service with ID ${id} deleted successfully.`
    );
    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(
      `DELETE (Service): Failed to delete service with ID ${
        params.id || "N/A"
      }:`,
      error
    );
    return NextResponse.json(
      {
        error: `Failed to delete service: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
