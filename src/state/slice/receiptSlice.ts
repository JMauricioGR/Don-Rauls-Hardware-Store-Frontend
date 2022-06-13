import { createSlice } from "@reduxjs/toolkit";

type receiptType ={
  id:	string,
  providerName:	string,
  date:	string,
  providerId:	string,
  product:	string,
  quantity:	string
}

const initialState: receiptType []= [{
  id:	"1234567890",
  providerName:	"receipt provider name",
  date:	"2022-06-13",
  providerId:	"receipt provider id",
  product:	"receipt product",
  quantity:	"654"
}]

const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers:{
    createReceiptReducer(state, action){
      state.push(action.payload)
    },
    getAllReceiptsReducer(state, action){
      return action.payload
    }
  }
})

export default receiptSlice.reducer
export type { receiptType }
export const { createReceiptReducer, getAllReceiptsReducer } = receiptSlice.actions


