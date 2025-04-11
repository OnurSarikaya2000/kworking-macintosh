import Desktop from "../components/Desktop";
import { DesktopItemType } from "../types";

// Beispielhafte Desktop-Elemente
const desktopItems: DesktopItemType[] = [
    {
        id: "ueber-uns",
        title: "Über uns",
        icon: "🏢",
        content: (
            <div>
                <h2 className="text-lg font-bold mb-2">
                    Willkommen bei K-Working
                </h2>
                <p className="mb-2">
                    Dein flexibles & zentrales Büro in Offenbach. Wir bieten dir
                    einen ruhigen Arbeitsplatz, eine Kaffee-Flatrate, nette
                    Menschen und einen Briefkasten für deine Post.
                </p>
                <p>
                    Bei uns findest du alles, was du für produktives Arbeiten
                    brauchst – inklusive kreativer Atmosphäre und guter
                    Anbindung.
                </p>
            </div>
        ),
        defaultPosition: { x: 100, y: 100 },
        defaultSize: { width: 350, height: 250 },
    },
    {
        id: "pakete",
        title: "Pakete",
        icon: "💼",
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
                    <li>
                        <strong>Virtuelles Büro:</strong> 99,00 €/Monat –
                        Geschäftsadresse und Briefkastenservice
                    </li>
                </ul>
            </div>
        ),
        defaultPosition: { x: 150, y: 150 },
        defaultSize: { width: 350, height: 300 },
    },
    {
        id: "oeffnungszeiten",
        title: "Öffnungszeiten",
        icon: "🕒",
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
        defaultPosition: { x: 200, y: 200 },
        defaultSize: { width: 300, height: 220 },
    },
    {
        id: "kontakt",
        title: "Kontakt",
        icon: "📞",
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
        defaultPosition: { x: 250, y: 250 },
        defaultSize: { width: 320, height: 250 },
    },
    {
        id: "ausstattung",
        title: "Ausstattung",
        icon: "✨",
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
        defaultPosition: { x: 300, y: 300 },
        defaultSize: { width: 350, height: 350 },
    },
];

export default function Home() {
    return (
        <main>
            <Desktop items={desktopItems} />
        </main>
    );
}
