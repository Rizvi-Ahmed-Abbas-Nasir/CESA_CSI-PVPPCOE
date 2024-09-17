import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import connectMongoDB from "@/lib/db";
import { isApiValid } from "@/lib/function";
import RegisterModel from "@/models/register";  // Ensure this path is correct

export async function POST(req) {
    try {
        // Uncomment and implement API key validation if needed
        // const apiKey = req.headers.get("Authorization");
        // if (!isApiValid(apiKey)) {
        //     return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        // }

        // Connect to MongoDB
        try {
            await connectMongoDB();
        } catch (dbError) {
            console.error("Database connection failed:", dbError.message);
            return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
        }

        // Parse request data
        const data = await req.json();
        const { StudentName, StudentEmail, StudentPassword } = data;

        // Input validation
        if (!StudentName || !StudentEmail || !StudentPassword) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Additional validation
        if (typeof StudentEmail !== 'string' || StudentEmail.trim() === '') {
            return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
        }

        // Check if email is already in use
        try {
            const existingUser = await RegisterModel.findOne({ StudentEmail });
            if (existingUser) {
                return NextResponse.json({ message: "Email already in use" }, { status: 400 });
            }
        } catch (findError) {
            console.error("Error checking existing email:", findError.message);
            return NextResponse.json({ message: "Error checking existing email" }, { status: 500 });
        }

        // Hash the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(StudentPassword, 10);
        } catch (hashError) {
            console.error("Password hashing failed:", hashError.message);
            return NextResponse.json({ message: "Password hashing failed" }, { status: 500 });
        }

        // Create a new student record and save it using .create()
        try {
            await RegisterModel.create({
                StudentName,
                StudentEmail,
                StudentPassword: hashedPassword
            });
        } catch (saveError) {
            console.error("Failed to save student record:", saveError.message);
            return NextResponse.json({ message: "Failed to save student record" }, { status: 500 });
        }

        return NextResponse.json(
            { message: "Student Record Added Successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Server Error:", error.message);
        return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
    }
}
