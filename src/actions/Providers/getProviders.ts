import { getAllProviders } from "../../state/slice/providerSlice"

const getProviders = async ()=>{
  let response = await fetch('http://localhost:8080/providers/all')
  let data = await response.json()
  console.log(data);
  
  return data
}

export default getProviders