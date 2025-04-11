"use client";

import { useState, useEffect } from "react";
import { Photo } from "../types";
import { Upload, Image as ImageIcon } from "lucide-react";

export default function PhotoLibrary() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pixelationLevel, setPixelationLevel] = useState(3);

    // Load photos on component mount
    useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = async () => {
        try {
            setError(null);
            const response = await fetch("/api/supabase");
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to load photos");
            }
            const data = await response.json();
            setPhotos(data);
        } catch (error) {
            console.error("Error loading photos:", error);
            setError(
                error instanceof Error ? error.message : "Failed to load photos"
            );
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset the input value to allow selecting the same file again
        e.target.value = "";

        // If already uploading, don't start another upload
        if (isUploading) {
            console.log("Upload already in progress, ignoring new upload");
            return;
        }

        setIsUploading(true);
        setError(null);

        let controller: AbortController | null = null;
        let timeout: NodeJS.Timeout | null = null;

        try {
            console.log("Starting image processing...");
            // Create pixelated version first
            const pixelatedUrl = await createPixelatedImage(
                file,
                pixelationLevel
            ).catch((error) => {
                throw new Error(`Failed to process image: ${error.message}`);
            });
            console.log("Image processing completed");

            // Prepare form data
            const formData = new FormData();
            formData.append("file", file);
            formData.append("pixelationLevel", pixelationLevel.toString());
            formData.append("pixelatedUrl", pixelatedUrl);

            // Upload to our API with timeout
            controller = new AbortController();
            timeout = setTimeout(() => {
                console.log("Upload timeout reached, aborting...");
                controller?.abort();
            }, 60000); // 60 second timeout

            console.log("Starting API upload...");
            const response = await fetch("/api/supabase", {
                method: "POST",
                body: formData,
                signal: controller.signal,
            });

            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            console.log("API upload completed, status:", response.status);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to upload photo");
            }

            // Reload photos
            console.log("Reloading photos...");
            await loadPhotos();
            console.log("Photos reloaded successfully");
        } catch (error) {
            console.error("Error in upload process:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to upload photo"
            );
        } finally {
            // Clean up any remaining timeouts
            if (timeout) {
                clearTimeout(timeout);
            }
            // Ensure we reset the uploading state
            setIsUploading(false);
            console.log("Upload process completed, isUploading set to false");
        }
    };

    const createPixelatedImage = async (
        file: File,
        pixelation: number
    ): Promise<string> => {
        return new Promise((resolve, reject) => {
            // Add a timeout to prevent hanging
            const timeout = setTimeout(() => {
                reject(new Error("Image processing timed out"));
            }, 30000); // 30 second timeout

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    try {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");
                        if (!ctx) {
                            clearTimeout(timeout);
                            reject(
                                new Error("Could not create canvas context")
                            );
                            return;
                        }

                        // Set canvas size to original image size
                        canvas.width = img.width;
                        canvas.height = img.height;

                        // Calculate pixel size based on pixelation level
                        const pixelSize = Math.max(
                            1,
                            Math.floor(img.width / (pixelation * 20))
                        );

                        // Disable image smoothing for crisp pixels
                        ctx.imageSmoothingEnabled = false;

                        // Draw the image at a smaller size first
                        const smallWidth = Math.ceil(img.width / pixelSize);
                        const smallHeight = Math.ceil(img.height / pixelSize);
                        ctx.drawImage(img, 0, 0, smallWidth, smallHeight);

                        // Draw the small image back to the original size
                        ctx.drawImage(
                            canvas,
                            0,
                            0,
                            smallWidth,
                            smallHeight,
                            0,
                            0,
                            canvas.width,
                            canvas.height
                        );

                        clearTimeout(timeout);
                        resolve(canvas.toDataURL());
                    } catch (error) {
                        clearTimeout(timeout);
                        reject(error);
                    }
                };
                img.onerror = () => {
                    clearTimeout(timeout);
                    reject(new Error("Failed to load image"));
                };
                img.src = e.target?.result as string;
            };
            reader.onerror = () => {
                clearTimeout(timeout);
                reject(new Error("Failed to read file"));
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Photo Library</h2>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer bg-white border border-black px-2 py-1">
                        <Upload size={16} />
                        <span className="text-sm">Upload Photo</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {isUploading && (
                <div className="mb-4 text-center">
                    <p>Uploading and processing image...</p>
                </div>
            )}

            <div className="grid grid-cols-3 gap-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                        <img
                            src={photo.pixelated_url}
                            alt="Pixelated"
                            className="w-full h-48 object-cover border border-black"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={() => window.open(photo.url, "_blank")}
                                className="bg-white text-black px-2 py-1 text-sm"
                            >
                                View Original
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
