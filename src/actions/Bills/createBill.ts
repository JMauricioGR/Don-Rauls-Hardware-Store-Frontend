import { billType, createBillReducer } from "../../state/slice/billSlice"


const createBillAction = async(data:billType, dispatch: any) => {

  const bodyData: billType = {
    id:	"4569874126453262gdfs",
    date:	"2022-12-30",
    clientName:	"bill client name",
    seller:	"bill seller name",
    products:	 [{
                  id:	"485hnct7uf8y9tu3nm9ht835n45874",
                  productName:	"product name",
                  productDescription:	"product description",
                  minimumUnits:	4,
                  maximumUnits:	56,
                  provider:	"provider name",
                  stock:	5,
                  price:	10000,
              },
              {
                id:	"485hnc835n458742",
                productName:	"product name2",
                productDescription:	"product description2",
                minimumUnits:	42,
                maximumUnits:	562,
                provider:	"provider name2",
                stock:	52,
                price:	100002,
            }],
    total:	50002
  
  }

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