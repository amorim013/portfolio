import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Card {
  id: string;
  title: string;
  description?: string;
  position: number;
}

interface List {
  id: string;
  name: string;
  cards: Card[];
}

interface WorkspaceStore {
  lists: List[];
  moveCard: (source: any, destination: any) => void;
  addList: () => void;
  addCard: (listId: string) => void;
  fetchLists: (boardId: string) => Promise<void>;
}

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  lists: [],

  moveCard: (source, destination) => {
    const lists = [...get().lists];
    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destList = lists.find((list) => list.id === destination.droppableId);
    
    if (!sourceList || !destList) return;

    const [removed] = sourceList.cards.splice(source.index, 1);
    destList.cards.splice(destination.index, 0, removed);

    set({ lists });
  },

  addList: () => {
    const lists = [...get().lists];
    const newList: List = {
      id: crypto.randomUUID(),
      name: 'Nova Lista',
      cards: [],
    };
    lists.push(newList);
    set({ lists });
  },

  addCard: (listId: string) => {
    const lists = [...get().lists];
    const list = lists.find((l) => l.id === listId);
    if (!list) return;

    const newCard: Card = {
      id: crypto.randomUUID(),
      title: 'Novo Card',
      position: list.cards.length,
    };
    list.cards.push(newCard);
    set({ lists });
  },

  fetchLists: async (boardId: string) => {
    try {
      const { data: lists, error } = await supabase
        .from('lists')
        .select(`
          id,
          name,
          cards (
            id,
            title,
            description,
            position
          )
        `)
        .eq('board_id', boardId)
        .order('position');

      if (error) throw error;

      set({ lists: lists || [] });
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  },
}));