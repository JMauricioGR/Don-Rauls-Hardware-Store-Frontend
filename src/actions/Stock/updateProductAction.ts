//import { updateProduct } from "../../state/slice/productSlice"

const updateProductAction =async (id: string,productName: string,
  productDescription: string,
  minimumUnits: number,
  maximumUnits: number,
  provider: string,
  stock: number,
  dispatch: any) => {

  const requestBody = {
    productName,
    productDescription,
    minimumUnits,
    maximumUnits,
    provider,
    stock
  }

  let response = await fetch(`http://localhost:8080/update/product/${id}`,{
    method:'PUT',
    headers:{'content-type':'applicatio/json'},
    body: JSON.stringify(requestBody)
  })

  let data = await response.json()
  //dispatch(updateProduct)  
}

export default updateProductAction