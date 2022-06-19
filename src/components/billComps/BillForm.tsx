import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import createBillAction from '../../actions/Bills/createBill'
import getAllProductsAction from '../../actions/Stock/getAllProductsAction'
import { billType } from '../../state/slice/billSlice'
import { createProduct, getAllProduct, productType } from '../../state/slice/productSlice'
import { RootState } from '../../state/store'
import BillsList from './BillsList'

const BillForm = () => {

  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.logged)
  const productsList = useSelector((state: RootState) => state.products)
  const navigate = useNavigate()

  const [dateIdst, setdateIdst] = useState("")
  const [clientNamest, setclientNamest] = useState("")
  const [sellerst, setsellerst] = useState("")
  const [productsst, setproductsst] = useState("")
  const [totalst, settotalst] = useState("")
  const [quantityst, setquantityst] = useState("0")
  const [data, setDatast] = useState<productType[]>([])
  const [productsWithStock, setProductsWithStock] = useState<productType[]>([])
  const [productToBill, setProductToBill] = useState<productType>({} as productType)
  const [subTotals, setSubTotals] = useState<number[]>([0])
  const [productToUpdateStock, setProductsToUpdateStock] = useState<productType[]>([])

  useEffect(() => {
    if (user === null) {
      navigate("/")
    }
    console.log("general useEffect ***************** --------------------------------")

    getAllProductsAction().then(
      (providers) => {
        dispatch(getAllProduct(providers))
        setProductsWithStock(providers.filter((prod: { stock: number }) => prod.stock > 0))
      }
    )
  }, [])

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setdateIdst(e.target.value)
  const onClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setclientNamest(e.target.value)
  const onSellerChange = (e: React.ChangeEvent<HTMLInputElement>) => setsellerst(e.target.value)
  const onTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => settotalst(e.target.value)
  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setquantityst(e.target.value)
  }
  const onProductsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setproductsst(e.target.value)
    setquantityst("")
  }
  // Action to get the product base on select input in bill form
  useEffect(() => {
    const productSelectedObject = productsList.find(prod => prod.id === productsst)
    if (productSelectedObject) {
      setProductToBill(productSelectedObject)
    }
    console.log("Productst useEffect ***************** --------------------------------")
  }, [productsst])
  //Update the subtotal property inside each product selected, based on quantity and own price
  useEffect(() => {
    setProductToBill(prevState => ({
      ...prevState, quantity: parseInt(quantityst),
      subTotal: prevState.price as number * parseInt(quantityst),
      newStock: prevState.stock as number - parseInt(quantityst)
    }))
    console.log("Quantityst useEffect ***************** --------------------------------")
  }, [quantityst])

  useEffect(() => {
    const result = (subTotals.reduce((a, b) => (a + b), 0))
    settotalst(result.toString())
    console.log("ProductToBill useEffect ***************** --------------------------------")
  }, [productToBill])

  useEffect(() => {
    if (subTotals && productToBill.subTotal) setSubTotals([...subTotals, productToBill.subTotal])
    console.log("Data useEffect ***************** --------------------------------")
  }, [data])

  const createBill = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const dataToSend: billType = {
      date: dateIdst,
      clientName: clientNamest,
      seller: sellerst,
      products: data,
      total: totalst,
    }
    createBillAction(dataToSend, dispatch)

    data.forEach(async (product) => {
      const productToUpdate: productType = {
        id: product.id,
        productName: product.productName,
        productDescription: product.productDescription,
        minimumUnits: product.minimumUnits,
        maximumUnits: product.maximumUnits,
        provider: product.provider,
        stock: product.newStock as string,
        price: product.price
      }

      let response = await fetch('https://don-raul-hardware-store.herokuapp.com/product/create', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(productToUpdate)
      })

      let res = await response.json()
      dispatch(createProduct(res))

    })

    setdateIdst("")
    setclientNamest("")
    setsellerst("")
    setproductsst("")
    settotalst("")
    setDatast([])
  }




  return (
    <div className='form-style'>
      <h1>Bill</h1>
      <form action="">
        <table >
          <tbody>
            <tr>
              <th className='td-label'><label htmlFor="productDescription">Date</label></th>
              <td className='td-input'><input type="text"
                name="productDescription" id=""
                value={dateIdst}
                onChange={onDateChange} /></td>
            </tr>
            <tr>
              <th className='td-label'><label htmlFor="minUnits">Client Name</label></th>
              <td className='td-input'><input type="text"
                name="minUnits" id="" value={clientNamest} onChange={onClientNameChange} /></td>
            </tr>
            <tr>
              <th className='td-label'><label htmlFor="maxUnits">Seller</label></th>
              <td className='td-input'><input type="text" name="maxUnits" id="" value={sellerst} onChange={onSellerChange} /></td>
            </tr>
            <tr>
              <th className='td-label'><label htmlFor="price">Product</label></th>
              <td>
                <select onChange={onProductsChange}>
                  <option value={""}>Select product</option>
                  {productsWithStock.map((prod: productType) => <option key={prod.id} value={prod.id}>{prod.productName}</option>)}
                </select>
              </td>
            </tr>
            <tr><td>Products avalible: </td><td>{productToBill.stock}</td></tr>
            <tr>
              <th className='td-label'><label htmlFor="quantity">Quantity</label></th>
              <td className='td-input'>
                <input type="text" name="quantity" className={(productToBill?.stock < parseInt(quantityst)) ? 'stock-validate' : ''} value={quantityst} onChange={onQuantityChange} />
                <button id='btn-add-product'
                  disabled={(productToBill.stock < parseInt(quantityst) || quantityst == "") ? true : false}
                  onClick={async (ev) => {
                    ev.preventDefault()
                    console.log("button action");
                    setProductToBill(prevState => ({
                      ...prevState, quantity: parseInt(quantityst),
                      subTotal: prevState.price as number * parseInt(quantityst),
                      newStock: (prevState.stock as number - parseInt(quantityst))
                    }))
                    setDatast([...data, productToBill])
                    setquantityst("")
                    setproductsst("")
                  }
                  }
                >Add product</button>
              </td>
            </tr>
            <tr>
              <td><h3>Bill products</h3></td>
            </tr>
            <tr>
              <td>Quantity:</td><td>Product:</td><td>Price:</td><td>SubTotal:</td>
            </tr>
            {data.map(prod => <tr key={prod.id}>
              <td>{prod.quantity}</td>
              <td>{prod.productName}</td>
              <td>{prod.price}</td>
              <td>{prod.subTotal}</td>
              <td>{prod.newStock}</td>
            </tr>)}
            <tr>
              <th className='td-label'><label htmlFor="price">Total</label></th>
              <td className='td-input'><input type="text" name="price" id="" value={totalst} onChange={onTotalChange} /></td>
            </tr>
          </tbody>
        </table>
        <button onClick={createBill} className='btn-add'>Save bill</button>
      </form>
      <BillsList />
    </div>
  )
}

export default BillForm