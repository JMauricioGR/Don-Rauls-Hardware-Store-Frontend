import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import addProvider from '../../actions/Providers/addProvider'
import { providerType } from '../../state/slice/providerSlice'
import { stateType } from '../../state/store'
import ListProviders from './listProviders'

const FormProviders = () => {

  const providersComponent = useSelector((state: stateType)=> state.providers)
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const [numberId, setNumberId] = useState("")
  const onNumberIdChange = (e: React.ChangeEvent<HTMLInputElement>) => setNumberId(e.target.value)
  const [note, setNote] = useState("")
  const onNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => setNote(e.target.value)


  const createProvider = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault()
    addProvider(name,numberId,note, dispatch)    
    setName("")
    setNumberId("")
    setNote("")
  }

  return (
    <div className='form-style'>
      <form action="">
        <table>
          <tbody>
          <tr>
            <th className='td-label'><label htmlFor="providerName">Provider name: </label></th>
            <td className='td-input'>
              <input 
              type="text" 
              name='providerName' 
              value={name}
              onChange={onNameChange}
              />
            </td>
          </tr>
          <tr>
            <th className='td-label'><label htmlFor="providerId" >Provider document: </label></th>
            <td className='td-input'>
              <input 
              type="number" 
              name='providerId' 
              placeholder='527354792' 
              value={numberId}
              onChange={onNumberIdChange}
              />
            </td>
          </tr>
          <tr>
            <th className='td-label'><label htmlFor="providerNote">Comment: </label></th>
            <td className='td-input'>
              <input 
              type="text" 
              name='providerNote' 
              value={note}
              onChange={onNoteChange}
              />
            </td>
          </tr>
          </tbody>
        </table>
      <button onClick={createProvider} className='btn-add'>Add provider</button>      
      </form>
      <ListProviders />
    </div>
  )
}

export default FormProviders
