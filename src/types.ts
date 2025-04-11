export interface DesktopItemType {
    id: string;
    title: string;
    icon: string;
    type: "file" | "folder" | "browser" | "photo-library";
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

export interface Photo {
    id: string;
    url: string;
    pixelated_url: string;
    uploaded_at: string;
    uploaded_by: string;
}
