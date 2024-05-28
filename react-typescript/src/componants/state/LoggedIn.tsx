import { useState } from "react"

type UserObj = {
    name:string,
    email:string
}


export const LoggedIn = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    // const [user,setUser] = useState<UserObj|null>(null)
    const [user,setUser] = useState<UserObj>({} as UserObj)
    const handleLoggedIn=()=>{
        setIsLoggedIn(true)
        setUser({
            name:"Shikhor",
            email:"shikhor@example.com"
        })
    }

    const handleLoggedOut=()=>{
        setIsLoggedIn(false)
    }
  return (
    <>
    <button onClick={handleLoggedIn}>Log In</button>
    <button onClick={handleLoggedOut}>Log Out</button>
    {
        isLoggedIn?
        <>
            <h2>Name : {user?.name}</h2>
            <h2>Email : {user?.email}</h2>
        </>
        :<h2>User Logged Out</h2>
    }
    
    </>
  )
}
