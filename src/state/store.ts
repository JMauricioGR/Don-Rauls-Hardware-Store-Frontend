import { configureStore } from "@reduxjs/toolkit";
import productReducer, { productType } from "./slice/productSlice";
import providerReducer, { providerType } from './slice/providerSlice'

const store = configureStore({
  reducer:{
    providers: providerReducer,
    products: productReducer,
  }
})

type stateType = {
  providers: providerType[],
  products: productType[]
}

export default store
export type { stateType }