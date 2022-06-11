const getAllProductsAction = async()=>{
  let response = await fetch('http://localhost:8080/products/all')
  let data = await response.json()

  return data
}

export default getAllProductsAction