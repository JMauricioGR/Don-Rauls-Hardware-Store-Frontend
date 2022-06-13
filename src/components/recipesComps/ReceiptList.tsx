import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getAllReceipts from '../../actions/Receipts/getAllReceipts'
import { getAllReceiptsReducer, receiptType } from '../../state/slice/receiptSlice'
import { stateType } from '../../state/store'

const ReceiptList = () => {

  const recipesStore = useSelector((state:stateType)=> state.receipts)
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
          <th>Name</th>
          <th>Identification</th>
          <th>Comments</th>
          <th>Delete</th>
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
            {/* <td><button onClick={() => deleteOneProvider(`${provider.id}`)}>X</button></td> */}
            </tr>)
        }
        </tbody>  
      </table>
    </div>
  )
}

export default ReceiptList
