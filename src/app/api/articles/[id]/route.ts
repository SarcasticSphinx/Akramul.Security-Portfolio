import { connectToDB } from "@/lib/mongoose";
import Article from "@/models/Articles.model"; // Ensure this path is correct
import { NextRequest, NextResponse } from "next/server";

// PUT request handler for /api/articles/[id]
export async function PUT(req: NextRequest) {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // extract [id]

    // Basic validation for ID presence
    if (!id) {
      console.error("PUT (Article): ID is missing in URL parameters.");
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updateData = await req.json(); // Get the update data from the request body

    // It's good practice to prevent the _id from being updated from the body,
    // as the primary ID comes from the URL. Mongoose often ignores it, but explicit is better.
    if (updateData._id) {
      delete updateData._id;
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      id, // Use the ID from the URL to find the document
      updateData, // The data to update
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose schema validators on the update
      }
    );

    if (!updatedArticle) {
      console.warn(`PUT (Article): Article with ID ${id} not found.`);
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    console.log(`PUT (Article): Article with ID ${id} updated successfully.`);
    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error(
      `PUT (Article): Failed to update Article with ID ${"N/A"}:`,
      error
    );
    return NextResponse.json(
      {
        error: `Failed to update Article: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}

// DELETE request handler for /api/articles/[id]
export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // extract [id]

    // Basic validation for ID presence
    if (!id) {
      console.error("DELETE (Article): ID is missing in URL parameters.");
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      console.warn(`DELETE (Article): Article with ID ${id} not found.`);
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    console.log(
      `DELETE (Article): Article with ID ${id} deleted successfully.`
    );
    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error(
      `DELETE (Article): Failed to delete Article with ID ${"N/A"}:`,
      error
    );
    return NextResponse.json(
      {
        error: `Failed to delete Article: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
