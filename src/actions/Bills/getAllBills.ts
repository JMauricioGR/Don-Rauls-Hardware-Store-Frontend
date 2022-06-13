const getAllBillsAction = async()=>{
  let response = await fetch('https://don-raul-hardware-store.herokuapp.com/bills/all')
  let data = await response.json()

  return data
}

export default getAllBillsAction