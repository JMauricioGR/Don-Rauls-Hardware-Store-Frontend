import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import createBillAction from '../../actions/Bills/createBill'
import { billType } from '../../state/slice/billSlice'
import { RootState } from '../../state/store'
import BillsList from './BillsList'

const BillForm = () => {
  

  const dispatch = useDispatch()
  const {user} = useSelector((state: RootState)=> state.logged)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user === null){
      navigate("/")
    }
  },[])

  const [userIdst,setuserIdst] =useState("")
  const [dateIdst,setdateIdst] =useState("")
  const [clientNamest,setclientNamest] =useState("")
  const [sellerst,setsellerst] =useState("")
  const [productsst,setproductsst] =useState("")
  const [totalst,settotalst] =useState("")

  const onUserIdChange= (e: React.ChangeEvent<HTMLInputElement>)=> setuserIdst(e.target.value)
  const onDateChange= (e: React.ChangeEvent<HTMLInputElement>)=> setdateIdst(e.target.value)
  const onClientNameChange= (e: React.ChangeEvent<HTMLInputElement>)=> setclientNamest(e.target.value)
  const onSellerChange= (e: React.ChangeEvent<HTMLInputElement>)=> setsellerst(e.target.value)
  const onProductsChange= (e: React.ChangeEvent<HTMLInputElement>)=> setproductsst(e.target.value)
  const onTotalChange= (e: React.ChangeEvent<HTMLInputElement>)=> settotalst(e.target.value)

  

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
            <td className='td-input'><input type="text" required
                name="minUnits" id="" value={clientNamest} onChange={onClientNameChange} /></td>
          </tr>
          <tr>
            <th className='td-label'><label htmlFor="maxUnits">Seller</label></th>
            <td className='td-input'><input type="text" name="maxUnits" id="" value={sellerst} onChange={onSellerChange} /></td>
          </tr>
          <tr>
            <th className='td-label'><label htmlFor="price">Product</label></th>
            <td className='td-input'><input type="text" name="price" id="" value={productsst} onChange={onProductsChange} /></td>
          </tr>
          <tr>
            <th className='td-label'><label htmlFor="price">Total</label></th>
            <td className='td-input'><input type="text" name="price" id="" value={totalst} onChange={onTotalChange} /></td>
          </tr>
          {/* <tr>
            <th className='td-label'><label htmlFor="productProvider">Provider</label></th>
            <td className='td-input'>
              <select name="productProvider" className='td-input' onChange={onProdviderChange}>
                {providersStore.map((provider: providerType) =><option value={provider.name}>{provider.name}</option> )}
              </select>
            </td>
          </tr> */}
        </tbody>
      </table>
      <button onClick={createBill} className='btn-add'>Add product</button> 
      </form>
      <BillsList />
    </div>
  )
}

export default BillForm



