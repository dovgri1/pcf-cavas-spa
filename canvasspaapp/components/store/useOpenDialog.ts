import { create } from "zustand";

interface OpenDialog{
    open: boolean,
    setOpen: (param: boolean) => void
}

export const useOpenDialog = create<OpenDialog>()((set) => ({
    open: false,
    setOpen : (value) => set((state) => ({open: value}))
}))
