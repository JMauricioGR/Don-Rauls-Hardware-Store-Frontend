import React from 'react'
import { useSelector } from 'react-redux'
import { providerType } from '../../state/slice/providerSlice'
import { stateType } from '../../state/store'

const FormProviders = () => {


  const providersComponent = useSelector((state: stateType)=> state.providers)
  return (
    <div>
      
      {providersComponent.map((provider: providerType) => <h1>{provider.name}</h1>)}
    </div>
  )
}

export default FormProviders
