import { createProduct } from "../../state/slice/productSlice"

const addProductAction = async(productName: string,
  productDescription: string,
  minimumUnits: number,
  maximumUnits: number,
  provider: string,
  dispatch:any)=>{

    const requestBody ={
      productName,
      productDescription,
      minimumUnits,
      maximumUnits,
      provider,
      stock: 0
    }

    let response = await fetch('http://localhost:8080/product/create',{
      method:"POST",
      headers:{"content-type":"application/json"},
      body: JSON.stringify(requestBody)
    })

    let res = await response.json()
    dispatch(createProduct(res))
  }

  export default addProductAction