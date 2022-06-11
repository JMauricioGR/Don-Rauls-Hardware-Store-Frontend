
const getProviders = async ()=>{
  let response = await fetch('http://localhost:8080/providers/all')
  let data = await response.json()
    
  return data
}

export default getProviders