import { create } from 'zustand';

interface SidebarStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;

}

export const useSidebar = create<SidebarStore>((set) => ({
    collapsed: false,
    //defaut state
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
}));