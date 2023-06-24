import { create } from 'zustand'
import { Node } from '@/sketch/Node';

export type EditNode = (node: Node) => void

export type AppState = {
  selectedNode: Node | null;
  requestModalVisible: boolean;
  editNode: EditNode;
  toggleRequestModal: () => void;
}

const useStore = create<AppState>()(
  (set) => ({
    selectedNode: null,
    requestModalVisible: false,
    editNode: (node: Node) => set(() => ({ selectedNode: node })),
    toggleRequestModal: () => set((state) => ({ requestModalVisible: !state.requestModalVisible })),
  }),
);

export const getState = useStore.getState;

export default useStore;
