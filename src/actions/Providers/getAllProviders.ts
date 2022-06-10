
const getAllProviders = async ()=>{
  let response = await fetch('http://localhost:8080/providers/all')
  return response.json()
}

export default getAllProviders