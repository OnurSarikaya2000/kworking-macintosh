"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import TimeDisplay from "./TimeDisplay";
import Menu from "./Menu";
import { MenuItem } from "./Menu";

interface MenuBarProps {
    onAboutClick: () => void;
}

export default function MenuBar({ onAboutClick }: MenuBarProps) {
    const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsAppleMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const appleMenuItems: MenuItem[] = [
        { label: "About K-Working", action: onAboutClick },
        { label: "System Preferences..." },
        { separator: true, label: "" },
        { label: "Restart" },
        { label: "Shut Down..." },
    ];

    return (
        <div className="h-6 w-full bg-white border-b border-black flex items-center justify-between p-2 relative z-[999]">
            <div className="flex space-x-2">
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsAppleMenuOpen(!isAppleMenuOpen);
                        }}
                        className="flex items-center space-x-1 hover:bg-gray-200 px-1 rounded"
                    >
                        <Image
                            src="/apple-logo.svg"
                            alt="Apple"
                            width={12}
                            height={12}
                        />
                    </button>

                    <Menu
                        items={appleMenuItems}
                        isOpen={isAppleMenuOpen}
                        onClose={() => setIsAppleMenuOpen(false)}
                    />
                </div>
                <p className="text-xs font-bold">K-Working</p>
            </div>
            <TimeDisplay />
        </div>
    );
}
