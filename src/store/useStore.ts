import create from "zustand";

const useUserStore = create((set) => ({
  userId: null,
  username: null,
  setUserData: (id: string, name: string) =>
    set({ userId: id, username: name }),
}));

export default useUserStore;
