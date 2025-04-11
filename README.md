# Vintage Mac Coworking Space Website

A modern Next.js website for a coworking space with a vintage Macintosh interface aesthetic. Users can interact with desktop items to learn about the coworking space's services, pricing, hours, and amenities.

## Features

-   Vintage Macintosh-inspired desktop interface
-   Clickable desktop icons that open draggable windows
-   Responsive design using Tailwind CSS
-   Built with Next.js and TypeScript
-   Easily extendable architecture to add new desktop items/content

## Project Structure

-   `src/components/Desktop.tsx` - Main desktop component
-   `src/components/DesktopItem.tsx` - Component for clickable desktop icons
-   `src/components/Window.tsx` - Draggable window component that displays content
-   `src/types.ts` - TypeScript interfaces
-   `public/` - Static assets like images

## Adding New Desktop Items

To add new items to the desktop, modify the `desktopItems` array in `src/app/page.tsx`:

```tsx
const desktopItems: DesktopItemType[] = [
    {
        id: "unique-id",
        title: "Item Title",
        icon: "🔤", // Emoji or path to image
        content: <div>{/* Your content here */}</div>,
        defaultPosition: { x: 100, y: 100 }, // Optional starting position
        defaultSize: { width: 350, height: 250 }, // Optional window size
    },
    // More items...
];
```

## Getting Started

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the development server:
    ```bash
    npm run dev
    ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Future Enhancements

-   Window resizing
-   Menu bar with functional dropdown menus
-   Dock bar at the bottom
-   More interactive desktop elements
-   Animations and sounds for authentic vintage Mac feel

## License

MIT
