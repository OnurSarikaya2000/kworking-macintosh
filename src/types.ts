export interface DesktopItemType {
    id: string;
    title: string;
    icon: string;
    type: "file" | "folder" | "browser";
    position: { x: number; y: number };
    defaultPosition?: {
        x: number;
        y: number;
    };
    defaultSize?: {
        width: number;
        height: number;
    };
    content: React.ReactNode;
}
