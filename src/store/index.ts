import { create } from 'zustand'
import { Node } from '@/sketch/Node';
import { Edge } from '@/sketch/Edge';
import { Stage } from '@/sketch/Stage';

export type EditNode = (node: Node) => void

export type SketchState = {
  nodes: Node[];
  nodesDict: Map<String, Node>;
  edges: Edge[];
  edgesDict: Map<String, Edge>;
  stage: Stage;
}

export type AppState = {
  sketchState: SketchState,
  addNode: (node: Node) => void;
  addEdge: (edge: Edge) => void;
  
  selectedNode: Node | null;
  requestModalVisible: boolean;
  editNode: EditNode;
  toggleRequestModal: () => void;
}

const initialSketch: SketchState = {
  nodes: [],
  nodesDict: new Map(),
  edges: [],
  edgesDict: new Map(),
  stage: new Stage(),
};

const useStore = create<AppState>()(
  (set) => ({
    sketchState: initialSketch,
    addNode: (node: Node) => set((state) => ({
      sketchState: {
        ...state.sketchState,
        nodes: [...state.sketchState.nodes, node],
        nodesDict: state.sketchState.nodesDict.set(node.id, node),
      }
    })),
    addEdge: (edge: Edge) => set((state) => ({
      sketchState: {
        ...state.sketchState,
        edges: [...state.sketchState.edges, edge],
      }
    })),

    selectedNode: null,
    requestModalVisible: false,
    editNode: (node: Node) => set(() => ({ selectedNode: node })),
    toggleRequestModal: () => set((state) => ({ requestModalVisible: !state.requestModalVisible })),
  }),
);

export const getState = useStore.getState;

export default useStore;
