import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getAllBillsAction from '../../actions/Bills/getAllBills'
import { billType, getAllBillsReducer } from '../../state/slice/billSlice'
import { stateType } from '../../state/store'

const BillsList = () => {

  const billStore = useSelector((state: stateType)=> state.bills)

  const dispatch = useDispatch()

  useEffect(()=>{
    
    getAllBillsAction().then(
      (providers) => {
        dispatch(getAllBillsReducer(providers))
      }
    )
    
  },[])

  return (
    <div>
      <h2>Providers List</h2>
      <table>
        <thead>
          <tr>
          <th>Date</th>
          <th>Client</th>
          <th>Seller</th>
          <th>Total</th>
          
          </tr>
        </thead>
        <tbody>
        {billStore.
          map((provider: billType, index) => <tr key={index}>
            <td>{provider.date}</td>
            <td>{provider.clientName}</td>
            <td>{provider.seller}</td>
            {/* <td>{provider.products.map(item => <p>item.productName</p>)}</td> */}
            <td>{provider.total}</td>
            </tr>)
        }
        </tbody>  
      </table>
      
    </div>
  )
}

export default BillsList
