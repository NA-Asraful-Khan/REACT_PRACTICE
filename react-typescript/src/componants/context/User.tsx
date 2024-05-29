import { useContext } from 'react'
import { UserContext } from './UserContext'


export const User = () => {
    const userContext = useContext(UserContext)
    const handleLogin = () => {
        // if (userContext) {
        userContext.setUser({
            name: 'Vishwas',
            email: 'asd@asd.com'
        })
        // }
    }
    const handleLogout = () => {
        // if (userContext) {
        userContext.setUser(null)
        // }
    }
    return (
        <div style={{ margin: '15px', border: '1px solid black' }}>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            {
                userContext.user ? (
                    <>
                        <h2>User name is {userContext.user?.name}</h2>
                        <h2>User email is {userContext.user?.email}</h2>
                    </>
                ):<h2>Please Log In</h2>
            }

            {/* <div>User name is {userContext?.user?.name}</div>
      <div>User email is {userContext?.user?.email}</div> */}
        </div>
    )
}