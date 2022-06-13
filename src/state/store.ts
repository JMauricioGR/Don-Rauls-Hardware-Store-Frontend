import { configureStore } from "@reduxjs/toolkit";
import productReducer, { productType } from "./slice/productSlice";
import providerReducer, { providerType } from './slice/providerSlice'
import receiptReducer, { receiptType } from './slice/receiptSlice'
import billReducer, { billType } from './slice/billSlice'
import loggedInReducer from './slice/loggedInSlice'

const store = configureStore({
  reducer:{
    providers: providerReducer,
    products: productReducer,
    receipts: receiptReducer,
    bills: billReducer,
    logged: loggedInReducer,
  }
})

type stateType = {
  providers: providerType[],
  products: productType[],
  receipts: receiptType[],
  bills: billType[],
}

export default store
export type { stateType }