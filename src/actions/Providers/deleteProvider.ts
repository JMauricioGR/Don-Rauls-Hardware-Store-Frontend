const deleteProvider = async (id: string) => {
  console.log(id);
  
  let response = await fetch(`https://don-raul-hardware-store.herokuapp.com/provider/delete/${id}`,
    {
      method:'DELETE',
    }
  )
  console.log(response);
  
  let data = await response.ok//si borra el provider = (true) si no lo borra es false
  return data
}

export default deleteProvider