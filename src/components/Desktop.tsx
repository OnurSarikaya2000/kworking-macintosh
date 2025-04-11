"use client";

import { useState } from "react";
import Image from "next/image";
import DesktopItem from "./DesktopItem";
import Window from "./Window";
import { DesktopItemType } from "../types";

interface DesktopProps {
    items: DesktopItemType[];
}

interface OpenWindowState {
    item: DesktopItemType;
    status: "opening" | "open";
    startPosition: { x: number; y: number };
}

export default function Desktop({ items }: DesktopProps) {
    const [openWindows, setOpenWindows] = useState<OpenWindowState[]>([]);
    const [windowInstanceCounter, setWindowInstanceCounter] = useState<
        Record<string, number>
    >({});

    const handleItemClick = (
        item: DesktopItemType,
        itemPosition: { x: number; y: number }
    ) => {
        // Don't open duplicates
        if (openWindows.find((window) => window.item.id === item.id)) {
            return;
        }

        // Create a unique instance counter for this window ID if it's first time opening
        if (windowInstanceCounter[item.id] === undefined) {
            setWindowInstanceCounter({
                ...windowInstanceCounter,
                [item.id]: 0,
            });
        } else {
            // Increment instance counter for this window ID
            setWindowInstanceCounter({
                ...windowInstanceCounter,
                [item.id]: windowInstanceCounter[item.id] + 1,
            });
        }

        // Start with 'opening' state - showing just a bounding box
        setOpenWindows([
            ...openWindows,
            {
                item,
                status: "opening",
                startPosition: itemPosition,
            },
        ]);

        // After a delay, change to 'open' to show full window with content
        setTimeout(() => {
            setOpenWindows((prev) =>
                prev.map((window) =>
                    window.item.id === item.id
                        ? { ...window, status: "open" }
                        : window
                )
            );
        }, 400); // Slightly longer than the CSS animation to ensure proper sequence
    };

    const handleCloseWindow = (id: string) => {
        setOpenWindows(openWindows.filter((window) => window.item.id !== id));
    };

    return (
        <div className="relative h-screen w-screen bg-[#d9d9d9] overflow-hidden">
            {/* Menu Bar */}
            <div className="h-6 w-full bg-white border-b border-black flex items-center px-2">
                <div className="flex space-x-1">
                    <Image
                        src="/apple-logo.svg"
                        alt="Apple"
                        width={12}
                        height={12}
                        className="mt-0.5"
                    />
                </div>
            </div>

            {/* Desktop Items */}
            <div className="p-4 grid grid-cols-6 gap-4">
                {items.map((item) => (
                    <DesktopItem
                        key={item.id}
                        item={item}
                        onClick={(position) => handleItemClick(item, position)}
                    />
                ))}
            </div>

            {/* Windows */}
            {openWindows.map((windowState, index) => (
                <Window
                    key={`${windowState.item.id}-${
                        windowInstanceCounter[windowState.item.id] || 0
                    }`}
                    item={windowState.item}
                    status={windowState.status}
                    startPosition={windowState.startPosition}
                    zIndex={100 + index}
                    onClose={() => handleCloseWindow(windowState.item.id)}
                />
            ))}
        </div>
    );
}
