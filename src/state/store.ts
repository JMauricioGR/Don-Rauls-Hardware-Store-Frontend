import { configureStore } from "@reduxjs/toolkit";
import providerReducer, { providerType } from './slice/providerSlice'

const store = configureStore({
  reducer:{
    providers: providerReducer,
  }
})

type stateType = {
  providers: providerType[]
}

export default store
export type { stateType }