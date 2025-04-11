import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "K-Working",
    description: "Dein flexibles & zentrales Büro in Offenbach",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="font-chicago">{children}</body>
        </html>
    );
}
