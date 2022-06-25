import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import createReceiptAction from '../../actions/Receipts/createReceipt'
import { storage } from '../../firebaseConfig'
import { receiptType } from '../../state/slice/receiptSlice'
import { RootState } from '../../state/store'
import ReceiptList from './ReceiptList'

const ReceiptForm = () => {

  const receiptsStore = useSelector((state:RootState)=> state.receipts)
  const providersStore = useSelector((state:RootState)=> state.providers)
  const dispatch = useDispatch()
  
  const {user} = useSelector((state: RootState)=> state.logged)
  const navigate = useNavigate()
  useEffect(() => {
    if (user === false) {
      navigate("/")
    }
  }, [])

  const[providerNamest, setproviderName]=useState("")
  const[datest, setdate]=useState("")
  const[providerIdst, setproviderId]=useState("")
  const[productst, setproduct]=useState("")
  const[quantityst, setquantity]=useState("")
  const[fileData, setFileData] = useState("")
  const[progress, setProgress] = useState(0)

  const onproviderNameChange = (e: React.ChangeEvent<HTMLInputElement>)=>setproviderName(e.target.value)
  const ondateChange = (e: React.ChangeEvent<HTMLInputElement>)=>setdate(e.target.value)
  const onproviderIdChange = (e: React.ChangeEvent<HTMLInputElement>)=>setproviderId(e.target.value)
  const onproductChange = (e: React.ChangeEvent<HTMLInputElement>)=>setproduct(e.target.value)
  const onquantityChange = (e: React.ChangeEvent<HTMLInputElement>)=>setquantity(e.target.value)
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>setFileData(e.target.value)

 

  const createReceipt = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    uploadFile(fileData)    
    setproviderName("")
    setdate("")
    setproviderId("")
    setproduct("")
    setquantity("")
    setFileData("")
  }

  const uploadFile = ( file: any ) => {
    if (!file) return

    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred/snapshot.bytesTransferred)* 100
      )
      setProgress(prog)
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then(url => {
        const data: receiptType = {
          id:	"0",
          providerName:	providerNamest,
          date:	datest,
          providerId:	providerIdst,
          product:	productst,
          quantity:	quantityst,
          fileUrl: url
        }
        createReceiptAction(data,  dispatch)
        console.log(data);
        
      })
    }
    
    
    )
  
}


  return (
    <div className='form-style'>
      <h1>Receipts</h1>
      <form action="">
        <table>
          <tbody>
          <tr>
            <th className='td-label'><label htmlFor="providerName">Provider name: </label></th>
            <td className='td-input'>
              <input 
              type="text" 
              name='providerName' 
              value={providerNamest}
              onChange={onproviderNameChange}
              />
            </td>
          </tr>
          <tr>
            <th className='td-label'><label htmlFor="providerId" >Date: </label></th>
            <td className='td-input'>
              <input 
              type="text" 
              name='providerId' 
              value={datest}
              onChange={ondateChange}
              />
            </td>
          </tr>
          <tr>
            <th className='td-label'><label htmlFor="provideriId">Provider id: </label></th>
            <td className='td-input'>
              <input 
              type="text" 
              name='providerId' 
              value={providerIdst}
              onChange={onproviderIdChange}
              />
            </td>
          </tr>
          <tr>
            <th className='td-label'><label htmlFor="providerNote">Product: </label></th>
            <td className='td-input'>
              <input 
              type="text" 
              name='providerNote' 
              value={productst}
              onChange={onproductChange}
              />
            </td>
          </tr>
          <tr>
            <th className='td-label'><label htmlFor="quantity">Quantity: </label></th>
            <td className='td-input'>
              <input 
              type="text" 
              name='quantity' 
              value={quantityst}
              onChange={onquantityChange}
              />
            </td>
          </tr>
          <tr>
            <td>File:</td>
            <td>
              <input type="file" value={fileData} name="attach" id="file-attach" onChange={ onFileChange } />
            </td>
          </tr>
          </tbody>
        </table>
      <button onClick={createReceipt} className='btn-add'>Add receipt</button>      
      </form>
      <h5>Uploaded: {progress} %</h5>
      <ReceiptList />
    </div>
  )
}

export default ReceiptForm
