import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/db";
import { isApiValid } from "@/lib/function";
import Upcommingevets from "@/models/upcommingevets";
import streamifier from "streamifier";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const apiKey = req.headers.get("Authorization");
    console.log(apiKey)

    // Validate the API key
    if (!isApiValid(apiKey)) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }


    // Connect to MongoDB
    await connectMongoDB();

    // Parse form data
    const formData = await req.formData();

    // Extract fields from the form data
    const eventTitle = formData.get("eventTitle");
    const associateName = formData.get("associateName");
    const date = new Date(formData.get("date"));
    const eventType = formData.get("eventType");
    const description = formData.get("description");
    const websiteLink = formData.get("websiteLink");
    const selectedCategories = formData.getAll("selectedCategories");
    const eventImageFile = formData.get("eventImage");

    // Validate required fields
    if (!eventTitle || !associateName || !date || !eventType || !description) {
      return NextResponse.json(
        { message: "Missing required fields. Please ensure all fields are filled correctly." },
        { status: 400 }
      );
    }

    let eventImageUrl;

    // Process image file and upload to Cloudinary
    if (eventImageFile && eventImageFile instanceof Blob) {
      const buffer = Buffer.from(await eventImageFile.arrayBuffer());
      const stream = streamifier.createReadStream(buffer);

      try {
        eventImageUrl = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "events" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          stream.pipe(uploadStream);
        });
      } catch (imageUploadError) {
        console.error("Error uploading image to Cloudinary:", imageUploadError);
        return NextResponse.json(
          { message: "Error uploading image. Please try again later." },
          { status: 500 }
        );
      }
    }

    // Create a new event document
    const newEvent = new Upcommingevets({
      eventTitle,
      associateName,
      date,
      eventType,
      description,
      websiteLink,
      eventImage: eventImageUrl || undefined,
      selectedCategories: selectedCategories.length ? selectedCategories : [],
    });

    // Save the new event to the database
    const savedEvent = await newEvent.save();

    return NextResponse.json(
      { message: "Event created successfully!", event: savedEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Error creating event", error: error.message },
      { status: 500 }
    );
  }
}
