import { create } from "zustand";
import { RecordItem } from "../../interfaces/interfaces";

interface SelectedUser{
    user: RecordItem
    setUser: (record : RecordItem) => void
}

export const useSelectedRecord = create<SelectedUser>()((set) => ({
    user: new Object,
    setUser : (record) => set((state) => ({user: record}))
}))
