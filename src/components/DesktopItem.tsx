"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { DesktopItemType } from "../types";

interface DesktopItemProps {
    item: DesktopItemType;
    onClick: (position: { x: number; y: number }) => void;
}

export default function DesktopItem({ item, onClick }: DesktopItemProps) {
    const itemRef = useRef<HTMLDivElement>(null);
    const [imgError, setImgError] = useState(false);

    const handleClick = () => {
        if (itemRef.current) {
            const rect = itemRef.current.getBoundingClientRect();
            // Get the center of the icon
            onClick({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            });
        } else {
            // Fallback if ref not available
            onClick({ x: 0, y: 0 });
        }
    };

    return (
        <div
            ref={itemRef}
            className="flex flex-col items-center cursor-pointer group"
            onClick={handleClick}
        >
            <div className="h-12 w-12 mb-1 flex items-center justify-center">
                {item.icon.startsWith("/") ? (
                    imgError ? (
                        <div className="h-12 w-12 bg-[#888888] flex items-center justify-center text-white text-sm">
                            ?
                        </div>
                    ) : (
                        <Image
                            src={item.icon}
                            alt={item.title}
                            width={48}
                            height={48}
                            className="max-h-full max-w-full object-contain"
                            onError={() => setImgError(true)}
                        />
                    )
                ) : (
                    <div className="h-12 w-12 bg-[#c0c0c0] border border-black flex items-center justify-center text-xl">
                        {item.icon}
                    </div>
                )}
            </div>
            <span className="text-xs text-black text-center bg-white px-1 group-hover:bg-black group-hover:text-white">
                {item.title}
            </span>
        </div>
    );
}
