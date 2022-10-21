const hash = import.meta.env.VITE_REACT_APP_LOCALHOST_KEY as string

function getUserFromLS() {
  let user = localStorage.getItem(hash)
  if (user !==null) return user
  return null
}

function setUserInLS(val:any){
  let value = JSON.stringify(val)
  localStorage.setItem(hash,value)
}
export { getUserFromLS, setUserInLS}