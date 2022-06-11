import { createSlice } from "@reduxjs/toolkit";

type productType ={
  id: string,
  productName: string,
  productDescription: string,
  minimumUnits: number,
  maximumUnits: number,
  provider: string,
  stock: number,
  price: number
}

const initialState: productType[] = [
  {
    id: "62a45862bc103278050ae1b9",
    productName: "Hammer medium",
    productDescription: "Product description 1 modified",
    minimumUnits: 5,
    maximumUnits: 15,
    provider: "Hammer world principal",
    stock: 3,
    price: 100
  }
]

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers:{
    createProduct(state, action){
      state.push(action.payload)
    },
    getAllProduct(state, action){
      return action.payload
    }//,
    // updateProduct(state, action){
    //   //arr1.map(obj => arr2.find(o => o.id === obj.id) || obj);
    //   let newState: productType[] = state.map(productSt => action.payload.find(obj => obj.id === productSt.id) || productSt)
    //   return newState
    // }
  }
})

export default productSlice.reducer
export type { productType }
export const { createProduct, getAllProduct} = productSlice.actions