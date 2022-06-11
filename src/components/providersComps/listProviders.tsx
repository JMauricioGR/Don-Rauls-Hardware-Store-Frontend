import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getProviders from '../../actions/Providers/getProviders'
import { getAllProviders, providerType } from '../../state/slice/providerSlice'
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
  
  return (
    <div className='list-style'>
      <h2>Providers List</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Identification</th>
          <th>Comments</th>
          <th>Delete</th>
        </tr>
              
        {providersComponent.
          map((provider: providerType) => <tr key={provider.id}>
            <td>{provider.name}</td>
            <td>{provider.providerId}</td>
            <td>{provider.note}</td>
            <td><button>X</button></td>
            </tr>)
        }        
      </table>
    </div>
    
  )
}

export default ListProviders
