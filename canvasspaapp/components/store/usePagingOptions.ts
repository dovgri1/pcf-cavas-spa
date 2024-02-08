import { create } from "zustand";

interface RowsPerPage{
    rowsCount: number,
    setRowsCount: (param: number) => void
}

interface PageNumber{
    page: number,
    setPage: (param: number) => void
}

export const useRowsPerPage = create<RowsPerPage>()((set) => ({
    rowsCount: 10,
    setRowsCount : (value) => set((state) => ({rowsCount: value}))
}))

export const usePageNumber = create<PageNumber>()((set) => ({
    page: 0,
    setPage : (value) => set((state) => ({page: value}))
}))