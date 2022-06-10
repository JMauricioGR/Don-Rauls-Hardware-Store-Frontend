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
    <ul>
      <h2>Providers List</h2>
      {providersComponent.map((provider: providerType) => <li key={provider.id}>{provider.name}</li>)}
    </ul>
  )
}

export default ListProviders
