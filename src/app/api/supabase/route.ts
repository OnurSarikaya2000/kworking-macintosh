"use server";

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
);

// Helper function to get the public URL for a storage file
const getPublicUrl = (path: string) => {
    const { data } = supabase.storage.from("photos").getPublicUrl(path);
    return data.publicUrl;
};

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("photos")
            .select("*")
            .order("uploaded_at", { ascending: false });

        if (error) throw error;

        // Map the data to include public URLs
        const photosWithUrls = data.map((photo) => ({
            ...photo,
            url: getPublicUrl(photo.url),
        }));

        return NextResponse.json(photosWithUrls);
    } catch (error) {
        console.error("Error fetching photos:", error);
        return NextResponse.json(
            { error: "Failed to fetch photos", details: error },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        // Check if Supabase is properly configured
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
            throw new Error("Supabase configuration is missing");
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;
        const pixelationLevel = formData.get("pixelationLevel") as string;
        const pixelatedUrl = formData.get("pixelatedUrl") as string;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Check if the bucket exists, create it if it doesn't
        const { data: buckets, error: bucketListError } =
            await supabase.storage.listBuckets();
        if (bucketListError) throw bucketListError;

        if (!buckets?.some((bucket) => bucket.name === "photos")) {
            const { error: bucketError } = await supabase.storage.createBucket(
                "photos",
                {
                    public: false,
                }
            );
            if (bucketError) throw bucketError;
        }

        // Generate a unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}.${fileExt}`;

        // Upload original image
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("photos")
            .upload(fileName, file);

        if (uploadError) {
            console.error("Storage upload error:", uploadError);
            throw uploadError;
        }

        // Save to database
        const { error: dbError } = await supabase.from("photos").insert({
            url: fileName,
            pixelated_url: pixelatedUrl,
            uploaded_at: new Date().toISOString(),
            uploaded_by: "user",
        });

        if (dbError) {
            console.error("Database insert error:", dbError);
            throw dbError;
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in POST handler:", error);
        return NextResponse.json(
            {
                error: "Failed to upload photo",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
