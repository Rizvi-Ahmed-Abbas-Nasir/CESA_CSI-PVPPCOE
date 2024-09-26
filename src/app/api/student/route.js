import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/db";
import { isApiValid } from "@/lib/function";
import Student from "@/models/student";

// Function to update the about section
export async function PUT(req) {
  try {
    // const apiKey = await req.headers.get("Authorization"); // Extract API key from header

    // if (!isApiValid(apiKey)) {
    //   return NextResponse.json("Unauthorized", { status: 401 });
    // }

    await connectMongoDB();
    const data = await req.json();
    const { userId, name, vid, class: className, batch, div, sem, image } = data;

    // Find the student document by userId
    const userStudent = await Student.findOne({ userId }); // Ensure the field name matches the schema

    if (!userStudent) {
      return NextResponse.json("Student not found", { status: 404 });
    }

    // Update the student document
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: userStudent._id }, // Use the _id from the found student
      { name, vid, class: className, batch, div, sem, image }, // Update data
      { new: true, runValidators: true } // Options: return the updated document, run validation
    );

    return NextResponse.json(
      { message: "About Updated Successfully", updatedStudent },
      { status: 200 }
    );
  } catch (error) {
   console.error("Error updating:", error);
return NextResponse.json("Error Updating Document: " + error.message, { status: 500 });

  }
}
