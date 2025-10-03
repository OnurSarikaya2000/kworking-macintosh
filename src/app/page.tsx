import Desktop from "../components/Desktop";
import { DesktopItemType } from "../types";

// Beispielhafte Desktop-Elemente
const desktopItems: DesktopItemType[] = [
    {
        id: "k-working-website",
        title: "K-Working",
        icon: "/icons/browser.png",
        type: "browser",
        position: { x: 80, y: 80 },
        defaultPosition: { x: 80, y: 80 },
        defaultSize: { width: 1000, height: 600 },
        content: "https://k-working.de",
    },
    {
        id: "pakete",
        title: "Pakete",
        icon: "/icons/packages.png",
        type: "folder",
        position: { x: 150, y: 150 },
        defaultPosition: { x: 150, y: 150 },
        defaultSize: { width: 350, height: 470 },
        content: (
            <div>
                <h2 className="text-lg font-bold mb-2">Unsere Angebote</h2>
                <ul className="space-y-2">
                    <li className="border-b pb-1">
                        <strong>Tageskarte:</strong> 18,00 € – Kaffee, Tee &
                        Wasser Flat, WLAN, Druckerzugang, Küchenzugang
                    </li>
                    <li className="border-b pb-1">
                        <strong>Flexibler Arbeitsplatz:</strong> 259,00 €/Monat
                        – Immer ein freier Platz für dich, inklusive aller
                        Annehmlichkeiten
                    </li>
                    <li className="border-b pb-1">
                        <strong>Fester Schreibtisch:</strong> 399,00 €/Monat –
                        Dein eigener Schreibtisch, den du jederzeit nutzen
                        kannst
                    </li>
                    <li className="border-b pb-1">
                        <strong>Virtuelles Büro:</strong> 99,00 €/Monat –
                        Geschäftsadresse und Briefkastenservice
                    </li>
                </ul>
                <div className="mt-4">
                    <a
                        href="https://www.k-working.de/plans-pricing/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                    >
                        Jetzt Buchen
                    </a>
                </div>
            </div>
        ),
    },
    {
        id: "oeffnungszeiten",
        title: "Zeiten",
        icon: "/icons/clock.png",
        type: "folder",
        position: { x: 200, y: 200 },
        defaultPosition: { x: 200, y: 200 },
        defaultSize: { width: 300, height: 300 },
        content: (
            <div>
                <h2 className="text-lg font-bold mb-2">
                    Unsere Öffnungszeiten
                </h2>
                <ul className="space-y-1">
                    <li>
                        <strong>Montag – Freitag:</strong> 08:00 – 20:00 Uhr
                    </li>
                    <li>
                        <strong>Samstag:</strong> 09:00 – 17:00 Uhr
                    </li>
                    <li>
                        <strong>Sonntag:</strong> Geschlossen
                    </li>
                </ul>
                <p className="mt-4 text-sm italic">
                    Mitglieder mit 24/7-Zugang können den Space jederzeit
                    nutzen!
                </p>
            </div>
        ),
    },
    {
        id: "kontakt",
        title: "Kontakt",
        icon: "/icons/contact.png",
        type: "folder",
        position: { x: 250, y: 250 },
        defaultPosition: { x: 250, y: 250 },
        defaultSize: { width: 320, height: 300 },
        content: (
            <div>
                <h2 className="text-lg font-bold mb-2">Kontaktiere uns</h2>
                <p className="mb-2">
                    Du hast Fragen oder möchtest einen Besichtigungstermin
                    vereinbaren? Melde dich gerne bei uns!
                </p>
                <ul className="space-y-1">
                    <li>
                        <strong>Email:</strong> info@k-working.de
                    </li>
                    <li>
                        <strong>Adresse:</strong> Luisenstraße 81, 63067
                        Offenbach am Main
                    </li>
                    <li>
                        <strong>Web:</strong>{" "}
                        <a
                            href="https://k-working.de"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            k-working.de
                        </a>
                    </li>
                </ul>
            </div>
        ),
    },
    {
        id: "ausstattung",
        title: "Ausstattung",
        icon: "/icons/ausstattung.png",
        type: "folder",
        position: { x: 300, y: 300 },
        defaultPosition: { x: 300, y: 300 },
        defaultSize: { width: 350, height: 350 },
        content: (
            <div>
                <h2 className="text-lg font-bold mb-2">Unsere Ausstattung</h2>
                <ul className="space-y-1 list-disc pl-5">
                    <li>Kaffee, Tee & Wasser Flat</li>
                    <li>Podcast-Studio</li>
                    <li>Meetingräume</li>
                    <li>Gute Anbindung (S-Bahn, Hauptbahnhof)</li>
                    <li>Voll ausgestattete Küche</li>
                    <li>Kreatives Umfeld</li>
                    <li>Drucker & Co.</li>
                    <li>Postanschrift</li>
                </ul>
            </div>
        ),
    },
    // {
    //     id: "photo-library",
    //     title: "Fotos",
    //     icon: "/icons/photos.png",
    //     type: "photo-library",
    //     position: { x: 350, y: 100 },
    //     defaultPosition: { x: 350, y: 100 },
    //     defaultSize: { width: 800, height: 600 },
    //     content: null,
    // },
];

export default function Home() {
    return (
        <main className="min-h-screen bg-[#BFF2CE]">
            <Desktop items={desktopItems} />
        </main>
    );
}
