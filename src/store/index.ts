import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type AppActions = {
  toggleHelpModal: () => void;
}

export type AppState = {
  helpModalVisible: boolean;
}

const useStore = create<AppState & AppActions>()(immer((set) => ({
  helpModalVisible: false,
  toggleHelpModal: () => set((state) => {
    state.helpModalVisible = !state.helpModalVisible;
  }),
})));

export const getState = useStore.getState;

export default useStore;
