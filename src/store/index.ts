import { create } from 'zustand'
import { Node } from '../sketch/Node';

export type EditNode = (node: Node) => void

export interface AppState {
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

export default useStore;
