import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { stateType } from '../../state/store'
import { productType } from '../../state/slice/productSlice'

const ListStock = () => {

  const productsStore = useSelector((state: stateType)=> state.products)
  const providersStore = useSelector((state: stateType)=> state.providers)

  

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
