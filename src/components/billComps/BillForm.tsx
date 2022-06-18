import { objectTraps } from 'immer/dist/internal'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import createBillAction from '../../actions/Bills/createBill'
import getAllProductsAction from '../../actions/Stock/getAllProductsAction'
import { billType } from '../../state/slice/billSlice'
import { getAllProduct, productType } from '../../state/slice/productSlice'
import { RootState } from '../../state/store'
import BillsList from './BillsList'

const BillForm = () => {
  

  const dispatch = useDispatch()
  const {user} = useSelector((state: RootState)=> state.logged)
  const productsList = useSelector((state: RootState)=> state.products)
  const navigate = useNavigate()
  
  
  const [userIdst,setuserIdst] =useState("")
  const [dateIdst,setdateIdst] =useState("")
  const [clientNamest,setclientNamest] =useState("")
  const [sellerst,setsellerst] =useState("")
  const [productsst,setproductsst] =useState("")
  const [totalst,settotalst] =useState("")
  const [quantityst,setquantityst] =useState("0")
  const [data,setDatast] =useState<productType[]>([])
  const [productsWithStock, setProductsWithStock] = useState<productType[]>([])
  const [productToBill, setProductToBill] = useState<productType>({} as productType )
  const [subTotals, setSubTotals] = useState<number[]>([0])

  useEffect(()=>{
    if(user === null){
      navigate("/")
    }

    getAllProductsAction().then(
      (providers) => {
        dispatch(getAllProduct(providers))
        setProductsWithStock(providers.filter((prod: { stock: number })=> prod.stock > 0))     
      }
    )    
  },[])
  
  const onUserIdChange= (e: React.ChangeEvent<HTMLInputElement>)=> setuserIdst(e.target.value)
  const onDateChange= (e: React.ChangeEvent<HTMLInputElement>)=> setdateIdst(e.target.value)
  const onClientNameChange= (e: React.ChangeEvent<HTMLInputElement>)=> setclientNamest(e.target.value)
  const onSellerChange= (e: React.ChangeEvent<HTMLInputElement>)=> setsellerst(e.target.value)
  const onTotalChange= (e: React.ChangeEvent<HTMLInputElement>)=> settotalst(e.target.value)
  const onQuantityChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
      setquantityst(e.target.value)
    }
  const onProductsChange= (e: React.ChangeEvent<HTMLSelectElement>)=>{ 
    setproductsst(e.target.value)
    setquantityst("")
  }

  useEffect(()=>{
    const productSelectedObject = productsList.find(prod => prod.id === productsst)
    if(productSelectedObject){
      setProductToBill(productSelectedObject)       
    } 
  },[productsst])

  useEffect(()=>{
    setProductToBill(prevState => ({...prevState, quantity: parseInt(quantityst), 
      subTotal: prevState.price as number * parseInt(quantityst)}))
  },[quantityst])

  useEffect(()=>{

    console.log('---------- ********** UseEffect Data  ********* -----------------');
    
    if (subTotals && productToBill.subTotal)setSubTotals([...subTotals, productToBill.subTotal])
    console.log(subTotals);
    const result = (subTotals.reduce((a,b) =>(a+b),0))/2
    console.log(result);
    settotalst(result.toString())
    
    
  },[productToBill])
  
  const createBill = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data: billType ={
      id:	"2431123412",
      date:	"string",
      clientName:	"string",
      seller:	"string",
      products:	[{
        id: "62a45862bc103278050ae1b9",
        productName: "Hammer medium",
        productDescription: "Product description 1 modified",
        minimumUnits: 5,
        maximumUnits: 15,
        provider: "Hammer world principal",
        stock: 3,
        price: 100
      }],
      total:	88,
    }
    createBillAction(data,dispatch)
    setuserIdst("")
    setdateIdst("")
    setclientNamest("")
    setsellerst("")
    setproductsst("")
    settotalst("")
  }
  
  const  productsToSend= (e: React.FormEvent<HTMLButtonElement> )=> {
    e.preventDefault()
    
  }




  return (
    <div className='form-style'>
      <h1>Bill</h1>
      <form action="">
      <table >
        <tbody>
          <tr>
            <th className='td-label'><label htmlFor="productName">User Id</label></th>
            <td className='td-input'><input type="text" 
            name="productName" id="" 
            value={`${userIdst}`} 
            onChange={onUserIdChange}/></td>
          </tr>
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
                {productsWithStock.map((prod: productType)=><option key={prod.id} value={prod.id}>{prod.productName}</option>)}
              </select>
            </td>
          </tr>
          <tr><td>Data to validate :</td><td>{productToBill.stock}</td></tr>
          <tr>
            <th className='td-label'><label htmlFor="quantity">Quantity</label></th>
            <td className='td-input'>
              <input type="text" name="quantity" className={(productToBill?.stock< parseInt(quantityst) )? 'stock-validate' : ''} value={quantityst} onChange={onQuantityChange} />
              <button id='btn-add-product' disabled={(productToBill.stock< parseInt(quantityst) ||quantityst=="") ? true : false} onClick={(ev)=>
                {
                  ev.preventDefault()
                  console.log("button action");                  
                  setProductToBill(prevState => ({...prevState, quantity: parseInt(quantityst),
                    subTotal: prevState.price as number * parseInt(quantityst)
                  }))
                  setDatast([...data, productToBill])
                  setquantityst("")
                  setproductsst("")
                }
              }>Add product</button>
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



