import { createProduct } from "../../state/slice/productSlice"

const addProductAction = async(productName: string,
  productDescription: string,
  minimumUnits: number,
  maximumUnits: number,
  provider: string,
  price: number,
  dispatch:any)=>{

    const requestBody ={
      productName,
      productDescription,
      minimumUnits,
      maximumUnits,
      provider,
      stock: 0,
      price,
    }

    let response = await fetch('https://don-raul-hardware-store.herokuapp.com/product/create',{
      method:"POST",
      headers:{"content-type":"application/json"},
      body: JSON.stringify(requestBody)
    })

    let res = await response.json()
    dispatch(createProduct(res))
  }

  export default addProductAction