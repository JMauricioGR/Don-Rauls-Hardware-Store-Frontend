
const getProviders = async ()=>{
  let response = await fetch('https://don-raul-hardware-store.herokuapp.com/providers/all')
  let data = await response.json()
    
  return data
}

export default getProviders