import { createSlice } from "@reduxjs/toolkit";

type providerType = {
  id: string,
  name: string,
  providerId: number,
  note: string
}

const initialState: providerType[] = [
  {
    id: "1jh234545kh32jh3",
    name: "Provider 1",
    providerId: 12309848576,
    note: "Provider 1 note",
  },
  {
    id: "1jh23kh32jh3",
    name: "Hammer world",
    providerId: 12309848576,
    note: "Provider 1 note",
  }
]

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    createProvider (state, action){
      state.push(action.payload)
    },
    getAllProviders (state, action){
      state.push(action.payload)
    },
    deleteProviders (state, action){
      state.push(action.payload)
    }
  }
})

export default  providerSlice.reducer
export const { createProvider, getAllProviders, deleteProviders } = providerSlice.actions
export type { providerType }