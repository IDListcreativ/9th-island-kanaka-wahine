import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext<any>(null)

const MOCK_USER = null

export function AuthProvider({children}:{children:React.ReactNode}){
  const [user, setUser] = useState<any>(MOCK_USER)
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(()=>{
    const raw = localStorage.getItem('mock_user')
    if(raw) setUser(JSON.parse(raw))
  },[])

  function signInMock(name:string){
    const u = { id: 'u_'+Date.now(), name }
    localStorage.setItem('mock_user', JSON.stringify(u))
    setUser(u)
    setAuthOpen(false)
  }
  function signOut(){
    localStorage.removeItem('mock_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, authOpen, openAuth:()=>setAuthOpen(true), closeAuth:()=>setAuthOpen(false), signInMock, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}
