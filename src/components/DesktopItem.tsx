"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { DesktopItemType } from "../types";

interface DesktopItemProps {
    item: DesktopItemType;
    isSelected: boolean;
    onSelect: () => void;
    onOpen: () => void;
    onDragStart: (x: number, y: number) => void;
    onDragEnd: () => void;
    onDragMove: (x: number, y: number) => void;
}

export default function DesktopItem({
    item,
    isSelected,
    onSelect,
    onOpen,
    onDragStart,
    onDragEnd,
    onDragMove,
}: DesktopItemProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [lastClickTime, setLastClickTime] = useState(0);
    const itemRef = useRef<HTMLDivElement>(null);
    const [imgError, setImgError] = useState(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0) return; // Only handle left mouse button
        e.stopPropagation();
        onSelect();

        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        setDragOffset({ x: offsetX, y: offsetY });
        setIsDragging(true);
        onDragStart(e.clientX - offsetX, e.clientY - offsetY);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastClickTime;

        if (timeDiff < 300) {
            // Double click threshold (300ms)
            onOpen();
        }
        setLastClickTime(currentTime);
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            onDragMove(e.clientX - dragOffset.x, e.clientY - dragOffset.y);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            onDragEnd();
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, dragOffset, onDragMove, onDragEnd]);

    return (
        <div
            ref={itemRef}
            className={`desktop-item ${isSelected ? "selected" : ""} ${
                isDragging ? "dragging" : ""
            }`}
            style={{
                position: "absolute",
                left: `${item.position.x}px`,
                top: `${item.position.y}px`,
                cursor: isDragging ? "grabbing" : "pointer",
                width: "100px", // Fixed width for all items
            }}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
        >
            <div className="icon-container">
                {item.icon.startsWith("/") ? (
                    imgError ? (
                        <div className="w-12 h-12 bg-gray-200 flex items-center justify-center text-gray-400">
                            ?
                        </div>
                    ) : (
                        <Image
                            src={item.icon}
                            alt={item.title}
                            width={48}
                            height={48}
                            onError={() => setImgError(true)}
                        />
                    )
                ) : (
                    <div className="w-12 h-12 flex items-center justify-center text-2xl">
                        {item.icon}
                    </div>
                )}
            </div>
            <div className="title text-center px-1 max-w-full whitespace-normal break-words">
                {item.title}
            </div>
        </div>
    );
}
