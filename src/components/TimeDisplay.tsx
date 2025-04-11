"use client";

import { useState, useEffect } from "react";

export default function TimeDisplay() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showColon, setShowColon] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            setShowColon((prev) => !prev);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, "0");

        return `${formattedHours}${
            showColon ? ":" : " "
        }${formattedMinutes} ${ampm}`;
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="text-xs font-bold">
            {formatTime(currentTime)} {formatDate(currentTime)}
        </div>
    );
}
