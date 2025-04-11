import Desktop from "../components/Desktop";
import { DesktopItemType } from "../types";

// Sample desktop items
const desktopItems: DesktopItemType[] = [
    {
        id: "about",
        title: "About Us",
        icon: "📄",
        content: (
            <div>
                <h2 className="text-lg font-bold mb-2">
                    About Our Coworking Space
                </h2>
                <p className="mb-2">
                    Welcome to Vintage Mac Coworking! We provide a unique
                    workspace experience with a nostalgic twist.
                </p>
                <p>
                    Our space features high-speed internet, comfortable
                    workstations, meeting rooms, and complimentary coffee.
                </p>
            </div>
        ),
        defaultPosition: { x: 100, y: 100 },
        defaultSize: { width: 350, height: 250 },
    },
    {
        id: "pricing",
        title: "Pricing",
        icon: "💰",
        content: (
            <div>
                <h2 className="text-lg font-bold mb-2">Membership Options</h2>
                <ul className="space-y-2">
                    <li className="border-b pb-1">
                        <strong>Hot Desk:</strong> $25/day or $200/month
                    </li>
                    <li className="border-b pb-1">
                        <strong>Dedicated Desk:</strong> $350/month
                    </li>
                    <li className="border-b pb-1">
                        <strong>Private Office:</strong> Starting at $600/month
                    </li>
                    <li>
                        <strong>Meeting Room:</strong> $30/hour
                    </li>
                </ul>
            </div>
        ),
        defaultPosition: { x: 150, y: 150 },
        defaultSize: { width: 300, height: 300 },
    },
    {
        id: "hours",
        title: "Hours",
        icon: "🕒",
        content: (
            <div>
                <h2 className="text-lg font-bold mb-2">Business Hours</h2>
                <ul className="space-y-1">
                    <li>
                        <strong>Monday - Friday:</strong> 8:00 AM - 8:00 PM
                    </li>
                    <li>
                        <strong>Saturday:</strong> 9:00 AM - 5:00 PM
                    </li>
                    <li>
                        <strong>Sunday:</strong> Closed
                    </li>
                </ul>
                <p className="mt-4 text-sm italic">
                    Members with 24/7 access can use the space anytime!
                </p>
            </div>
        ),
        defaultPosition: { x: 200, y: 200 },
        defaultSize: { width: 280, height: 220 },
    },
    {
        id: "contact",
        title: "Contact",
        icon: "📞",
        content: (
            <div>
                <h2 className="text-lg font-bold mb-2">Get In Touch</h2>
                <p className="mb-2">
                    We'd love to hear from you! Reach out to schedule a tour or
                    learn more.
                </p>
                <ul className="space-y-1">
                    <li>
                        <strong>Email:</strong> hello@vintagemaccoworking.com
                    </li>
                    <li>
                        <strong>Phone:</strong> (555) 123-4567
                    </li>
                    <li>
                        <strong>Address:</strong> 123 Main St, Anytown, CA 94000
                    </li>
                </ul>
            </div>
        ),
        defaultPosition: { x: 250, y: 250 },
        defaultSize: { width: 320, height: 250 },
    },
    {
        id: "amenities",
        title: "Amenities",
        icon: "✨",
        content: (
            <div>
                <h2 className="text-lg font-bold mb-2">Workspace Amenities</h2>
                <ul className="space-y-1 list-disc pl-5">
                    <li>High-speed fiber internet</li>
                    <li>Ergonomic workstations</li>
                    <li>Conference rooms with A/V equipment</li>
                    <li>Phone booths for private calls</li>
                    <li>Kitchen with complimentary coffee & tea</li>
                    <li>Printing services</li>
                    <li>Bike storage</li>
                    <li>24/7 secure access (for members)</li>
                    <li>Community events & networking</li>
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
