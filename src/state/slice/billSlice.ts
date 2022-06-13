import { createSlice } from "@reduxjs/toolkit";
import { productType } from "./productSlice";

type billType = {
  id:	string,
  date:	string,
  clientName:	string,
  seller:	string,
  products:	productType[],
  total:	number
}

const initialState: billType[] =[{
  id:	"4569874126453262gdfs",
  date:	"2022-12-30",
  clientName:	"bill client name",
  seller:	"bill seller name",
  products:	 [{
                id:	"485hnct7uf8y9tu3nm9ht835n45874",
                productName:	"product name",
                productDescription:	"product description",
                minimumUnits:	4,
                maximumUnits:	56,
                provider:	"provider name",
                stock:	5,
                price:	10000,
            },
            {
              id:	"485hnc835n458742",
              productName:	"product name2",
              productDescription:	"product description2",
              minimumUnits:	42,
              maximumUnits:	562,
              provider:	"provider name2",
              stock:	52,
              price:	100002,
          }],
  total:	50002

}]


const billSlice = createSlice({
  name:"bill",
  initialState,
  reducers:{
    createBillReducer(state, action){
      state.push(action.payload)
    },
    getAllBillsReducer(state, action){
      return action.payload
    }
  }
})

export default billSlice.reducer
export type { billType }
export const { createBillReducer, getAllBillsReducer } = billSlice.actions
