"use client";

import { useState, useRef, useEffect } from "react";
import { DesktopItemType } from "../types";

interface WindowProps {
    item: DesktopItemType;
    status: "opening" | "open";
    startPosition: { x: number; y: number };
    zIndex: number;
    onClose: () => void;
    onFocus: () => void;
}

export default function Window({
    item,
    status,
    startPosition,
    zIndex,
    onClose,
    onFocus,
}: WindowProps) {
    // Get default position once - don't reset when re-rendering
    const initialDefaultPosition = item.defaultPosition || { x: 50, y: 50 };
    const [position, setPosition] = useState(initialDefaultPosition);
    const [size, setSize] = useState(
        item.defaultSize || { width: 400, height: 300 }
    );
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState<
        "nw" | "ne" | "sw" | "se" | null
    >(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [hasAnimated, setHasAnimated] = useState(false);
    const windowRef = useRef<HTMLDivElement>(null);
    const dragPositionRef = useRef(position);
    const initialSizeRef = useRef(size);
    const initialPositionRef = useRef(position);
    const lastMouseRef = useRef({ x: 0, y: 0 });

    // Keep refs in sync with state
    useEffect(() => {
        initialSizeRef.current = size;
        initialPositionRef.current = position;
    }, [size, position]);

    // Track transition from 'opening' to 'open' to play animation only once
    useEffect(() => {
        if (status === "open" && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [status, hasAnimated]);

    // Handle drag start
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        // Bring window to front when clicking anywhere on it
        onFocus();

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

    // Handle window click
    const handleWindowClick = () => {
        // Bring window to front when clicked
        onFocus();
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

    // Handle resize start
    const handleResizeStart = (
        e: React.MouseEvent<HTMLDivElement>,
        direction: "nw" | "ne" | "sw" | "se"
    ) => {
        e.stopPropagation();
        e.preventDefault();
        onFocus();
        setIsResizing(true);
        setResizeDirection(direction);
        lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Handle resize
    useEffect(() => {
        if (!isResizing) return;

        const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            const deltaX = e.clientX - lastMouseRef.current.x;
            const deltaY = e.clientY - lastMouseRef.current.y;
            const newSize = { ...size };
            const newPosition = { ...position };

            switch (resizeDirection) {
                case "nw":
                    newSize.width = Math.max(200, size.width - deltaX);
                    newSize.height = Math.max(200, size.height - deltaY);
                    newPosition.x = position.x + deltaX;
                    newPosition.y = position.y + deltaY;
                    break;
                case "ne":
                    newSize.width = Math.max(200, size.width + deltaX);
                    newSize.height = Math.max(200, size.height - deltaY);
                    newPosition.y = position.y + deltaY;
                    break;
                case "sw":
                    newSize.width = Math.max(200, size.width - deltaX);
                    newSize.height = Math.max(200, size.height + deltaY);
                    newPosition.x = position.x + deltaX;
                    break;
                case "se":
                    newSize.width = Math.max(200, size.width + deltaX);
                    newSize.height = Math.max(200, size.height + deltaY);
                    break;
            }

            setSize(newSize);
            setPosition(newPosition);
            lastMouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            setResizeDirection(null);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing, resizeDirection, size, position]);

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
            onClick={handleWindowClick}
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
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
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

            {/* Resize Handles */}
            <div
                className="resize-handle resize-handle-nw absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
                onMouseDown={(e) => handleResizeStart(e, "nw")}
            />
            <div
                className="resize-handle resize-handle-ne absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
                onMouseDown={(e) => handleResizeStart(e, "ne")}
            />
            <div
                className="resize-handle resize-handle-sw absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
                onMouseDown={(e) => handleResizeStart(e, "sw")}
            />
            <div
                className="resize-handle resize-handle-se absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
                onMouseDown={(e) => handleResizeStart(e, "se")}
            />
        </div>
    );
}
