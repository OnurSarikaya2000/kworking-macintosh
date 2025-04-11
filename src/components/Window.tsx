"use client";

import { useState, useRef, useEffect } from "react";
import { DesktopItemType } from "../types";

interface WindowProps {
    item: DesktopItemType;
    status: "opening" | "open";
    startPosition: { x: number; y: number };
    zIndex: number;
    onClose: () => void;
}

export default function Window({
    item,
    status,
    startPosition,
    zIndex,
    onClose,
}: WindowProps) {
    // Get default position once - don't reset when re-rendering
    const initialDefaultPosition = item.defaultPosition || { x: 50, y: 50 };
    const [position, setPosition] = useState(initialDefaultPosition);

    // Store size as a ref to avoid reset on re-render
    const [size] = useState(item.defaultSize || { width: 400, height: 300 });

    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [hasAnimated, setHasAnimated] = useState(false);
    const windowRef = useRef<HTMLDivElement>(null);
    const dragPositionRef = useRef(position);

    // Keep the ref updated with latest position
    useEffect(() => {
        dragPositionRef.current = position;
    }, [position]);

    // Track transition from 'opening' to 'open' to play animation only once
    useEffect(() => {
        if (status === "open" && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [status, hasAnimated]);

    // Handle drag start
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only allow dragging from the title bar
        if (
            !(e.target instanceof HTMLElement) ||
            !e.target.closest(".window-title-bar") ||
            status === "opening"
        ) {
            return;
        }

        if (windowRef.current) {
            const rect = windowRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
            setIsDragging(true);

            // Prevent text selection during drag
            e.preventDefault();
        }
    };

    // Handle dragging
    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            requestAnimationFrame(() => {
                const newPosition = {
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y,
                };
                setPosition(newPosition);
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    // Calculate animation properties based on status
    const getAnimationStyles = () => {
        if (status === "opening") {
            // Starting position - a small box at the icon
            return {
                left: `${startPosition.x - 25}px`,
                top: `${startPosition.y - 25}px`,
                width: "50px",
                height: "50px",
                opacity: 0.8,
                transform: "scale(0.8)",
            };
        }

        // Final position - use the current position
        return {
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${size.width}px`,
            height: `${size.height}px`,
            opacity: 1,
            transform: "none",
            transition: isDragging ? "none" : "all 0.3s ease-out",
        };
    };

    const animationStyles = getAnimationStyles();
    const windowClass = `absolute bg-white border border-black shadow-md overflow-hidden ${
        status === "open" && !isDragging && !hasAnimated ? "window-opening" : ""
    }`;

    return (
        <div
            ref={windowRef}
            className={windowClass}
            style={{
                ...animationStyles,
                zIndex,
                cursor: isDragging ? "grabbing" : "default",
            }}
        >
            {/* Window Title Bar */}
            <div
                className="window-title-bar h-5 bg-[#c0c0c0] border-b border-black flex items-center justify-between px-1"
                onMouseDown={handleMouseDown}
            >
                <div className="flex-1 text-center text-xs font-bold">
                    {item.title}
                </div>
                <button
                    className="w-3 h-3 bg-white border border-black text-[8px] flex items-center justify-center leading-none"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>

            {/* Window Content */}
            <div
                className="window-content p-2 overflow-auto"
                style={{
                    height: "calc(100% - 20px)",
                    opacity: status === "opening" ? 0 : 1,
                    transition: "opacity 0.2s ease-in",
                    transitionDelay: "0.3s",
                }}
            >
                {item.content}
            </div>
        </div>
    );
}
