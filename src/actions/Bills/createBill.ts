import { billType, createBillReducer } from "../../state/slice/billSlice"


const createBillAction = async(data:billType, dispatch: any) => {

  const bodyData: billType = data

  const response = await fetch('https://don-raul-hardware-store.herokuapp.com/bill/create',{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(bodyData)
  })

  let resp= await response.json()

  dispatch(createBillReducer(resp))

}

export default createBillAction