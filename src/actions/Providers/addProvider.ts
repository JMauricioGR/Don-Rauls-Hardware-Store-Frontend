import { createProvider } from "../../state/slice/providerSlice"

const addProvider = async (name: string, numberId: string, note: string, dispatch: any ) =>{

    const providerFromForm ={
      name,
      providerId: numberId,
      note
    
    }
    let saveProvider = await fetch('http://localhost:8080/provider/create',
    {
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(providerFromForm)
    })

    let response = await saveProvider.json()

    dispatch(createProvider(response))

}

export default addProvider