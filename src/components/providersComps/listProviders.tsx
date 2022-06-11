import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import deleteProvider from '../../actions/Providers/deleteProvider'
import getProviders from '../../actions/Providers/getProviders'
import { deleteProviders, getAllProviders, providerType } from '../../state/slice/providerSlice'
import { stateType } from '../../state/store'

const ListProviders = () => {

  const providersComponent = useSelector((state: stateType)=> state.providers)
  const dispatch = useDispatch()

  useEffect(()=>{
    
    getProviders().then(
      (providers) => {
        dispatch(getAllProviders(providers))
      }
    )
    
  },[])  

  const deleteOneProvider = async (id: string) =>{
    const response = await deleteProvider(id)
    if(response){
      dispatch(deleteProviders(id))
    }
  }
  
  return (
    <div className='list-style'>
      <h2>Providers List</h2>
      <table>
        <thead>
          <tr>
          <th>Name</th>
          <th>Identification</th>
          <th>Comments</th>
          <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {providersComponent.
          map((provider: providerType, index) => <tr key={index}>
            <td>{provider.name}</td>
            <td>{provider.providerId}</td>
            <td>{provider.note}</td>
            <td><button onClick={() => deleteOneProvider(`${provider.id}`)}>X</button></td>
            </tr>)
        }
        </tbody>  
      </table>
    </div>
    
  )
}

export default ListProviders
