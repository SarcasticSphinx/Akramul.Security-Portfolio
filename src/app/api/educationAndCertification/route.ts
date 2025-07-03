    import EducationAndCertification from "@/models/EducationAndCertification.model";
    import { connectToDB } from "@/lib/mongoose";
    import { NextRequest, NextResponse } from "next/server";


    export async function GET() {
    try {
        await connectToDB();
        const educationAndCertification = await EducationAndCertification.find({});
        // console.log(experiences);
        console.log("received request from admin route");
        return NextResponse.json(educationAndCertification);
    } catch (error) {
        return NextResponse.json(
        { error: `Failed to fetch educationAndCertification ${error}` },
        { status: 500 }
        );
    }
    }

    export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const data = await req.json();
        const newEducationAndCertification = await EducationAndCertification.create(data);
        return NextResponse.json(newEducationAndCertification);
    } catch (error) {
        return NextResponse.json(
        { error: `Failed to create Experience: ${error}` },
        { status: 500 }
        );
    }
    }

