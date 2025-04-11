export interface DesktopItemType {
    id: string;
    title: string;
    icon: string;
    content: React.ReactNode;
    defaultPosition?: {
        x: number;
        y: number;
    };
    defaultSize?: {
        width: number;
        height: number;
    };
}
