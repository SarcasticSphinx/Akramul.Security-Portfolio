import { connectToDB } from "@/lib/mongoose";
import EducationAndCertification from "@/models/EducationAndCertification.model"; // Update the import
import { NextRequest, NextResponse } from "next/server";

// PUT request handler for /api/educationAndCertification/[id]
export async function PUT(req: NextRequest) {
    try {
        await connectToDB();
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop(); // extract [id]

        if (!id) {
            console.error("PUT (EducationAndCertification): ID is missing in URL parameters.");
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const updateData = await req.json();

        if (updateData._id) {
            delete updateData._id;
        }

        const updatedDoc = await EducationAndCertification.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedDoc) {
            console.warn(`PUT (EducationAndCertification): Document with ID ${id} not found.`);
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        console.log(`PUT (EducationAndCertification): Document with ID ${id} updated successfully.`);
        return NextResponse.json(updatedDoc);
    } catch (error) {
        console.error(
            `PUT (EducationAndCertification): Failed to update document with ID ${"N/A"}:`,
            error
        );
        return NextResponse.json(
            {
                error: `Failed to update document: ${
                    error instanceof Error ? error.message : String(error)
                }`,
            },
            { status: 500 }
        );
    }
}

// DELETE request handler for /api/educationAndCertification/[id]
export async function DELETE(req: NextRequest) {
    try {
        await connectToDB();
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop(); // extract [id]

        if (!id) {
            console.error("DELETE (EducationAndCertification): ID is missing in URL parameters.");
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const deletedDoc = await EducationAndCertification.findByIdAndDelete(id);

        if (!deletedDoc) {
            console.warn(`DELETE (EducationAndCertification): Document with ID ${id} not found.`);
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        console.log(
            `DELETE (EducationAndCertification): Document with ID ${id} deleted successfully.`
        );
        return NextResponse.json({ message: "Document deleted successfully" });
    } catch (error) {
        console.error(
            `DELETE (EducationAndCertification): Failed to delete document with ID ${"N/A"}:`,
            error
        );
        return NextResponse.json(
            {
                error: `Failed to delete document: ${
                    error instanceof Error ? error.message : String(error)
                }`,
            },
            { status: 500 }
        );
    }
}
