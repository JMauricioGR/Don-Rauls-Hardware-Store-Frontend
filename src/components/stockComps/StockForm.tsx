import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import addProductAction from '../../actions/Stock/addProduct'
import { providerType } from '../../state/slice/providerSlice'
import { RootState } from '../../state/store'
import ListStock from './ListStock'

const StockForm = () => {
  
  const dispatch = useDispatch()
  const providersStore = useSelector((state: RootState) => state.providers)
  const { user } = useSelector((state: RootState) => state.logged)
  const navigate = useNavigate()
  
    useEffect(() => {
      if (user === false) {
        navigate("/")
      }
    }, [])
  
  
  const [productName, setProductName] = useState<string>("")
  const [minUnits, setMinUnits] = useState("")
  const [maxUnits, setMaxUnits] = useState("")
  const [productDescription, setProductDescrip] = useState<string>("")
  const [provider, setProvider] = useState<string>("")
  const [price, setPricet] = useState("")
  
  const onProdNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)
  const onProdDescriptChange = (e: React.ChangeEvent<HTMLInputElement>) => setProductDescrip(e.target.value)
  const onMinUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => setMinUnits(e.target.value)
  const onMaxUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => setMaxUnits(e.target.value)
  const onProdviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => setProvider(e.target.value)
  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setPricet(e.target.value)


  const createProduct = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    addProductAction(productName, productDescription, parseInt(minUnits), parseInt(maxUnits), provider, parseInt(price), dispatch)
    setProductName("")
    setProductDescrip("")
    setMinUnits("")
    setMaxUnits("")
    setProvider("")
    setPricet("")
  }

  return (
    <div className='form-style'>
      <h1>Stock</h1>
      <form action="">
        <table >
          <tbody>
            <tr>
              <th className='td-label'><label htmlFor="productName">Product name:</label></th>
              <td className='td-input'><input type="text"
                name="productName" id=""
                value={`${productName}`}
                onChange={onProdNameChange} /></td>
            </tr>
            <tr>
              <th className='td-label'><label htmlFor="productDescription">Description</label></th>
              <td className='td-input'><input type="text"
                name="productDescription" id=""
                value={productDescription}
                onChange={onProdDescriptChange} /></td>
            </tr>
            <tr>
              <th className='td-label'><label htmlFor="minUnits">Minimum units</label></th>
              <td className='td-input'><input type="number"
                name="minUnits" id="" value={minUnits} onChange={onMinUnitsChange} /></td>
            </tr>
            <tr>
              <th className='td-label'><label htmlFor="maxUnits">Maximum Units</label></th>
              <td className='td-input'><input type="text" name="maxUnits" id="" value={maxUnits} onChange={onMaxUnitsChange} /></td>
            </tr>
            <tr>
              <th className='td-label'><label htmlFor="price">Price</label></th>
              <td className='td-input'><input type="text" name="price" id="" value={price} onChange={onPriceChange} /></td>
            </tr>
            <tr>
              <th className='td-label'><label htmlFor="productProvider">Provider</label></th>
              <td className='td-input'>
                <select name="productProvider" className='td-input' onChange={onProdviderChange}>
                  {providersStore.map((provider: providerType) => <option value={provider.name}>{provider.name}</option>)}
                </select>
              </td>
            </tr>
            <tr>{provider}</tr>
          </tbody>
        </table>
        <button onClick={createProduct} className='btn-add'>Add product</button>
      </form>
      <ListStock />
    </div>
  )
}

export default StockForm
