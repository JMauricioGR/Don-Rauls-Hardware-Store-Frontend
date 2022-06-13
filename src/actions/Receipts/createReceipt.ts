import { createReceiptReducer, receiptType } from "../../state/slice/receiptSlice"

const createReceiptAction = async(data:receiptType, dispatch: any) => {

  const bodyData: receiptType = data

  const response = await fetch('https://don-raul-hardware-store.herokuapp.com/receipt/create',{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(bodyData)
  })

  let resp= await response.json()

  dispatch(createReceiptReducer(resp))

}

export default createReceiptAction