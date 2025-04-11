"use client";

import Image from "next/image";

interface AboutWindowProps {
    onClose: () => void;
}

export default function AboutWindow({ onClose }: AboutWindowProps) {
    return (
        <div className="bg-white border border-black shadow-md w-[400px] h-[300px] flex flex-col">
            {/* Title Bar */}
            <div className="h-5 bg-[#c0c0c0] border-b border-black flex items-center justify-between px-1">
                <div className="flex-1 text-center text-xs font-bold">
                    About This Mac
                </div>
                <button
                    className="w-3 h-3 bg-white border border-black text-[8px] flex items-center justify-center leading-none cursor-pointer"
                    onClick={onClose}
                >
                    ×
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col items-center justify-center">
                <div className="mb-4">
                    <Image
                        src="/apple-logo.svg"
                        alt="Apple Logo"
                        width={64}
                        height={64}
                    />
                </div>
                <h1 className="text-xl font-bold mb-2">K-Working</h1>
                <p className="text-sm text-center mb-4">Version 1.0.0 (Beta)</p>
                <div className="text-xs text-center text-gray-600">
                    <p>© 2024 K-Working</p>
                    <p>All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
