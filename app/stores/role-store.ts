import {create} from 'zustand';

interface RoleStore {
  isProvider: boolean;
  setIsProvider: (value: boolean) => void;
}

const useRoleStore = create<RoleStore>((set) => ({
  isProvider: false,
  setIsProvider: (value) => set({ isProvider: value }),
}));

export default useRoleStore;
