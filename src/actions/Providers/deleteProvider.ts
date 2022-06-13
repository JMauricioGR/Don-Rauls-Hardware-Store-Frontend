const deleteProvider = async (id: string) => {
  console.log(id);
  
  let response = await fetch(`https://don-raul-hardware-store.herokuapp.com/provider/delete/${id}`,
    {
      method:'DELETE',
    }
  )
  console.log(response);
  
  let data = await response.ok
  return data
}

export default deleteProvider