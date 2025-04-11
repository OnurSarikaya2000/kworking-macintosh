"use client";

export interface MenuItem {
    label: string;
    action?: () => void;
    disabled?: boolean;
    shortcut?: string;
    separator?: boolean;
}

interface MenuProps {
    items: MenuItem[];
    isOpen: boolean;
    onClose: () => void;
    position?: "left" | "right";
    className?: string;
}

export default function Menu({
    items,
    isOpen,
    onClose,
    position = "left",
    className = "",
}: MenuProps) {
    if (!isOpen) return null;

    return (
        <div
            className={`fixed top-[25px] ${
                position === "left" ? "left-0" : "right-0"
            } 
                bg-white border border-black shadow-md w-48 z-[1000] ${className}`}
        >
            <div className="py-1">
                {items.map((item, index) =>
                    item.separator ? (
                        <div
                            key={`separator-${index}`}
                            className="border-t border-gray-300 my-1"
                        ></div>
                    ) : (
                        <div
                            key={index}
                            onClick={() => {
                                if (!item.disabled && item.action) {
                                    item.action();
                                    onClose();
                                }
                            }}
                            className={`px-4 py-1 text-xs flex justify-between items-center
                                ${
                                    item.disabled
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "hover:bg-blue-600 hover:text-white cursor-pointer"
                                }`}
                        >
                            <span>{item.label}</span>
                            {item.shortcut && (
                                <span className="text-gray-500 text-[10px]">
                                    {item.shortcut}
                                </span>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
