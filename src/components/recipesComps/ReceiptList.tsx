import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getAllReceipts from '../../actions/Receipts/getAllReceipts'
import { getAllReceiptsReducer, receiptType } from '../../state/slice/receiptSlice'
import { RootState } from '../../state/store'

const ReceiptList = () => {

  const recipesStore = useSelector((state:RootState)=> state.receipts)
  const dispatch = useDispatch()

  useEffect(()=>{
    getAllReceipts().then((receipts) =>{
      dispatch(getAllReceiptsReducer(receipts))
    }
  )    
  },[])


  return (
    <div className='list-style'>
      <h2>Providers List</h2>
      <table>
        <thead>
          <tr>
          <th>Provider name</th>
          <th>Provider id</th>
          <th>Date</th>
          <th>Products</th>
          <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
        {recipesStore.
          map((receipts: receiptType, index) => <tr key={index}>
            <td>{receipts.providerName}</td>
            <td>{receipts.providerId}</td>
            <td>{receipts.date}</td>
            <td>{receipts.product}</td>
            <td>{receipts.quantity}</td>
            </tr>)
        }
        </tbody>  
      </table>
    </div>
  )
}

export default ReceiptList
