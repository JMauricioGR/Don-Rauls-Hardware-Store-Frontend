import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { getAllProduct, productType } from '../../state/slice/productSlice'
import getAllProductsAction from '../../actions/Stock/getAllProductsAction'
import getProviders from '../../actions/Providers/getProviders'
import { getAllProviders } from '../../state/slice/providerSlice'

const ListStock = () => {

  const productsStore = useSelector((state: RootState)=> state.products)
  const providersStore = useSelector((state: RootState)=> state.providers)

  const dispatch = useDispatch()

  useEffect(()=>{
    
    getAllProductsAction().then(
      (providers) => {
        dispatch(getAllProduct(providers))
      }
    )

    getProviders().then(
      (providers) => {
        dispatch(getAllProviders(providers))
      }
    )
    
  },[])

  return (
    <div>
      <h2>Providers List</h2>
      <table>
        <thead>
          <tr>
          <th>Product Name</th>
          <th>Product Description</th>
          <th>Provider</th>
          <th>Min</th>
          <th>Max</th>
          <th>Stock</th>
          <th>Price</th>
          </tr>
        </thead>
        <tbody>
        {productsStore.
          map((provider: productType, index) => <tr key={index}>
            <td>{provider.productName}</td>
            <td>{provider.productDescription}</td>
            <td>{provider.provider}</td>
            <td>{provider.minimumUnits}</td>
            <td>{provider.maximumUnits}</td>
            <td>{provider.stock}</td>
            <td>{provider.price}</td>
            {/* {<td><button onClick={() => deleteOneProvider(`${provider.id}`)}>X</button></td>} */}
            </tr>)
        }
        </tbody>  
      </table>
      
    </div>
  )
}

export default ListStock
