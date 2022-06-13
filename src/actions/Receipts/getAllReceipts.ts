const getAllReceipts = async()=>{
  let response = await fetch('https://don-raul-hardware-store.herokuapp.com/recipes/all')
  let data = await response.json()

  return data
}

export default getAllReceipts