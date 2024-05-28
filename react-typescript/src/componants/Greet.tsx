type GreetProps = {
    name: string,
    messageCount?: number,
    isLoggedIn: boolean
}


export const Greet = ({name,messageCount,isLoggedIn}:GreetProps) => {
  return (
    <>
    {
        isLoggedIn?<h2>Hello {name}! You have {messageCount?messageCount:0} message unread.</h2>: <h2>Hello User! Please Log In.</h2>
    }
    
    </>
  )
}
