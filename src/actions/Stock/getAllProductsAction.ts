const getAllProductsAction = async()=>{
  let response = await fetch('https://don-raul-hardware-store.herokuapp.com/products/all')
  let data = await response.json()

  return data
}

export default getAllProductsAction